import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      // Check if a single 'file' was uploaded
      const singleFile = formData.get("file") as File;
      if (singleFile) {
        files.push(singleFile);
      }
    }

    if (files.length === 0) {
      return NextResponse.json({ success: false, error: "No files uploaded" }, { status: 400 });
    }

    const uploadedUrls: string[] = [];

    // Check if we are in local dev where we can write to public/uploads
    const isVercel = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

    for (const file of files) {
      if (typeof file === "string") continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      if (!isVercel) {
        // Local file system write
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const ext = path.extname(file.name) || ".jpg";
        const randomName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
        const filePath = path.join(uploadsDir, randomName);
        fs.writeFileSync(filePath, buffer);
        uploadedUrls.push(`/uploads/${randomName}`);
      } else {
        // On Vercel / serverless: convert to optimized data URL for zero-dependency persistence
        const mimeType = file.type || "image/jpeg";
        const base64 = buffer.toString("base64");
        uploadedUrls.push(`data:${mimeType};base64,${base64}`);
      }
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      count: uploadedUrls.length,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}

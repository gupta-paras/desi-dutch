import { NextResponse } from "next/server";
import { getDishes, saveDish } from "@/lib/storage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isWhitelistedAdmin } from "@/lib/config";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const specialOnly = searchParams.get("special") === "true";

    let dishes = getDishes();

    if (category && category !== "all") {
      dishes = dishes.filter((d) => d.category === category);
    }

    if (specialOnly) {
      dishes = dishes.filter((d) => d.isSpecialToday);
    }

    return NextResponse.json({ success: true, count: dishes.length, dishes });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load dishes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const isDev = process.env.NODE_ENV !== "production";

    // Allow in dev or if authenticated whitelisted admin
    if (!isDev && (!session?.user?.email || !isWhitelistedAdmin(session.user.email))) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    if (!body.name || !body.category) {
      return NextResponse.json(
        { success: false, error: "Name and Category are required" },
        { status: 400 }
      );
    }

    const saved = saveDish(body);
    return NextResponse.json({ success: true, dish: saved });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save dish" },
      { status: 500 }
    );
  }
}

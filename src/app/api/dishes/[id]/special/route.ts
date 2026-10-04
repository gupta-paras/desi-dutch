import { NextResponse } from "next/server";
import { toggleSpecialToday } from "@/lib/storage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isWhitelistedAdmin } from "@/lib/config";

interface Params {
  params: { id: string };
}

export async function POST(request: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    const isDev = process.env.NODE_ENV !== "production";

    if (!isDev && (!session?.user?.email || !isWhitelistedAdmin(session.user.email))) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const updated = toggleSpecialToday(params.id);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Dish not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, dish: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getRestaurantConfig, saveRestaurantConfig, isWhitelistedAdmin } from "@/lib/config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const config = getRestaurantConfig();
    return NextResponse.json({ success: true, config });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const isDev = process.env.NODE_ENV !== "production";

    if (!isDev && (!session?.user?.email || !isWhitelistedAdmin(session.user.email))) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const success = saveRestaurantConfig(body);

    if (!success) {
      return NextResponse.json({ success: false, error: "Failed to write config" }, { status: 500 });
    }

    const updatedConfig = getRestaurantConfig();
    return NextResponse.json({ success: true, config: updatedConfig });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

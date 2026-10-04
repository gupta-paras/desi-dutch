import { NextResponse } from "next/server";
import { getDishById, deleteDish, saveDish } from "@/lib/storage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isWhitelistedAdmin } from "@/lib/config";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const dish = getDishById(params.id);
  if (!dish) {
    return NextResponse.json({ success: false, error: "Dish not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, dish });
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    const isDev = process.env.NODE_ENV !== "production";

    if (!isDev && (!session?.user?.email || !isWhitelistedAdmin(session.user.email))) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const updated = saveDish({ ...body, id: params.id });
    return NextResponse.json({ success: true, dish: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    const isDev = process.env.NODE_ENV !== "production";

    if (!isDev && (!session?.user?.email || !isWhitelistedAdmin(session.user.email))) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const success = deleteDish(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: "Dish not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Dish deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: "asc" }
    });
    return NextResponse.json(categories);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const { name, image } = await req.json();
    if (!name) return new NextResponse("Missing name", { status: 400 });

    const category = await prisma.category.create({
      data: { name, image: image || null }
    });
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const { id, name, image } = await req.json();
    if (!id || !name) return new NextResponse("Missing id or name", { status: 400 });

    const category = await prisma.category.update({
      where: { id },
      data: { name, image: image || null }
    });
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const { id } = await req.json();
    if (!id) return new NextResponse("Missing id", { status: 400 });

    await prisma.category.delete({
      where: { id }
    });
    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Cannot delete category with active products", { status: 500 });
  }
}

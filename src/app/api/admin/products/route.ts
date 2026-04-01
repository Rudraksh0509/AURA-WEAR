import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(products);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const { name, description, price, stock, categoryId, images, video, sizes } = await req.json();

    const product = await prisma.product.create({
      data: {
        name,
        description: description || "",
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        sizes: sizes || null,
        categoryId,
        images: Array.isArray(images) ? images : (images ? [images] : []),
        video: video || null,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

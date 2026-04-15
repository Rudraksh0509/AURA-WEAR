import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const { name, description, price, stock, categoryId, images, video, sizes, isFeatured, isNewArrival, isBestSeller, isOnSale } = await req.json();

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description: description || "",
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        sizes: sizes || null,
        categoryId,
        images: Array.isArray(images) ? images : (images ? [images] : []),
        video: video || null,
        isFeatured: isFeatured || false,
        isNewArrival: isNewArrival || false,
        isBestSeller: isBestSeller || false,
        isOnSale: isOnSale || false,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error("PUT Product Error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    await prisma.product.delete({
      where: { id: params.id }
    });
    return new NextResponse("Deleted successfully", { status: 200 });
  } catch (error) {
    console.error("DELETE Product Error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

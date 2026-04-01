import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = (session.user as any).id;
    const { rating, comment } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return new NextResponse("Invalid rating", { status: 400 });
    }

    // Security Business Logic: Verify Purchase Ownership before allowing Review
    const purchased = await prisma.orderItem.findFirst({
      where: {
        productId: params.id,
        order: {
          userId: userId,
        }
      }
    });

    if (!purchased && (session.user as any).role !== "ADMIN") {
      // Admins are exempt, others MUST have bought it
      return new NextResponse("You can only review products you have actively purchased.", { status: 403 });
    }

    const review = await prisma.review.create({
      data: {
        userId,
        productId: params.id,
        rating: Number(rating),
        comment,
      }
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Review Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

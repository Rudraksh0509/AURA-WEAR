import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { products } = await req.json();

    if (!Array.isArray(products)) {
      return new NextResponse("Invalid payload", { status: 400 });
    }

    // Process each product
    let createdCount = 0;
    
    // Fetch all categories to map by name
    const allCategories = await prisma.category.findMany();
    const categoryMap = new Map(allCategories.map(c => [c.name.toLowerCase(), c.id]));

    for (const p of products) {
      if (!(p.name || p.Name) || !(p.price || p.Price)) {
        console.warn("Skipping item missing name or price:", p);
        continue;
      }

      let categoryId = p.categoryId;
      
      // If categoryId is not provided but Category name is provided in Excel
      if (!categoryId && p.Category) {
        const catName = p.Category.toString().toLowerCase();
        if (categoryMap.has(catName)) {
          categoryId = categoryMap.get(catName);
        } else {
          // Auto-create category if missing
          const newCat = await prisma.category.create({
            data: { name: p.Category.toString() }
          });
          categoryId = newCat.id;
          categoryMap.set(catName, newCat.id);
        }
      }

      // Default to the first category if still none
      if (!categoryId && allCategories.length > 0) {
        categoryId = allCategories[0].id;
      }

      let parsedSizes = null;
      let stock = parseInt(p.Stock) || parseInt(p.stock) || 0;

      // Handle sizes if provided as JSON string e.g '{"XS": 10, "S": 5}'
      if (p.Sizes || p.sizes) {
        try {
          const sizeStr = p.Sizes || p.sizes;
          parsedSizes = typeof sizeStr === 'string' ? JSON.parse(sizeStr) : sizeStr;
          // Recalculate stock
          stock = Object.values(parsedSizes).reduce((sum: any, val: any) => sum + parseInt(val), 0) as number;
        } catch (e) {
          console.error("Failed to parse sizes:", p.Sizes);
        }
      }

      // Handle images (comma separated)
      let images = [];
      const imgRaw = p.Images || p.images;
      if (imgRaw) {
        images = typeof imgRaw === 'string' ? imgRaw.split(',').map(i => i.trim()) : (Array.isArray(imgRaw) ? imgRaw : [imgRaw]);
      }

      await prisma.product.create({
        data: {
          name: typeof p.name === 'string' ? p.name : p.Name || "Unnamed Product",
          description: p.description || p.Description || "",
          price: parseFloat(p.price || p.Price) || 0,
          stock,
          categoryId,
          sizes: parsedSizes,
          images,
          video: p.video || p.Video || null,
        }
      });
      createdCount++;
    }

    return NextResponse.json({ success: true, count: createdCount });
  } catch (error) {
    console.error("[PRODUCTS_BULK_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

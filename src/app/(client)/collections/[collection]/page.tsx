import Link from "next/link";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function CollectionPage({ params }: { params: { collection: string } }) {
  const collectionParams: { [key: string]: { label: string, filter: any } } = {
    "new-arrivals": { label: "New Arrivals", filter: { isNewArrival: true } },
    "best-sellers": { label: "Best Sellers", filter: { isBestSeller: true } },
    "sale":         { label: "Sale", filter: { isOnSale: true } }
  };

  const currentCollection = collectionParams[params.collection];
  if (!currentCollection) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: currentCollection.filter,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 2rem", minHeight: "80vh" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 className="brand-font" style={{ fontSize: "3rem", marginBottom: "1rem" }}>{currentCollection.label}</h1>
        <p style={{ color: "var(--muted-foreground)" }}>Explore our curated selection of {currentCollection.label.toLowerCase()}.</p>
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", backgroundColor: "var(--accent)", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <p style={{ fontSize: "1.25rem", color: "var(--muted-foreground)" }}>No products currently tagged as {currentCollection.label}.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2.5rem" }}>
          {products.map(product => (
            <div key={product.id} className="hover-lift" style={{ border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden", backgroundColor: "var(--accent)" }}>
              <Link href={`/product/${product.id}`} style={{ display: "block", height: "350px", overflow: "hidden", position: "relative" }}>
                {product.images[0] ? (
                  // @ts-ignore
                  <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} className="hover-scale" />
                ) : (
                  <div style={{ width: "100%", height: "100%", backgroundColor: "var(--background)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted-foreground)" }}>No Image</div>
                )}
              </Link>
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>{product.name}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--muted-foreground)", fontWeight: "500" }}>${product.price.toFixed(2)}</span>
                  <Link href={`/product/${product.id}`} style={{ padding: "0.5rem 1rem", fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", backgroundColor: "var(--foreground)", color: "var(--background)", borderRadius: "4px" }}>
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

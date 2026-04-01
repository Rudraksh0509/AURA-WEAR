import Link from "next/link";
import prisma from "@/lib/prisma";

const getEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("youtube.com/embed/")) return url;
  let videoId = "";
  if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1]?.split("?")[0];
  else if (url.includes("watch?v=")) videoId = url.split("v=")[1]?.split("&")[0];
  else if (url.includes("shorts/")) videoId = url.split("shorts/")[1]?.split("?")[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1` : url;
};

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
    include: { products: { orderBy: { createdAt: "desc" } } }
  });

  if (!category) return <div style={{ textAlign: "center", padding: "10rem" }}>Category Not Found</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem", minHeight: "85vh" }}>
      
      {/* Category Hero Block */}
      <div style={{ textAlign: "center", marginBottom: "4rem", position: "relative", borderRadius: "20px", overflow: "hidden", minHeight: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {category.image && <img src={category.image} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: -2 }} />}
        {category.image && <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: -1 }} />}
        
        <h1 className="brand-font" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", marginBottom: "1rem", color: category.image ? "white" : "inherit" }}>{category.name}</h1>
        <p style={{ color: category.image ? "rgba(255,255,255,0.8)" : "var(--muted-foreground)", maxWidth: "600px", margin: "0 auto" }}>Explore the exclusive {category.name} collection. Curated for the modern minimalist.</p>
      </div>
      
      {category.products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", backgroundColor: "var(--accent)", borderRadius: "12px", border: "1px dashed var(--border)", color: "var(--muted-foreground)" }}>
          No pieces currently available in this collection.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2.5rem" }}>
          {category.products.map(product => (
            <Link key={product.id} href={`/product/${product.id}`} className="hover-lift" style={{ display: "block", backgroundColor: "var(--accent)", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
              {product.images && product.images.length > 0 && product.images[0].trim() !== "" ? (
                <div style={{ width: "100%", aspectRatio: "4/5", overflow: "hidden", backgroundColor: "var(--accent)" }}>
                   <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ) : product.video && product.video.trim() !== "" ? (
                <div style={{ width: "100%", aspectRatio: "4/5", overflow: "hidden", position: "relative" }}>
                  {(product.video.includes("youtube") || product.video.includes("youtu.be")) ? (
                    <iframe 
                      src={getEmbedUrl(product.video)} 
                      frameBorder="0" 
                      style={{ position: "absolute", top: "-20%", left: "-20%", width: "140%", height: "140%", pointerEvents: "none" }}
                    />
                  ) : (
                    <video src={product.video} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                  <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.1)" }}>
                    <span style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "white", padding: "0.25rem 0.75rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "bold" }}>VIDEO</span>
                  </div>
                </div>
              ) : (
                <div style={{ width: "100%", aspectRatio: "4/5", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted-foreground)", backgroundColor: "var(--background)" }}>AURAWEAR</div>
              )}
              
              <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <p style={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--muted-foreground)", fontWeight: "600" }}>{category.name}</p>
                  
                  {product.stock <= 0 ? (
                     <span style={{ fontSize: "0.7rem", backgroundColor: "#ef4444", color: "white", padding: "0.2rem 0.5rem", borderRadius: "12px", fontWeight: "bold" }}>SOLD OUT</span>
                  ) : product.stock <= 5 ? (
                     <span style={{ fontSize: "0.7rem", backgroundColor: "#f59e0b", color: "white", padding: "0.2rem 0.5rem", borderRadius: "12px", fontWeight: "bold" }}>LOW STOCK</span>
                  ) : null}
                  
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "0.5rem" }}>
                  <h3 className="brand-font" style={{ fontWeight: "600", fontSize: "1.5rem", maxWidth: "70%", lineHeight: "1.2" }}>{product.name}</h3>
                  <span style={{ fontWeight: "600", fontSize: "1.1rem" }}>${product.price.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

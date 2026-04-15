import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    where: { isFeatured: true },
    take: 2,
    orderBy: { name: "asc" }
  });

  const featuredProducts = await prisma.product.findMany({
    where: { isFeatured: true },
    take: 4,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      {/* Dynamic Hero Section */}
      <section style={{ position: "relative", height: "85vh", minHeight: "650px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: "#0a0a0a" }}>
        {/* High-quality background placeholder using Unsplash random fashion images */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.65, backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)" }}></div>
        
        {/* Text Centerpiece */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", color: "white", padding: "0 2rem", marginTop: "4rem" }} className="animate-fade-in">
          <span style={{ textTransform: "uppercase", letterSpacing: "0.25em", fontSize: "0.875rem", fontWeight: "600", marginBottom: "1.5rem", display: "block", color: "#e5e5e5" }}>
            The Spring / Summer Collection
          </span>
          <h1 className="brand-font" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: "700", lineHeight: "1.05", marginBottom: "2.5rem", textShadow: "0 10px 30px rgba(0,0,0,0.6)" }}>
            Redefine Your<br />Aesthetic
          </h1>
          <Link href="/shop" style={{ display: "inline-block", padding: "1.1rem 3rem", backgroundColor: "white", color: "black", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", borderRadius: "4px", fontSize: "0.875rem" }} className="hover-lift">
            Explore Details
          </Link>
        </div>
      </section>

      {/* Featured Categories - Magazine Style Grid */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <h2 className="brand-font gradient-text" style={{ fontSize: "2.5rem", marginBottom: "1.25rem" }}>Curated Essentials</h2>
          <p style={{ color: "var(--muted-foreground)", maxWidth: "600px", margin: "0 auto", fontSize: "1.1rem", lineHeight: "1.6" }}>
            Discover our signature pieces. Configured dynamically by AURAWEAR Administrators.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "2.5rem" }}>
          
          {categories.length === 0 ? (
            <>
              {/* Fallback Static Cards */}
              <div className="hover-lift" style={{ position: "relative", height: "550px", borderRadius: "12px", overflow: "hidden", cursor: "pointer", backgroundColor: "var(--accent)" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2670&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center", transition: "transform 0.6s ease" }}></div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)" }}></div>
                <div style={{ position: "absolute", bottom: "3rem", left: "3rem", color: "white", zIndex: 10 }}>
                  <h3 className="brand-font" style={{ fontSize: "2.25rem", marginBottom: "0.75rem" }}>The Evening Wear</h3>
                  <Link href="/shop" style={{ fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.15em", display: "inline-block", fontWeight: "600", color: "white" }}>
                    Shop Now <span style={{ fontSize: "1.2rem" }}>&rarr;</span>
                  </Link>
                </div>
              </div>

              <div className="hover-lift" style={{ position: "relative", height: "550px", borderRadius: "12px", overflow: "hidden", cursor: "pointer", backgroundColor: "var(--accent)" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center", transition: "transform 0.6s ease" }}></div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)" }}></div>
                <div style={{ position: "absolute", bottom: "3rem", left: "3rem", color: "white", zIndex: 10 }}>
                  <h3 className="brand-font" style={{ fontSize: "2.25rem", marginBottom: "0.75rem" }}>Urban Minimalist</h3>
                  <Link href="/shop" style={{ fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.15em", display: "inline-block", fontWeight: "600", color: "white" }}>
                    Shop Now <span style={{ fontSize: "1.2rem" }}>&rarr;</span>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Dynamic Database Cards */}
              {categories.map((cat: any) => (
                <div key={cat.id} className="hover-lift" style={{ position: "relative", height: "550px", borderRadius: "12px", overflow: "hidden", cursor: "pointer", backgroundColor: "var(--accent)" }}>
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                  ) : null}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)" }}></div>
                  <div style={{ position: "absolute", bottom: "3rem", left: "3rem", color: "white", zIndex: 10 }}>
                    <h3 className="brand-font" style={{ fontSize: "2.25rem", marginBottom: "0.75rem", lineHeight: 1.2 }}>{cat.name}</h3>
                    <Link href={`/category/${cat.id}`} style={{ fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.15em", display: "inline-block", fontWeight: "600", color: "white" }}>
                      Explore Series <span style={{ fontSize: "1.2rem" }}>&rarr;</span>
                    </Link>
                  </div>
                </div>
              ))}
              
              {categories.length === 1 && (
                <div className="hover-lift" style={{ position: "relative", height: "550px", borderRadius: "12px", overflow: "hidden", cursor: "pointer", backgroundColor: "var(--accent)" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)" }}></div>
                  <div style={{ position: "absolute", bottom: "3rem", left: "3rem", color: "white", zIndex: 10 }}>
                    <h3 className="brand-font" style={{ fontSize: "2.25rem", marginBottom: "0.75rem", lineHeight: 1.2 }}>AURAWEAR Vault</h3>
                    <Link href={`/shop`} style={{ fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.15em", display: "inline-block", fontWeight: "600", color: "white" }}>
                      Shop All <span style={{ fontSize: "1.2rem" }}>&rarr;</span>
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem 8rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="brand-font" style={{ fontSize: "2rem", marginBottom: "1rem" }}>Featured Pieces</h2>
            <p style={{ color: "var(--muted-foreground)" }}>Hand-selected seasonal highlights.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
            {featuredProducts.map(product => (
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Philosophy Banner */}
      <section style={{ backgroundColor: "var(--accent)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "8rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span style={{ fontSize: "2rem", display: "block", marginBottom: "2rem" }}>✨</span>
          <h2 className="brand-font" style={{ fontSize: "2.5rem", lineHeight: "1.4", margin: "0 auto", display: "inline-block" }}>
            "Simplicity is the ultimate sophistication. We strip away the unnecessary so the essential may speak."
          </h2>
          <p style={{ marginTop: "2rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "600", color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
            AURAWEAR Design Philosophy
          </p>
        </div>
      </section>

    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const getEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("youtube.com/embed/")) return url;
  let videoId = "";
  if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1]?.split("?")[0];
  else if (url.includes("watch?v=")) videoId = url.split("v=")[1]?.split("&")[0];
  else if (url.includes("shorts/")) videoId = url.split("shorts/")[1]?.split("?")[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Review states
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
        setReviews(data.reviews || []);
        
        if (data.sizes && Object.keys(data.sizes).length > 0) {
           const sizeKeys = Object.keys(data.sizes);
           const firstAvail = sizeKeys.find(key => data.sizes[key] > 0);
           if (firstAvail) setSelectedSize(firstAvail);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProduct(); }, [params.id]);

  const handleBuyNow = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    
    if (sizesObj && !selectedSize) {
      alert("Please select a size first.");
      return;
    }
    
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ 
            id: product.id, 
            name: selectedSize ? `${product.name} - Size ${selectedSize}` : product.name, 
            price: product.price, 
            quantity: 1 
          }]
        }),
      });

      if (res.ok) {
        const { url } = await res.json();
        if (url) window.location.href = url;
      } else {
        alert("Checkout failed. Please ensure you are logged in.");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong with the checkout.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setReviewError("You must be logged in to leave a review.");
      return;
    }
    setReviewSubmitting(true);
    setReviewError("");

    try {
      const res = await fetch(`/api/products/${params.id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: reviewRating, comment: reviewComment }),
      });

      if (res.ok) {
        setReviewComment("");
        setReviewRating(5);
        fetchProduct(); 
      } else {
        const msg = await res.text();
        setReviewError(msg || "Failed to submit review. You can only review products you have purchased.");
      }
    } catch (error) {
      setReviewError("An error occurred. Please try again later.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>Loading...</div>;
  if (!product) return <div style={{ textAlign: "center", marginTop: "10rem" }}><h2>Product Not Found</h2></div>;

  const sizesObj = product.sizes && Object.keys(product.sizes).length > 0 ? product.sizes as Record<string, number> : null;
  const isOutOfStock = sizesObj && selectedSize ? sizesObj[selectedSize] <= 0 : product.stock <= 0;
  const isLowStock = sizesObj && selectedSize ? sizesObj[selectedSize] > 0 && sizesObj[selectedSize] <= 5 : product.stock > 0 && product.stock <= 5;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "4rem", marginBottom: "6rem" }}>
        
        {/* Media Block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="animate-fade-in">
          {product.video ? (
            <div style={{ width: "100%", borderRadius: "12px", overflow: "hidden", backgroundColor: "var(--accent)", aspectRatio: "4/5", position: "relative" }}>
              {product.video.includes("youtube") || product.video.includes("youtu.be") ? (
                <iframe 
                  src={getEmbedUrl(product.video)} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              ) : (
                <video src={product.video} controls autoPlay muted loop style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
              )}
            </div>
          ) : product.images && product.images[0] ? (
            <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: "12px", overflow: "hidden", backgroundColor: "var(--accent)" }}>
               <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ) : (
            <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: "12px", backgroundColor: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted-foreground)" }}>No Media Provided</div>
          )}
        </div>

        {/* Details Block */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} className="animate-fade-in">
          <p style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.875rem", color: "var(--muted-foreground)", marginBottom: "1rem", fontWeight: "600" }}>{product.category?.name || "AURAWEAR"}</p>
          <h1 className="brand-font" style={{ fontSize: "3rem", fontWeight: "700", lineHeight: "1.2", marginBottom: "1rem" }}>{product.name}</h1>
          <p style={{ fontSize: "1.5rem", fontWeight: "500", marginBottom: "2rem" }}>${product.price.toFixed(2)}</p>
          
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", fontSize: "1.05rem", marginBottom: "2.5rem" }}>
            {product.description || "Premium aesthetic apparel crafted by AURAWEAR. Exceptional quality for the modern minimalist."}
          </p>

          <div style={{ padding: "2rem", backgroundColor: "var(--accent)", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "2rem" }}>
            
            {/* Stock Diagnostics */}
            <div style={{ marginBottom: "1.5rem" }}>
              
              {sizesObj ? (
                <div style={{ paddingBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                     <span style={{ fontWeight: "600", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Select Size</span>
                     {selectedSize && sizesObj[selectedSize] <= 5 && sizesObj[selectedSize] > 0 && (
                       <span style={{ fontSize: "0.85rem", color: "#f59e0b", fontWeight: "bold" }}>Only {sizesObj[selectedSize]} left in {selectedSize}!</span>
                     )}
                     {selectedSize && sizesObj[selectedSize] <= 0 && (
                       <span style={{ fontSize: "0.85rem", color: "#ef4444", fontWeight: "bold" }}>Out of Stock</span>
                     )}
                  </div>
                  
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {Object.keys(sizesObj).map(s => {
                      const stockAmt = sizesObj[s];
                      const outOfStock = stockAmt <= 0;
                      return (
                        <button 
                           key={s} 
                           disabled={outOfStock}
                           onClick={() => setSelectedSize(s)}
                           style={{ flex: 1, minWidth: "3.5rem", padding: "0.75rem", textAlign: "center", border: selectedSize === s ? "2px solid var(--foreground)" : "1px solid var(--border)", borderRadius: "6px", backgroundColor: selectedSize === s ? "var(--foreground)" : "transparent", color: selectedSize === s ? "var(--background)" : outOfStock ? "var(--muted-foreground)" : "var(--foreground)", opacity: outOfStock ? 0.4 : 1, fontWeight: selectedSize === s ? "bold" : "600", cursor: outOfStock ? "not-allowed" : "pointer", textDecoration: outOfStock ? "line-through" : "none", transition: "all 0.2s" }}>
                           {s}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  {isOutOfStock ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#ef4444", fontWeight: "600", fontSize: "0.875rem" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                      Currently Out of Stock
                    </div>
                  ) : isLowStock ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f59e0b", fontWeight: "600", fontSize: "0.875rem" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                      Hurry! Only {product.stock} left in stock.
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#10b981", fontWeight: "600", fontSize: "0.875rem" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      In Stock & Ready to Ship
                    </div>
                  )}
                </div>
              )}
            </div>

            <button 
              disabled={isOutOfStock || checkoutLoading}
              onClick={handleBuyNow}
              style={{ width: "100%", padding: "1.25rem", borderRadius: "8px", backgroundColor: "var(--foreground)", color: "var(--background)", fontWeight: "600", fontSize: "1rem", letterSpacing: "0.05em", textTransform: "uppercase", border: "none", cursor: isOutOfStock || checkoutLoading ? "not-allowed" : "pointer", opacity: isOutOfStock || checkoutLoading ? 0.6 : 1, transition: "transform 0.2s" }}
              className={!isOutOfStock && !checkoutLoading ? "hover-scale" : ""}
            >
              {checkoutLoading ? "Connecting Secure Payment..." : isOutOfStock ? "Unavailable" : "Buy Now"}
            </button>
            <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Secured instantaneously by Stripe Vault
            </p>
          </div>

        </div>
      </div>

      {/* Verified Reviews Block */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "4rem" }}>
        <h2 className="brand-font" style={{ fontSize: "2rem", marginBottom: "3rem" }}>Verified Reviews</h2>
        
        {session ? (
          <div style={{ backgroundColor: "var(--accent)", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "3rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "1rem" }}>Write a Review</h3>
            {reviewError && <div style={{ backgroundColor: "#fee2e2", color: "#b91c1c", padding: "0.75rem", borderRadius: "8px", marginBottom: "1rem", fontSize: "0.875rem" }}>{reviewError}</div>}
            <form onSubmit={handleReviewSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Rating (1-5)</label>
                <input type="number" min="1" max="5" value={reviewRating} onChange={e => setReviewRating(Number(e.target.value))} required style={{ width: "100px", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Experience / Comments</label>
                <textarea value={reviewComment} onChange={e => setReviewComment(e.target.value)} rows={3} required style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)" }} />
              </div>
              <button disabled={reviewSubmitting} type="submit" style={{ alignSelf: "flex-start", padding: "0.75rem 2rem", backgroundColor: "var(--primary)", color: "var(--primary-foreground)", fontWeight: "600", borderRadius: "8px", border: "none", cursor: reviewSubmitting ? "not-allowed" : "pointer" }} className="hover-opacity">
                {reviewSubmitting ? "Verifying Purchase..." : "Submit Review"}
              </button>
            </form>
          </div>
        ) : (
          <div style={{ backgroundColor: "var(--accent)", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "3rem", textAlign: "center", color: "var(--muted-foreground)" }}>
            Please access your account to leave a verified review.
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
          {reviews.length === 0 ? (
            <p style={{ color: "var(--muted-foreground)", fontStyle: "italic" }}>No reviews yet. Be the first to own and review this piece.</p>
          ) : (
            reviews.map((r: any, idx: number) => (
              <div key={idx} style={{ padding: "1.5rem", border: "1px solid var(--border)", borderRadius: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "600" }}>{r.user.name || "Anonymous Client"}</span>
                  <span style={{ color: "#f59e0b", letterSpacing: "2px" }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                </div>
                <div style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: "600", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Verified Purchase
                </div>
                <p style={{ color: "var(--muted-foreground)", lineHeight: "1.6" }}>"{r.comment}"</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

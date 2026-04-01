"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  
  useEffect(() => {
    // Optionally trigger confetti or clear cart local state here upon mount
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "75vh", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
      <div style={{ padding: "4rem 3rem", backgroundColor: "var(--accent)", borderRadius: "16px", border: "1px solid var(--border)", maxWidth: "550px", width: "100%", boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }} className="animate-fade-in hover-lift">
        
        <div style={{ width: "96px", height: "96px", borderRadius: "50%", backgroundColor: "#10b981", color: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2.5rem", boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)" }}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="brand-font" style={{ fontSize: "2.5rem", marginBottom: "1.25rem", color: "var(--foreground)" }}>Payment Successful</h1>
        
        <p style={{ color: "var(--muted-foreground)", marginBottom: "3rem", lineHeight: "1.7", fontSize: "1.05rem" }}>
          Thank you for your order! Your premium AURAWEAR pieces are being prepared by our fulfillment team. You will receive an email confirmation with your tracking details shortly.
        </p>
        
        <Link href="/" style={{ display: "inline-block", padding: "1.1rem 3rem", backgroundColor: "var(--primary)", color: "var(--primary-foreground)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", borderRadius: "4px", fontSize: "0.875rem", transition: "transform 0.2s" }} className="hover-scale">
          Continue Shopping
        </Link>
        
      </div>
    </div>
  );
}

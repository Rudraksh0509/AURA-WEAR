"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(var(--background-rgb), 0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", transition: "all 0.3s ease" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.25rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Logo */}
        <Link href="/" style={{ fontSize: "1.5rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase" }} className="brand-font hover-opacity">
          AURAWEAR
        </Link>
        
        {/* Nav Links */}
        <nav style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <Link href="/shop" className="hover-opacity" style={{ fontSize: "0.875rem", fontWeight: "500" }}>Collection</Link>
            <Link href="/shop" className="hover-opacity" style={{ fontSize: "0.875rem", fontWeight: "500" }}>Shop All</Link>
          </div>
          
          <div style={{ width: "1px", height: "20px", backgroundColor: "var(--border)", margin: "0 0.5rem" }}></div>
          
          {session ? (
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
              <Link href="#" className="hover-opacity" style={{ fontSize: "0.875rem", fontWeight: "500" }}>Account</Link>
              {(session.user as any)?.role === "ADMIN" && (
                <Link href="/admin" className="hover-opacity" style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--foreground)", textDecoration: "underline" }}>Admin</Link>
              )}
              <button 
                onClick={() => signOut()} 
                className="hover-opacity"
                style={{ fontSize: "0.875rem", fontWeight: "500", color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer" }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Link href="/login" className="hover-opacity" style={{ fontSize: "0.875rem", fontWeight: "600" }}>
                Log In
              </Link>
              <Link href="/register" className="hover-scale" style={{ fontSize: "0.875rem", fontWeight: "600", padding: "0.5rem 1.25rem", backgroundColor: "var(--foreground)", color: "var(--background)", borderRadius: "20px" }}>
                Sign Up
              </Link>
            </div>
          )}
        </nav>

      </div>
    </header>
  );
}

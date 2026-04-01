import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--accent)", borderTop: "1px solid var(--border)", padding: "5rem 2rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
        
        <div style={{ gridColumn: "span 2" }}>
          <h3 className="brand-font" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>AURAWEAR</h3>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: "1.6", maxWidth: "300px" }}>
            Elevating everyday aesthetics. Premium apparel crafted for minimalists and modern visionaries. Join the movement.
          </p>
        </div>
        
        <div>
          <h4 style={{ fontWeight: "600", marginBottom: "1.25rem", fontSize: "0.875rem" }}>Shop</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
            <li><Link href="#" className="hover-opacity">New Arrivals</Link></li>
            <li><Link href="#" className="hover-opacity">Best Sellers</Link></li>
            <li><Link href="#" className="hover-opacity">Sale</Link></li>
            <li><Link href="#" className="hover-opacity">Accessories</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ fontWeight: "600", marginBottom: "1.25rem", fontSize: "0.875rem" }}>Support</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
            <li><Link href="/support" className="hover-opacity">FAQ & Problems</Link></li>
            <li><Link href="/support" className="hover-opacity">Shipping & Returns</Link></li>
            <li><Link href="/support" className="hover-opacity">Contact Us</Link></li>
            <li><Link href="/support" className="hover-opacity">Size Guide</Link></li>
          </ul>
        </div>

      </div>
      
      <div style={{ textAlign: "center", display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--muted-foreground)", fontSize: "0.75rem", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
        <span>&copy; {new Date().getFullYear()} AURAWEAR. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/terms" className="hover-opacity">Terms</Link>
          <Link href="/privacy" className="hover-opacity">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}

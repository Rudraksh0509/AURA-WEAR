export default function SupportPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "4rem auto", padding: "2rem", display: "flex", flexDirection: "column", gap: "3rem" }}>
      
      <div style={{ textAlign: "center" }}>
        <h1 className="brand-font" style={{ fontSize: "3rem", marginBottom: "1rem" }}>AURAWEAR Support</h1>
        <p style={{ color: "var(--muted-foreground)" }}>How can we resolve your problem today?</p>
      </div>

      <div style={{ backgroundColor: "var(--accent)", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
        <h2 className="brand-font" style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Frequently Asked Questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h3 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>How long does shipping take?</h3>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: "1.6" }}>Domestic orders usually arrive within 3-5 business days. International shipping takes 7-14 business days depending on customs.</p>
          </div>
          <div>
            <h3 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>What is your return policy?</h3>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: "1.6" }}>We accept returns within 30 days of purchase for unworn items with original tags attached.</p>
          </div>
          <div>
            <h3 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>How do I track my order?</h3>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: "1.6" }}>Once your payment goes through our Stripe Checkout and is processed, we'll email you a specialized tracking link.</p>
          </div>
        </div>
      </div>

      <div style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--border)", textAlign: "center" }}>
        <h2 className="brand-font" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Still facing an issue?</h2>
        <p style={{ color: "var(--muted-foreground)", marginBottom: "2rem" }}>Our VIP customer experience team is available 24/7 to resolve problems.</p>
        <a href="mailto:support@aurawear.com" style={{ display: "inline-block", padding: "0.875rem 2rem", backgroundColor: "var(--foreground)", color: "var(--background)", fontWeight: "600", borderRadius: "6px", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.875rem" }}>
          Contact Support
        </a>
      </div>

    </div>
  );
}

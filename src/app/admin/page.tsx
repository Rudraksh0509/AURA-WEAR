export default function AdminDashboard() {
  return (
    <div>
      <header style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", letterSpacing: "-0.025em" }}>Dashboard Overview</h1>
        <p style={{ color: "var(--muted-foreground)", marginTop: "0.5rem" }}>Welcome back to your AURAWEAR operations terminal.</p>
      </header>
      
      {/* Metric Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        
        {/* Metric 1 */}
        <div style={{ backgroundColor: "var(--accent)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Total Revenue</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", letterSpacing: "-0.05em" }}>$0.00</p>
        </div>

        {/* Metric 2 */}
        <div style={{ backgroundColor: "var(--accent)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Active Orders</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", letterSpacing: "-0.05em" }}>0</p>
        </div>

        {/* Metric 3 */}
        <div style={{ backgroundColor: "var(--accent)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Inventory Count</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", letterSpacing: "-0.05em" }}>0</p>
        </div>

      </div>
    </div>
  );
}

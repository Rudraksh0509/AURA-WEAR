"use client";
import { useState, useEffect } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>Transactions & Orders</h1>
      
      {loading ? (
        <div style={{ padding: "3rem", textAlign: "center", color: "var(--muted-foreground)" }}>Synchronizing ledgers...</div>
      ) : (
        <div style={{ backgroundColor: "var(--background)", borderRadius: "12px", border: "1px solid var(--border)", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead style={{ backgroundColor: "var(--accent)" }}>
              <tr>
                <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Reference ID</th>
                <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Customer</th>
                <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Settlement</th>
                <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>State</th>
                <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "var(--muted-foreground)" }}>
                    No payment ledger events have been processed yet.
                  </td>
                </tr>
              ) : orders.map((o: any) => (
                <tr key={o.id} style={{ borderBottom: "1px solid var(--border)", transition: "background-color 0.2s" }} className="hover-opacity">
                  <td style={{ padding: "1.25rem", fontFamily: "monospace", fontSize: "0.875rem", fontWeight: "600" }}>{o.id.slice(-8).toUpperCase()}</td>
                  <td style={{ padding: "1.25rem", fontWeight: "500" }}>{o.user?.email || "Abstracted Guest"}</td>
                  <td style={{ padding: "1.25rem", fontWeight: "600" }}>${o.total.toFixed(2)}</td>
                  <td style={{ padding: "1.25rem" }}>
                    <span style={{ padding: "0.35rem 0.85rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.05em", backgroundColor: o.status === "PENDING" ? "rgba(245, 158, 11, 0.15)" : "rgba(16, 185, 129, 0.15)", color: o.status === "PENDING" ? "#f59e0b" : "#10b981" }}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{ padding: "1.25rem", color: "var(--muted-foreground)", fontSize: "0.875rem", fontWeight: "500" }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

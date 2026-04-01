import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Secure route protection
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/"); 
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--background)" }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: "250px", backgroundColor: "var(--accent)", padding: "2rem 1rem", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "2rem", paddingLeft: "0.5rem" }}>AURAWEAR</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link href="/admin" style={{ padding: "0.75rem", borderRadius: "6px", backgroundColor: "var(--background)", fontWeight: "500", transition: "all 0.2s" }}>
            Overview
          </Link>
          <Link href="/admin/categories" style={{ padding: "0.75rem", borderRadius: "6px", fontWeight: "500", color: "var(--muted-foreground)", transition: "all 0.2s" }}>
            Categories
          </Link>
          <Link href="/admin/products" style={{ padding: "0.75rem", borderRadius: "6px", fontWeight: "500", color: "var(--muted-foreground)", transition: "all 0.2s" }}>
            Products
          </Link>
          <Link href="/admin/orders" style={{ padding: "0.75rem", borderRadius: "6px", fontWeight: "500", color: "var(--muted-foreground)", transition: "all 0.2s" }}>
            Orders
          </Link>
        </nav>
        
        <Link href="/api/auth/signout" style={{ padding: "0.75rem", borderRadius: "6px", color: "var(--primary)", marginTop: "auto", fontWeight: "600", opacity: 0.8 }}>
          Log Out
        </Link>
      </aside>

      {/* Dynamic Main Workspace */}
      <main style={{ flex: 1, padding: "3rem", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}

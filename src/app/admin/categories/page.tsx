"use client";
import { useState, useEffect } from "react";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "", image: "", isFeatured: false
  });

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories");
    if (res.ok) setCategories(await res.json());
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await fetch("/api/admin/categories", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...formData } : formData),
    });
    
    setFormData({ name: "", image: "", isFeatured: false });
    setEditingId(null);
    setLoading(false);
    fetchCategories();
  };

  const handleEdit = (category: any) => {
    setFormData({ name: category.name, image: category.image || "", isFeatured: category.isFeatured || false });
    setEditingId(category.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? Deleting a category will fail if products are still attached to it.")) return;
    await fetch("/api/admin/categories", { 
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    fetchCategories();
  };

  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>Collection Management</h1>

      <div style={{ backgroundColor: "var(--accent)", padding: "2.5rem", borderRadius: "16px", marginBottom: "3rem", border: "1px solid var(--border)" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "2rem" }}>
          {editingId ? "Edit Collection" : "Create New Collection"}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>Collection Title</label>
            <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. The Evening Collection" required style={{ width: "100%", padding: "0.875rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", backgroundColor: "var(--background)", color: "var(--foreground)" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>Homepage Background Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }} />
            <input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="Or paste Image URL..." style={{ width: "100%", padding: "0.875rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", backgroundColor: "var(--background)", color: "var(--foreground)" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input type="checkbox" id="isFeatured" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} style={{ width: "1.25rem", height: "1.25rem", cursor: "pointer" }} />
            <label htmlFor="isFeatured" style={{ fontSize: "0.875rem", fontWeight: "500", cursor: "pointer" }}>Feature on Homepage</label>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button disabled={loading} type="submit" style={{ padding: "1rem", flex: 1, backgroundColor: "var(--primary)", color: "var(--primary-foreground)", fontWeight: "600", borderRadius: "8px", border: "none", cursor: "pointer", transition: "opacity 0.2s" }} className="hover-opacity">
              {loading ? "Processing..." : editingId ? "Save Collection" : "Publish Collection"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ name: "", image: "", isFeatured: false }) }} style={{ padding: "1rem", backgroundColor: "var(--background)", color: "var(--foreground)", fontWeight: "600", borderRadius: "8px", border: "1px solid var(--border)", cursor: "pointer" }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{ backgroundColor: "var(--background)", borderRadius: "12px", border: "1px solid var(--border)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ backgroundColor: "var(--accent)" }}>
            <tr>
              <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Collection Asset</th>
              <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Name</th>
              <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Featured</th>
              <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Products Configured</th>
              <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c: any) => (
              <tr key={c.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "1rem" }}>
                  {c.image ? (
                    <div style={{ width: "64px", height: "48px", borderRadius: "6px", overflow: "hidden" }}>
                       <img src={c.image} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ) : <div style={{ width: "64px", height: "48px", borderRadius: "6px", backgroundColor: "var(--accent)" }} />}
                </td>
                <td style={{ padding: "1rem", fontWeight: "600", fontSize: "1.1rem" }}>{c.name}</td>
                <td style={{ padding: "1rem" }}>
                  {c.isFeatured ? (
                    <span style={{ padding: "0.25rem 0.75rem", backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "999px", fontSize: "0.75rem", fontWeight: "bold" }}>Featured</span>
                  ) : <span style={{ color: "var(--muted-foreground)" }}>-</span>}
                </td>
                <td style={{ padding: "1rem", color: "var(--muted-foreground)" }}>{c._count?.products || 0} Products</td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <button onClick={() => handleEdit(c)} style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "1px solid var(--border)", backgroundColor: "transparent", color: "var(--foreground)", borderRadius: "6px", cursor: "pointer", marginRight: "0.5rem" }} className="hover-opacity">Edit</button>
                  <button onClick={() => handleDelete(c.id)} style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none", backgroundColor: "#ef4444", color: "white", borderRadius: "6px", cursor: "pointer" }} className="hover-opacity">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

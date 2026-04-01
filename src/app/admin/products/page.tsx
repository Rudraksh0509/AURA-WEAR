"use client";
import { useState, useEffect } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [hasSizes, setHasSizes] = useState(false);
  const [sizes, setSizes] = useState({ XS: "", S: "", M: "", L: "", XL: "", XXL: "" });

  const [formData, setFormData] = useState({
    name: "", description: "", price: "", stock: "", categoryId: "", images: "", video: ""
  });

  const fetchData = async () => {
    const [pRes, cRes] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/admin/categories")
    ]);
    if (pRes.ok) setProducts(await pRes.json());
    if (cRes.ok) setCategories(await cRes.json());
  };

  useEffect(() => { fetchData(); }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, images: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const url = editingId ? `/api/admin/products/${editingId}` : "/api/admin/products";
    const method = editingId ? "PUT" : "POST";

    const finalSizes = hasSizes ? Object.entries(sizes).reduce((acc, [k, v]) => {
      if (v !== "") acc[k] = parseInt(v as string);
      return acc;
    }, {} as Record<string, number>) : null;

    const totalStock = hasSizes && finalSizes
      ? Object.values(finalSizes).reduce((sum, val) => sum + val, 0)
      : parseInt(formData.stock) || 0;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, stock: totalStock, sizes: finalSizes, images: [formData.images] }),
    });
    
    setFormData({ name: "", description: "", price: "", stock: "", categoryId: "", images: "", video: "" });
    setHasSizes(false);
    setSizes({ XS: "", S: "", M: "", L: "", XL: "", XXL: "" });
    setEditingId(null);
    setLoading(false);
    fetchData();
  };

  const handleEdit = (product: any) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      categoryId: product.categoryId,
      images: product.images[0] || "",
      video: product.video || ""
    });
    
    if (product.sizes && Object.keys(product.sizes).length > 0) {
      setHasSizes(true);
      setSizes({
        XS: product.sizes.XS?.toString() || "",
        S: product.sizes.S?.toString() || "",
        M: product.sizes.M?.toString() || "",
        L: product.sizes.L?.toString() || "",
        XL: product.sizes.XL?.toString() || "",
        XXL: product.sizes.XXL?.toString() || ""
      });
    } else {
      setHasSizes(false);
      setSizes({ XS: "", S: "", M: "", L: "", XL: "", XXL: "" });
    }

    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you positive you want to completely erase this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // @ts-ignore
      const XLSX = await import("xlsx");
      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          if (jsonData.length === 0) {
            alert("No data found in Excel file.");
            setLoading(false);
            return;
          }

          const res = await fetch("/api/admin/products/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ products: jsonData })
          });

          if (res.ok) {
            const result = await res.json();
            alert(`Successfully imported ${result.count} products!`);
            fetchData();
          } else {
            alert("Failed to import products.");
          }
        } catch (err) {
          console.error("Excel parse error", err);
          alert("Error parsing Excel file.");
        } finally {
          setLoading(false);
          e.target.value = "";
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Products Management</h1>
        <div>
          <input type="file" accept=".xlsx, .xls, .csv" onChange={handleExcelUpload} style={{ display: "none" }} id="excel-upload" disabled={loading} />
          <label htmlFor="excel-upload" style={{ padding: "0.875rem 1.5rem", backgroundColor: "var(--foreground)", color: "var(--background)", fontWeight: "600", borderRadius: "8px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, display: "inline-block" }}>
            {loading ? "Processing..." : "Import Excel (.xlsx)"}
          </label>
        </div>
      </div>
      
      <div style={{ backgroundColor: "var(--accent)", padding: "2.5rem", borderRadius: "16px", marginBottom: "3rem", border: "1px solid var(--border)" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "2rem" }}>
          {editingId ? "Edit Product Data" : "List a New Product"}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div style={{ gridColumn: "span 2" }}>
            <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>Product Designation</label>
            <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{ width: "100%", padding: "0.875rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", backgroundColor: "var(--background)", color: "var(--foreground)" }} />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>Editorial Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} style={{ width: "100%", padding: "0.875rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", backgroundColor: "var(--background)", color: "var(--foreground)", resize: "vertical" }} />
          </div>
          
          <div style={{ gridColumn: "span 2", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
             <div>
               <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>Retail Price ($)</label>
               <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required style={{ width: "100%", padding: "0.875rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", backgroundColor: "var(--background)", color: "var(--foreground)" }} />
             </div>
             <div>
               <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>Master Category</label>
               <select value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} required style={{ width: "100%", padding: "0.875rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", backgroundColor: "var(--background)", color: "var(--foreground)", cursor: "pointer" }}>
                 <option value="" disabled>Select category...</option>
                 {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
               </select>
             </div>
          </div>

          <div style={{ gridColumn: "span 2", padding: "1.5rem", backgroundColor: "var(--background)", borderRadius: "8px", border: "1px solid var(--border)" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "600", cursor: "pointer", marginBottom: hasSizes ? "1.5rem" : "0" }}>
              <input type="checkbox" checked={hasSizes} onChange={(e) => setHasSizes(e.target.checked)} style={{ width: "1.2rem", height: "1.2rem", cursor: "pointer" }} />
              Include Clothing Sizes Matrix
            </label>
            
            {hasSizes && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "0.5rem" }}>
                {Object.keys(sizes).map((size) => (
                  <div key={size}>
                    <label style={{ display: "block", fontSize: "0.75rem", marginBottom: "0.25rem", textAlign: "center", fontWeight: "bold" }}>{size}</label>
                    <input type="number" value={(sizes as any)[size]} onChange={(e) => setSizes({ ...sizes, [size]: e.target.value })} placeholder="0" min="0" style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid var(--border)", textAlign: "center", backgroundColor: "var(--accent)", color: "var(--foreground)" }} />
                  </div>
                ))}
              </div>
            )}
            {!hasSizes && (
              <div style={{ marginTop: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>Global Stock Quantity (Non-Apparel)</label>
                <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} style={{ width: "100%", padding: "0.875rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", backgroundColor: "var(--accent)", color: "var(--foreground)" }} />
              </div>
            )}
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>Direct Photo Upload or Paste URL</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }} />
            <input value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} placeholder="Or paste standard Image URL here..." style={{ width: "100%", padding: "0.875rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", backgroundColor: "var(--background)", color: "var(--foreground)" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>Promotional Video URL (Optional)</label>
            <input value={formData.video} onChange={e => setFormData({...formData, video: e.target.value})} placeholder="e.g. YouTube Link" style={{ width: "100%", padding: "0.875rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", backgroundColor: "var(--background)", color: "var(--foreground)" }} />
          </div>
          <div style={{ gridColumn: "span 2", marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
            <button disabled={loading} type="submit" style={{ padding: "1rem", flex: 1, backgroundColor: "var(--primary)", color: "var(--primary-foreground)", fontWeight: "600", borderRadius: "8px", border: "none", cursor: "pointer", transition: "opacity 0.2s" }} className="hover-opacity">
              {loading ? "Processing..." : editingId ? "Save Changes" : "Publish Product"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ name: "", description: "", price: "", stock: "", categoryId: "", images: "", video: "" }); setHasSizes(false); setSizes({ XS: "", S: "", M: "", L: "", XL: "", XXL: "" }); }} style={{ padding: "1rem", flex: 0.3, backgroundColor: "var(--background)", color: "var(--foreground)", fontWeight: "600", borderRadius: "8px", border: "1px solid var(--border)", cursor: "pointer", transition: "opacity 0.2s" }} className="hover-opacity">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{ backgroundColor: "var(--background)", borderRadius: "12px", border: "1px solid var(--border)", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ backgroundColor: "var(--accent)" }}>
            <tr>
              <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Product Asset</th>
              <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Category</th>
              <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>MSRP</th>
              <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Total Stock</th>
              <th style={{ padding: "1.25rem", fontWeight: "600", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: any) => (
              <tr key={p.id} style={{ borderBottom: "1px solid var(--border)", transition: "background-color 0.2s" }}>
                <td style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    {p.images[0] ? (
                      <div style={{ width: "48px", height: "48px", borderRadius: "6px", backgroundImage: `url("${p.images[0]}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
                    ) : ( 
                      <div style={{ width: "48px", height: "48px", borderRadius: "6px", backgroundColor: "var(--accent)" }} /> 
                    )}
                    <span style={{ fontWeight: "600" }}>{p.name} {p.sizes && Object.keys(p.sizes).length > 0 && <span style={{ fontSize: "0.75rem", padding: "0.1rem 0.4rem", backgroundColor: "var(--foreground)", color: "var(--background)", borderRadius: "4px", marginLeft: "0.5rem" }}>APPAREL</span>}</span>
                  </div>
                </td>
                <td style={{ padding: "1.25rem", color: "var(--muted-foreground)", fontWeight: "500" }}>{p.category?.name}</td>
                <td style={{ padding: "1.25rem", fontWeight: "500" }}>${p.price.toFixed(2)}</td>
                <td style={{ padding: "1.25rem" }}>
                  <span style={{ padding: "0.25rem 0.75rem", borderRadius: "20px", backgroundColor: p.stock > 0 ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)", color: p.stock > 0 ? "#10b981" : "#ef4444", fontSize: "0.75rem", fontWeight: "600" }}>
                    {p.stock} Units {p.sizes && Object.keys(p.sizes).length > 0 && <span style={{ opacity: 0.6 }}>(Matrix)</span>}
                  </span>
                </td>
                <td style={{ padding: "1.25rem", textAlign: "right" }}>
                  <button onClick={() => handleEdit(p)} style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "1px solid var(--border)", backgroundColor: "transparent", color: "var(--foreground)", borderRadius: "6px", cursor: "pointer", marginRight: "0.5rem" }} className="hover-opacity">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", border: "none", backgroundColor: "#ef4444", color: "white", borderRadius: "6px", cursor: "pointer" }} className="hover-opacity">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

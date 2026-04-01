"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/admin"); // For now, default routing to admin, can be dynamic later based on role
      router.refresh();
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "var(--background)" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "2.5rem", borderRadius: "16px", backgroundColor: "var(--accent)", border: "1px solid var(--border)", boxShadow: "0 20px 40px -15px rgba(0,0,0,0.2)" }}>
        
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", letterSpacing: "-0.05em", marginBottom: "0.5rem" }}>AURAWEAR</h1>
          <p style={{ color: "var(--muted-foreground)" }}>Sign in to your account</p>
        </div>

        {error && (
          <div style={{ backgroundColor: "#fee2e2", color: "#b91c1c", padding: "0.75rem", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.875rem", textAlign: "center", border: "1px solid #fecaca" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label htmlFor="email" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aurawear.com"
              required
              style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", outline: "none", transition: "border-color 0.2s" }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label htmlFor="password" style={{ fontSize: "0.875rem", fontWeight: "500" }}>Password</label>
              <Link href="#" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Forgot password?</Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", outline: "none", transition: "border-color 0.2s" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "0.875rem", borderRadius: "8px", backgroundColor: "var(--primary)", color: "var(--primary-foreground)", fontWeight: "bold", fontSize: "1rem", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "opacity 0.2s", marginTop: "0.5rem" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ margin: "2rem 0", display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }}></div>
          <span style={{ padding: "0 1rem", fontSize: "0.875rem", color: "var(--muted-foreground)", fontWeight: "500" }}>OR</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }}></div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          style={{ width: "100%", padding: "0.875rem", borderRadius: "8px", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)", fontWeight: "600", fontSize: "0.875rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", outline: "none" }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        <div style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--muted-foreground)", marginTop: "2rem" }}>
          Don't have an account? <Link href="/register" style={{ color: "var(--primary)", fontWeight: "600" }}>Sign Up</Link>
        </div>

      </div>
    </div>
  );
}

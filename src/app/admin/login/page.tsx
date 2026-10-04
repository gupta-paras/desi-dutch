"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, AlertCircle, ArrowLeft, KeyRound, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [devEmail, setDevEmail] = useState("admin@desidutch.nl");
  const [devPassword, setDevPassword] = useState("admin");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [whitelistedEmails, setWhitelistedEmails] = useState<string[]>([]);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin");
    }
  }, [status, router]);

  // Fetch whitelist from config for display
  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data?.config?.admin_users) {
          setWhitelistedEmails(data.config.admin_users);
        }
      })
      .catch(() => {});
  }, []);

  const handleGoogleSignIn = () => {
    setLoading(true);
    signIn("google", { callbackUrl: "/admin" });
  };

  const handleDevSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await signIn("admin-credentials", {
        redirect: false,
        email: devEmail,
        password: devPassword,
      });

      if (res?.error) {
        if (res.error.includes("NOT_WHITELISTED")) {
          setErrorMsg("Access Denied: This email is not in config.yaml admin_users whitelist.");
        } else {
          setErrorMsg("Invalid credentials. Please verify your passcode.");
        }
      } else {
        router.push("/admin");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-jaipur-terracotta/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-saffron/10 blur-3xl pointer-events-none" />

      {/* Back to Site Link */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amsterdam-canal/70 hover:text-jaipur-terracotta transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Desi Dutch</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Logo and Brand Mark */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-jaipur-terracotta to-jaipur-rose flex items-center justify-center text-white shadow-glow mb-4 border border-white/50">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-amsterdam-canal">
            Desi Dutch Admin Portal
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-amsterdam-canal/70">
            Restricted access for authorized management & whitelisted Google accounts
          </p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white p-8 rounded-3xl shadow-card border border-cream-parchment"
        >
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Primary Action: Google OAuth */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl border border-gray-300 bg-white hover:bg-gray-50 text-amsterdam-canal font-semibold text-sm shadow-sm transition-all duration-200 hover:shadow"
            >
              {/* Official Google G Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cream-parchment" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-amsterdam-canal/50 font-semibold tracking-wider">
                  Or Test via Passcode
                </span>
              </div>
            </div>

            {/* Dev / Whitelisted Credential Login Form */}
            <form onSubmit={handleDevSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                  Whitelisted Email
                </label>
                <input
                  type="email"
                  required
                  value={devEmail}
                  onChange={(e) => setDevEmail(e.target.value)}
                  placeholder="admin@desidutch.nl"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-warm border border-cream-parchment text-sm text-amsterdam-canal focus:outline-none focus:ring-2 focus:ring-jaipur-terracotta/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amsterdam-canal/70 uppercase mb-1">
                  Passcode
                </label>
                <input
                  type="password"
                  required
                  value={devPassword}
                  onChange={(e) => setDevPassword(e.target.value)}
                  placeholder="admin"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-warm border border-cream-parchment text-sm text-amsterdam-canal focus:outline-none focus:ring-2 focus:ring-jaipur-terracotta/50"
                />
                <p className="text-[11px] text-amsterdam-canal/50 mt-1">
                  Default developer passcode: <code className="bg-cream-parchment px-1 rounded">admin</code>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-jaipur-terracotta hover:bg-jaipur-rose text-white font-semibold text-sm shadow-md transition-all duration-200"
              >
                <KeyRound className="w-4 h-4" />
                <span>{loading ? "Verifying..." : "Enter Admin Dashboard"}</span>
              </button>
            </form>
          </div>

          {/* Whitelist Transparency Notice */}
          <div className="mt-6 pt-5 border-t border-cream-parchment text-xs text-amsterdam-canal/70 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-amsterdam-canal">
              <Lock className="w-3.5 h-3.5 text-jaipur-terracotta" />
              <span>Whitelisted Google Users (from config.yaml):</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {whitelistedEmails.length > 0 ? (
                whitelistedEmails.map((email) => (
                  <span
                    key={email}
                    className="px-2 py-0.5 rounded-md bg-cream-parchment text-amsterdam-canal/90 text-[11px] font-mono"
                  >
                    {email}
                  </span>
                ))
              ) : (
                <span className="italic text-gray-400">Loading config whitelist...</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

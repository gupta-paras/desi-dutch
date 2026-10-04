"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, RefreshCw, FileCode } from "lucide-react";
import { signOut } from "next-auth/react";

function UnauthorizedContent() {
  const searchParams = useSearchParams();
  const deniedEmail = searchParams.get("email");

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-red-200 shadow-card text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
        <ShieldAlert className="w-9 h-9" />
      </div>

      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amsterdam-canal">
        Access Denied
      </h1>

      <p className="mt-2 text-sm text-amsterdam-canal/75">
        Only whitelisted Google accounts are authorized to manage the Desi Dutch kitchen.
      </p>

      {deniedEmail && (
        <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-100">
          <p className="text-xs text-red-700">Attempted Account:</p>
          <p className="font-mono text-xs font-semibold text-red-900 break-all">{deniedEmail}</p>
        </div>
      )}

      {/* Helpful Instructions */}
      <div className="mt-6 p-4 rounded-xl bg-cream-warm border border-cream-parchment text-left text-xs space-y-2 text-amsterdam-canal/80">
        <p className="font-semibold flex items-center gap-1.5 text-amsterdam-canal">
          <FileCode className="w-4 h-4 text-jaipur-terracotta" />
          <span>How to grant access:</span>
        </p>
        <p>
          Add this Google email to the <code className="bg-cream-parchment px-1.5 py-0.5 rounded font-mono">admin_users</code> list inside <strong className="text-jaipur-dark">config.yaml</strong> in the project root:
        </p>
        <pre className="bg-amsterdam-canal text-cream p-2.5 rounded-lg font-mono text-[11px] overflow-x-auto">
{`admin_users:
  - "${deniedEmail || "your-email@gmail.com"}"`}
        </pre>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-jaipur-terracotta hover:bg-jaipur-rose text-white font-semibold text-sm shadow-sm transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Sign In With Whitelisted Account</span>
        </button>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-amsterdam-canal/70 hover:text-amsterdam-canal text-xs font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Desi Dutch Home</span>
        </Link>
      </div>
    </div>
  );
}

export default function AdminUnauthorizedPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-amsterdam-canal">Loading...</div>}>
        <UnauthorizedContent />
      </Suspense>
    </div>
  );
}

import React, { useState } from "react";
import SEO from "../Components/SEO";
import Logo from "../Components/Logo";

const ForgetPass = () => {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <SEO
        title="Reset Password"
        description="Reset your DevVault account password."
        path="/forgot-password"
        noIndex
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center overflow-x-hidden bg-[#0B0D12] px-6 py-10">
        <div className="w-full max-w-110">
          <header className="mb-8 flex flex-col items-center gap-8">
            <a href="/" rel="noopener noreferrer">
              <Logo />
            </a>
            <div className="text-center">
              <h1 className="text-[2.2rem] font-semibold tracking-tighter text-[#E7E9EE]">
                {sent ? "Check your inbox" : "Reset your password"}
              </h1>
              <p className="mt-2 text-base text-[#8B93A7]">
                {sent ? "We sent a reset link to your email" : "We'll email you a reset link"}
              </p>
            </div>
          </header>
          <main className="rounded-[20px] border border-[#232733] bg-[#121820]/90 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            {sent ? (
              <div className="flex flex-col items-center gap-5 py-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1A2E24] text-[#4FBF8B]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <p className="text-center text-sm text-[#8B93A7]">
                  The link expires in 30 minutes. Didn't get it? Check spam, or send it again.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="w-full rounded-lg border border-[#2D3241] bg-transparent py-3 text-sm font-semibold text-[#E7E9EE] transition-colors hover:bg-[#181D29]"
                >
                  Send again
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#E7E9EE]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full rounded-lg border border-[#2D3241] bg-[#0D1017] px-3.5 py-3 text-sm text-[#E7E9EE] placeholder-[#5A6275] outline-none transition-colors focus:border-[#6E6BF4]"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-1 w-full rounded-xl border border-[#5E5AE6] bg-[#6E6BF4] px-4 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-[#8280F7] active:scale-[0.99]"
                >
                  Send reset link
                </button>
              </form>
            )}
          </main>

          <p className="mt-6 text-center text-sm">
            <a href="/login" className="font-semibold text-[#6E6BF4] transition-colors hover:text-[#8280F7]">
              Back to log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgetPass;
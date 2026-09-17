import React from "react";
import SEO from "../Components/SEO";
import Logo from "../Components/Logo";

const Login = () => {
  return (
    <>
      <SEO
        title="Login"
        description="Log in to DevVault and access your code snippets, notes, and developer knowledge."
        path="/login"
        noIndex
      />
        <div className="relative z-10 flex min-h-screen items-center justify-center overflow-y-hidden px-6 py-5">
          <div className="w-full max-w-110">
            <header className="mb-5 flex flex-col items-center gap-8">
              <a href="/" rel="noopener noreferrer">
              <Logo />
              </a>
              <div className="text-center">
                <h1 className="text-[2.2rem] font-semibold tracking-tighter text-[#E7E9EE]">
                  Welcome back
                </h1>
                <p className="m text-base text-[#8B93A7]">Sign in to your vault</p>
              </div>
            </header>
            <main className="rounded-[20px] border border-[#232733] bg-[#121820]/90 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
              <form className="flex flex-col gap-5">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#E7E9EE]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="alex@example.com"
                    className="w-full rounded-lg border border-[#2D3241] bg-[#0D1017] px-3.5 py-3 text-sm text-[#E7E9EE] placeholder-[#5A6275] outline-none transition-colors focus:border-[#6E6BF4]"
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-semibold text-[#E7E9EE]" >
                      Password
                    </label>
                    <a
                      href="/forgot-password"
                      className="text-sm font-semibold text-[#6E6BF4] transition-colors hover:text-[#8280F7]"
                    >
                      Forgot?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-[#2D3241] bg-[#0D1017] px-3.5 py-3 text-sm text-[#E7E9EE] placeholder-[#5A6275] outline-none transition-colors focus:border-[#6E6BF4]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-1 w-full rounded-xl border border-[#5E5AE6] bg-[#6E6BF4] px-4 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-[#8280F7] active:scale-[0.99]"
                >
                  Log in
                </button>
                <div className="flex items-center gap-3 pt-1">
                  <span className="h-px flex-1 bg-[#232733]" />
                  <span className="text-xs text-[#5A6275]">or</span>
                  <span className="h-px flex-1 bg-[#232733]" />
                </div>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#2D3241] bg-transparent py-3 text-sm font-semibold text-[#E7E9EE] transition-colors hover:bg-[#181D29]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                  GitHub
                </button>
              </form>
            </main>
            <p className="mt-6 text-center text-sm text-[#8B93A7]">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="font-semibold text-[#6E6BF4] transition-colors hover:text-[#8280F7]">
                Sign up
              </a>
            </p>
          </div>
        </div>
    </>
  );
};

export default Login;
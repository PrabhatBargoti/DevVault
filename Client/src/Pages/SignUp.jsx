import React from "react";
import SEO from "../Components/SEO";
import Logo from "../Components/Logo";

const SignUp = () => {
  return (
    <>
      <SEO
        title="Create Your Account"
        description="Create your free DevVault account and start saving, organizing, and finding your developer knowledge."
        path="/signup"
        noIndex
      />
      <div className="min-h-screen bg-[#0B0D12] flex flex-col items-center justify-center px-4 py-10 sm:px-6">
        <header className="flex flex-col items-center gap-8 mb-5">
          <a href="/" rel="noopener noreferrer">
              <Logo />
              </a>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#E7E9EE]">Create your vault</h1>
            <p className="mt-1.5 text-sm text-[#8B93A7]">Free, open source, yours</p>
          </div>
        </header>

        <main className="w-full max-w-md">
          <div className="rounded-2xl border border-[#232733] bg-[#12151C] p-5 sm:p-6">
            <form className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#E7E9EE] mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Alex Carter"
                  className="w-full rounded-lg border border-[#232733] bg-[#0D0F15] px-3.5 py-2.5 text-sm text-[#E7E9EE] placeholder-[#5A6275] outline-none focus:border-[#6E6BF4] transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#E7E9EE] mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="alex@example.com"
                  className="w-full rounded-lg border border-[#232733] bg-[#0D0F15] px-3.5 py-2.5 text-sm text-[#E7E9EE] placeholder-[#5A6275] outline-none focus:border-[#6E6BF4] transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#E7E9EE] mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  className="w-full rounded-lg border border-[#232733] bg-[#0D0F15] px-3.5 py-2.5 text-sm text-[#E7E9EE] placeholder-[#5A6275] outline-none focus:border-[#6E6BF4] transition-colors"
                  required
                />
                <p className="mt-2 text-xs text-[#5A6275]">Use at least 8 characters.</p>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#6E6BF4] hover:bg-[#8280F7] transition-colors py-2.5 text-sm font-semibold text-white"
              >
                Create account
              </button>

              <div className="flex items-center gap-3">
                <span className="flex-1 h-px bg-[#232733]" />
                <span className="text-xs text-[#5A6275]">or</span>
                <span className="flex-1 h-px bg-[#232733]" />
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#2D3241] bg-transparent py-2.5 text-sm font-semibold text-[#E7E9EE] hover:bg-[#1C2029] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
                Continue with GitHub
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#2D3241] bg-transparent py-3 text-sm font-semibold text-[#E7E9EE] transition-colors hover:bg-[#181D29]"
              >
                <svg width="20px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>
                Continue with Google
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-[#8B93A7] mt-6">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-[#6E6BF4] hover:text-[#8280F7] transition-colors">
              Log in
            </a>
          </p>
        </main>
      </div>
    </>
  );
};

export default SignUp;

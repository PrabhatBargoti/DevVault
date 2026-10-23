import SEO from "../../components/SEO";
import ButtonDark from "../../components/ButtonDark";
import ButtonPurple from "../../components/ButtonPurple";
import { useNavigate } from "react-router-dom";
import { Archive } from "lucide-react";

const Page404 = () => {
  const navigate = useNavigate();

  const gotohome = () => {
    navigate("/Home");
  };

  const gotosnippet = () => {
    navigate("/Snippet");
  };

  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or may have been moved."
        path="*"
        noIndex
      />
      <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-[#0B0D12] px-4 py-10 sm:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-112 w-[min(90vw,38rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6E6BF4]/10 blur-3xl"
        />

        <section className="w-full max-w-xl rounded-3xl border border-[#232733] bg-[#12151C]/90 p-6 text-center shadow-2xl shadow-black/30 backdrop-blur sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#6E6BF4]/25 bg-[#6E6BF4]/10 text-[#9290FF]">
            <Archive aria-hidden="true" size={25} strokeWidth={1.8} />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#9290FF]">
            Lost in the vault
          </p>
          <h1 className="mt-3 text-6xl font-bold tracking-tight text-[#E7E9EE] sm:text-7xl">
            404
          </h1>
          <h2 className="mt-4 text-xl font-semibold leading-snug text-[#E7E9EE] sm:text-2xl">
            This page isn’t available
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#8B93A7] sm:text-base">
            The link may be out of date, or the snippet may have been deleted.
            Let’s get you back to something useful.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <ButtonPurple
              name="Go to dashboard"
              onClick={gotohome}
              className="w-full px-5 py-3 sm:w-auto"
            />
            <ButtonDark
              name="Browse snippets"
              onClick={gotosnippet}
              className="w-full px-5 py-3 sm:w-auto"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Page404;

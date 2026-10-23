import { CircleAlert } from 'lucide-react'

const ErrorPage = ({
  title = 'Something went wrong',
  message = 'We couldn’t load your snippets. This is usually temporary.',
  actionLabel = 'Try again',
  onRetry,
}) => (
  <main className="flex min-h-dvh items-center justify-center bg-[#0B0D12] px-4 py-8 text-center sm:px-6">
    <section className="w-full max-w-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#232733] bg-[#12151C] text-[#737C90]">
        <CircleAlert aria-hidden="true" size={25} strokeWidth={1.8} />
      </div>
      <h1 className="mt-5 text-base font-bold text-[#E7E9EE] sm:text-lg">{title}</h1>
      <p className="mx-auto mt-7 max-w-xs text-sm leading-5 text-[#8B93A7] sm:mt-8 sm:text-[15px] sm:leading-[21px]">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-7 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#6E6BF4] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9290FF] sm:mt-8"
      >
        {actionLabel}
      </button>
    </section>
  </main>
)

export default ErrorPage

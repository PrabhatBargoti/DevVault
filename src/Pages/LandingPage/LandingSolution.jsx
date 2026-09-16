import React from 'react'

const cards = [
  {
    title: 'Save',
    description: 'Capture useful code and fixes before you forget where they came from.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
        <path d="M17 21v-8H7v8" />
        <path d="M7 3v5h8" />
      </svg>
    ),
  },
  {
    title: 'Organize',
    description: 'Sort by language, category, and tags that match how you think.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Search',
    description: 'Find a two-year-old solution in the time it takes to type three letters.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: 'Private',
    description: "Your snippets belong to your account and nobody else's.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
]

const LandingSolution = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#0B0D12] gap-14 py-20">
      <div className="flex flex-col items-center text-center max-w-2xl">
        <h1 className="text-[#E7E9EE] font-bold text-5xl sm:text-5xl leading-[1.1] tracking-tight">
          You already solved this once
        </h1>

        <p className="mt-6 text-[#8B93A7] text-lg leading-relaxed max-w-md">
          The fix lives in a closed tab, an old repo, a gist you can't find, or a chat you scrolled past. DevVault gives it one home.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="w-64 rounded-2xl border border-[#232733] bg-[#12151C] p-6"
          >
            <div className="w-9 h-9 rounded-lg bg-[#6E6BF4]/15 text-[#8280F7] flex items-center justify-center mb-5">
              {card.icon}
            </div>
            <h3 className="text-[15px] font-semibold text-[#E7E9EE] mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-[#8B93A7] leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LandingSolution
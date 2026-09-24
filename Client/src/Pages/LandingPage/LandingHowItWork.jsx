import React from 'react'

const cards = [
  {
    title: 'Save',
    description: 'Paste the snippet, command, or config while its still fresh.',
    icon: '01'
  },
  {
    title: 'Organize',
    description: 'Add a language, a category, and a couple of tags',
    icon: '02'
  },
  {
    title: 'Reuse',
    description: 'Hit ⌘K, type three letters, copy what you need.',
    icon: '03'
  }
]

const LandingHowItWork = () => {
  return (
    <section id='how-it-works' className="flex flex-col items-center justify-center gap-10 bg-[#0B0D12] px-4 py-16 sm:gap-14 sm:px-6 sm:py-24">
      <div className="flex flex-col items-center text-center max-w-2xl">
        <h1 className="text-[#E7E9EE] font-bold text-4xl leading-[1.1] sm:text-5xl tracking-tight">
          How it works
        </h1>

        <p className="mt-6 text-[#8B93A7] text-base leading-relaxed sm:text-lg max-w-md">
          Three steps, and the third one is the payoff
        </p>
      </div>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="w-full rounded-2xl border border-[#232733] bg-[#12151C] p-6"
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

export default LandingHowItWork

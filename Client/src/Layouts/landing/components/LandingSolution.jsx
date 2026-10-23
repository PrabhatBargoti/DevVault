const cards = [
  { title: 'Save', description: 'Capture useful code and fixes before you forget where they came from.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" /><path d="M17 21v-8H7v8" /><path d="M7 3v5h8" /></svg> },
  { title: 'Organize', description: 'Sort by language, category, and tags that match how you think.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
  { title: 'Search', description: 'Find a two-year-old solution in the time it takes to type three letters.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg> },
  { title: 'Private', description: "Your snippets belong to your account and nobody else's.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> },
]

const LandingSolution = () => (
  <section id="features" className="flex flex-col items-center justify-center gap-10 bg-[#0B0D12] px-4 py-16 sm:gap-14 sm:px-6 sm:py-24">
    <div className="flex max-w-2xl flex-col items-center text-center"><h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-[#E7E9EE] sm:text-5xl">You already solved this once</h1><p className="mt-6 max-w-md text-base leading-relaxed text-[#8B93A7] sm:text-lg">The fix lives in a closed tab, an old repo, a gist you can&apos;t find, or a chat you scrolled past. DevVault gives it one home.</p></div>
    <div className="grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{cards.map((card) => <div key={card.title} className="w-full rounded-2xl border border-[#232733] bg-[#12151C] p-6"><div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#6E6BF4]/15 text-[#8280F7]">{card.icon}</div><h3 className="mb-2 text-[15px] font-semibold text-[#E7E9EE]">{card.title}</h3><p className="text-sm leading-relaxed text-[#8B93A7]">{card.description}</p></div>)}</div>
  </section>
)

export default LandingSolution

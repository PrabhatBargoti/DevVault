import React from 'react'

const tags = ['React', 'Supabase', 'Node.js']

const LandingOpenSource = () => {
  return (
    <section id='open-source' className="flex flex-col items-center justify-center bg-[#0B0D12] px-4 py-16 sm:px-6 sm:py-24">
      <div className="w-full max-w-4xl rounded-2xl border border-[#232733] bg-[#12151C] p-5 sm:p-8 flex flex-col items-start justify-between gap-6 md:flex-row">
        <div>
          <h3 className="text-xl font-bold text-[#E7E9EE] mb-3">Built in the open</h3>
          <p className="text-sm text-[#8B93A7] leading-relaxed max-w-md">
            DevVault is open source. Read the code, file an issue, or send a pull request — it’s all on GitHub.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-[#8B93A7] border border-[#232733] rounded-lg px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <a href="https://github.com/PrabhatBargoti/DevVault" className="rounded-xl border-2 border-[#232733] bg-[#12151C] px-5 py-3 font-semibold transition-colors hover:bg-[#1C2029]" target="_blank" rel="noopener noreferrer">View on GitHub</a>
      </div>
    </section>
  )
}

export default LandingOpenSource
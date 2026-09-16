import React from 'react'
import BigDarkBtn from '../../Components/BigDarkBtn'

const tags = ['React', 'Supabase', 'Node.js']

const LandingOpenSource = () => {
  return (
    <section className="flex justify-center px-6 -mt-10 items-center bg-[#0B0D12] py-10">
      <div className="w-full max-w-4xl rounded-2xl border border-[#232733] bg-[#12151C] p-8 flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h3 className="text-xl font-bold text-[#E7E9EE] mb-3">Built in the open</h3>
          <p className="text-sm text-[#8B93A7] leading-relaxed max-w-md">
            DevVault is open source. Read the code, file an issue, or send a pull request — it's all on GitHub.
          </p>

          <div className="flex gap-2.5 mt-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-[#8B93A7] border border-[#232733] rounded-lg px-3 py-1.5 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <a href="https://github.com/PrabhatBargoti/DevVault" className='mt-15' target="_blank" rel="noopener noreferrer">
          <BigDarkBtn name={"View on GitHub"} className="w-auto" />
        </a>
      </div>
    </section>
  )
}

export default LandingOpenSource
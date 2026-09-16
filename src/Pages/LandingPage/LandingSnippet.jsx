import React from 'react'
import BigPurpleBtn from '../../Components/BigPurpleBtn'

const snippets = [
  {
    title: 'Express CORS Setup',
    description: 'CORS configuration for Express applications.',
    tags: ['express', 'cors', 'backend'],
    lang: 'JavaScript',
    time: 'today',
  },
  {
    title: 'Supabase Auth Get User',
    description: 'Fetch the currently authenticated user from Supabase.',
    tags: ['supabase', 'auth'],
    lang: 'JavaScript',
    time: '1 day ago',
  },
  {
    title: 'React Custom Fetch Hook',
    description: 'Reusable hook for handling API calls with loading state.',
    tags: ['react', 'hooks', 'api'],
    lang: 'TypeScript',
    time: '1 day ago',
  },
]

const langColor = {
  JavaScript: 'text-[#F0DB4F]',
  TypeScript: 'text-[#8280F7]',
}

const LandingSnippet = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-5xl rounded-xl border border-[#232733]  overflow-hidden shadow-2xl shadow-black/40 -mt-50">

        <div className="flex items-center gap-2 px-4 py-3 bg-[#171B24] border-b border-[#232733]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c12929]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#c6c128]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#17d020]" />
          <span className="ml-2 text-xs text-[#5A6275] tracking-wide">devvault-dev.vercel.app/snippets</span>
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-7">
            <div>
              <h1 className="text-xl font-semibold text-[#E7E9EE] tracking-tight">My snippets</h1>
              <p className="mt-1.5 text-sm text-[#6E6BF4]">8 snippets in your vault</p>
            </div>
            <div className='inline mt-2 p-2'>
            <BigPurpleBtn name={"New snippet"} />
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            {snippets.map((snippet) => (
              <div
                key={snippet.title}
                className="rounded-[10px] border border-[#232733] bg-[#171B24] hover:bg-[#1C2029] hover:border-[#2D3241] transition-colors p-5"
              >
                <h2 className="text-[14.5px] font-semibold text-[#E7E9EE] mb-1.5">{snippet.title}</h2>
                <p className="text-[13px] text-[#8B93A7] leading-relaxed mb-3.5">{snippet.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {snippet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[#232733] bg-[#0D0F15] px-2.5 py-1 text-[11.5px] text-[#8B93A7]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${langColor[snippet.lang]}`}>{snippet.lang}</span>
                  <span className="text-xs text-[#5A6275]">{snippet.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default LandingSnippet
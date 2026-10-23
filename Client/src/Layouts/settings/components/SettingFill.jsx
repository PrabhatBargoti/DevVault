import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Check, ImagePlus, LockKeyhole, ShieldCheck, Trash2, UserRound } from 'lucide-react'
import { getSavedProfile, saveProfile as persistProfile } from '../../../lib/profileStorage'
import { clearSnippets } from '../../../lib/snippetStore'

const AVATAR_SIZE_LIMIT = 1024 * 1024
const inputClassName = 'mt-1.5 min-h-11 w-full rounded-lg border border-[#2B3040] bg-[#12151C] px-3.5 text-sm text-[#E7E9EE] outline-none transition-colors placeholder:text-[#5A6275] focus:border-[#6E6BF4] focus:ring-2 focus:ring-[#6E6BF4]/20'

const getInitials = (name) => name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'DV'

const SettingFill = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState(getSavedProfile)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [avatarError, setAvatarError] = useState('')
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false)
  const fileInputRef = useRef(null)
  const cancelClearRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isClearDialogOpen) return undefined

    cancelClearRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsClearDialogOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isClearDialogOpen])

  const updateProfile = (event) => {
    setProfile((current) => ({ ...current, [event.target.name]: event.target.value }))
    setStatus('')
    setError('')
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    setAvatarError('')
    if (!file) return
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      setAvatarError('Choose a PNG, JPG, or WebP image.')
      return
    }
    if (file.size > AVATAR_SIZE_LIMIT) {
      setAvatarError('Choose an image smaller than 1 MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfile((current) => ({ ...current, avatar: reader.result }))
        setStatus('')
      } else {
        setAvatarError('This image could not be loaded. Try another file.')
      }
    }
    reader.onerror = () => setAvatarError('This image could not be loaded. Try another file.')
    reader.readAsDataURL(file)
  }

  const saveProfile = (event) => {
    event.preventDefault()
    setError('')
    try {
      persistProfile(profile)
      setStatus('Your profile has been saved on this device.')
    } catch {
      setError('Could not save your profile. Check your browser storage and try again.')
    }
  }

  const clearVault = () => {
    clearSnippets()
    setIsClearDialogOpen(false)
    navigate('/Home')
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserRound },
    { id: 'account', label: 'Account', icon: LockKeyhole },
  ]

  return (
    <main className="flex-1 bg-[#0B0D12] px-4 pb-10 pt-7 sm:px-6 sm:pt-8 lg:px-10">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9290FF]">Workspace</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#E7E9EE] sm:text-3xl">Settings</h1>
          <p className="mt-2 text-sm leading-6 text-[#8B93A7] sm:text-[15px]">Manage your profile and current-session vault.</p>
        </header>

        <div role="tablist" aria-label="Settings sections" className="flex gap-1 overflow-x-auto border-b border-[#252A37]">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              id={`${id}-tab`}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              aria-controls={`${id}-panel`}
              onClick={() => { setActiveTab(id); setError(''); setStatus('') }}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 border-b-2 px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#6E6BF4] ${
                activeTab === id
                  ? 'border-[#9290FF] text-[#E7E9EE]'
                  : 'border-transparent text-[#8B93A7] hover:text-[#C7CBD5]'
              }`}
            >
              <Icon aria-hidden="true" size={16} />
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'profile' ? (
          <section id="profile-panel" role="tabpanel" aria-labelledby="profile-tab" className="max-w-2xl pt-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-[#E7E9EE]">Profile</h2>
              <p className="mt-1 text-sm text-[#8B93A7]">Update the personal details saved in this browser.</p>
            </div>

            <form onSubmit={saveProfile} className="rounded-2xl border border-[#252A37] bg-[#12151C] p-4 sm:p-6">
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#6E6BF4] text-lg font-bold text-white ring-4 ring-[#22243B]">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="" className="h-full w-full object-cover" />
                  ) : (
                    getInitials(profile.name)
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#E7E9EE]">Profile photo</p>
                  <p className="mt-1 text-xs leading-5 text-[#8B93A7]">PNG, JPG, or WebP. Up to 1 MB.</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#2B3040] px-3 text-sm font-medium text-[#C7CBD5] transition-colors hover:bg-[#1C2029] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E6BF4]"
                    >
                      <ImagePlus aria-hidden="true" size={15} />
                      Upload photo
                    </button>
                    {profile.avatar && (
                      <button
                        type="button"
                        onClick={() => { setProfile((current) => ({ ...current, avatar: '' })); setStatus('') }}
                        className="min-h-9 px-2 text-sm font-medium text-[#9B99FF] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#6E6BF4]"
                      >
                        Remove photo
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleAvatarChange}
                    className="sr-only"
                    aria-label="Upload a profile photo"
                  />
                  {avatarError && <p role="alert" className="mt-2 text-xs text-[#F08C97]">{avatarError}</p>}
                </div>
              </div>

              <div className="grid gap-4">
                <label className="block text-sm font-semibold text-[#E7E9EE]">
                  Name
                  <input
                    required
                    maxLength={80}
                    autoComplete="name"
                    name="name"
                    value={profile.name}
                    onChange={updateProfile}
                    placeholder="Your name"
                    className={inputClassName}
                  />
                </label>
                <label className="block text-sm font-semibold text-[#E7E9EE]">
                  Email
                  <input
                    required
                    type="email"
                    maxLength={254}
                    autoComplete="email"
                    name="email"
                    value={profile.email}
                    onChange={updateProfile}
                    placeholder="you@example.com"
                    className={inputClassName}
                  />
                  <span className="mt-1.5 block text-xs font-normal text-[#737C90]">Saved locally for this browser only; it is not used to sign in.</span>
                </label>
              </div>

              {error && <p role="alert" className="mt-4 rounded-lg border border-[#61313A] bg-[#29191E] px-3 py-2.5 text-sm text-[#F08C97]">{error}</p>}
              {status && <p role="status" className="mt-4 inline-flex items-center gap-2 text-sm text-[#8DC8A2]"><Check aria-hidden="true" size={16} />{status}</p>}

              <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#252A37] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-[#737C90]">Profile details are stored only on this device.</p>
                <button type="submit" className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-[#5E5AE6] bg-[#6E6BF4] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9290FF] sm:w-auto">
                  Save changes
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section id="account-panel" role="tabpanel" aria-labelledby="account-tab" className="max-w-2xl pt-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-[#E7E9EE]">Account</h2>
              <p className="mt-1 text-sm text-[#8B93A7]">Review sign-in availability and manage data stored on this device.</p>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col gap-4 rounded-xl border border-[#252A37] bg-[#12151C] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#22243B] text-[#9290FF]">
                    <LockKeyhole aria-hidden="true" size={17} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#E7E9EE]">Password and sessions</h3>
                    <p className="mt-1 max-w-md text-sm leading-5 text-[#8B93A7]">Account sign-in and password recovery are not available in the client yet; authentication will be connected through the server.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="inline-flex min-h-10 shrink-0 items-center justify-center self-start rounded-lg border border-[#303545] px-3 text-sm font-medium text-[#D3D8E4] transition-colors hover:bg-[#1C2029] sm:self-center"
                >
                  Reset password
                </button>
              </div>

              <div className="rounded-xl border border-[#252A37] bg-[#12151C] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#22243B] text-[#9290FF]">
                    <ShieldCheck aria-hidden="true" size={18} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#E7E9EE]">Session-only snippets</h3>
                    <p className="mt-1 text-sm leading-5 text-[#8B93A7]">Snippets stay in memory for this session only. They are not saved in browser storage and are cleared when you reload or close the page. Backend sync will be added later.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#63323A]/70 bg-[#171318] p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#352127] text-[#E38A91]">
                      <AlertTriangle aria-hidden="true" size={18} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-[#F08C97]">Clear session vault</h3>
                      <p className="mt-1 max-w-md text-sm leading-5 text-[#A4878B]">Remove all snippets from the current session. Your profile details will remain.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsClearDialogOpen(true)}
                    className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#8F3943] px-4 text-sm font-semibold text-[#F08C97] transition-colors hover:bg-[#352127] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E87582]"
                  >
                    <Trash2 aria-hidden="true" size={15} />
                    Clear session vault
                  </button>
                </div>
                {error && <p role="alert" className="mt-4 text-sm text-[#F08C97]">{error}</p>}
              </div>
            </div>
          </section>
        )}
      </div>
      {isClearDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => event.target === event.currentTarget && setIsClearDialogOpen(false)}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="clear-vault-title"
            aria-describedby="clear-vault-description"
            className="w-full max-w-md rounded-2xl border border-[#63323A] bg-[#11141B] p-5 shadow-2xl sm:p-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#352127] text-[#E38A91]">
              <Trash2 aria-hidden="true" size={19} />
            </div>
            <h2 id="clear-vault-title" className="mt-4 text-base font-semibold text-[#E7E9EE]">Clear all snippets from this session?</h2>
            <p id="clear-vault-description" className="mt-2 text-sm leading-5 text-[#8B93A7]">
              This removes every snippet currently held in memory. Your profile details will not be deleted.
            </p>
            {error && <p role="alert" className="mt-3 text-sm text-[#F08C97]">{error}</p>}
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                ref={cancelClearRef}
                type="button"
                onClick={() => { setIsClearDialogOpen(false); setError('') }}
                className="min-h-10 rounded-lg border border-[#2B3040] px-4 text-sm font-medium text-[#C7CBD5] transition-colors hover:bg-[#1C2029] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E6BF4]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={clearVault}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#8F3943] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#A8444F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E87582]"
              >
                <Trash2 aria-hidden="true" size={15} />
                Clear snippets
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export default SettingFill

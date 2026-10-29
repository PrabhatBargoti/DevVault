export const PROFILE_STORAGE_KEY = 'devvault-profile'
export const PROFILE_UPDATED_EVENT = 'devvault-profile-updated'

export const getSavedProfile = () => {
  try {
    const profile = JSON.parse(window.localStorage.getItem(PROFILE_STORAGE_KEY) || '{}')
    return {
      name: typeof profile.name === 'string' ? profile.name : '',
      email: typeof profile.email === 'string' ? profile.email : '',
      avatar: typeof profile.avatar === 'string' ? profile.avatar : '',
    }
  } catch {
    return { name: '', email: '', avatar: '' }
  }
}

export const saveProfile = (profile) => {
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
  window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT))
}

export const clearSavedProfile = () => {
  window.localStorage.removeItem(PROFILE_STORAGE_KEY)
  window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT))
}

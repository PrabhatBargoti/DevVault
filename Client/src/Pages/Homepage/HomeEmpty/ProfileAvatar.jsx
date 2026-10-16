import { useEffect, useState } from 'react'

const getAvatarDetails = (user) => {
  const metadata = user?.user_metadata || user?.userMetadata || {}
  const identities = Array.isArray(user?.identities) ? user.identities : []
  const name =
    user?.name ||
    user?.fullName ||
    metadata.full_name ||
    metadata.name ||
    metadata.preferred_username ||
    user?.email ||
    ''
  const ownProfileImage =
    user?.profileImageUrl ||
    user?.avatarUrl ||
    metadata.profile_image_url ||
    metadata.profileImageUrl
  const providerImage =
    metadata.avatar_url ||
    metadata.picture ||
    identities
      .filter((identity) => ['google', 'github'].includes(identity.provider))
      .map((identity) => {
        const data = identity.identity_data || identity.identityData || {}
        return data.avatar_url || data.picture || data.avatarUrl
      })
      .find(Boolean)

  return {
    name,
    imageUrl: ownProfileImage || providerImage || '',
  }
}

const ProfileAvatar = ({ user }) => {
  const { name, imageUrl } = getAvatarDetails(user)
  const [imageFailed, setImageFailed] = useState(false)
  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : 'DV'

  useEffect(() => {
    setImageFailed(false)
  }, [imageUrl])

  return (
    <div
      aria-label={name ? `Profile: ${name}` : 'User profile'}
      className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#6E6BF4] text-xs font-bold text-white"
    >
      {imageUrl && !imageFailed ? (
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        initials
      )}
    </div>
  )
}

export default ProfileAvatar

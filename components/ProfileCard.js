import Avatar from './Avatar'

export default function ProfileCard({ profile }) {
  const lastUpdated = profile.updated_at ? new Date(profile.updated_at) : null
  return (
    <div className="flex rounded-md py-5 px-0.5 sm:px-2 dark:bg-black/30 border border-black/20 hover:border-black/40
    dark:border-transparent dark:hover:border-blue-600/20 space-x-4 shadow-xl shadow-black/20 hover:shadow-black/30 
    dark:hover:shadow-blue-600/10 animate-all duration-300">
      <div className='pl-4'>
        <Avatar url={profile.avatar_url} avatarAlt={profile.username} size={100} radius={6} />
      </div>
      <div className="flex flex-col text-left pt-2 space-y-2">
        <p>{profile.username}</p>
        <p>
          <small>
            Ultima atualização:{' '}
            {lastUpdated
              ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
              : 'Never'}
          </small>
        </p>
      </div>
      <div />
    </div>
  )
}
import { Profile } from '../lib/constants'
import Avatar from './Avatar'

export default function ProfileCard({ profile }) {
  const lastUpdated = profile.updated_at ? new Date(profile.updated_at) : null
  return (
    <div className="flex rounded-md bg-black/20 py-5 px-0.5 sm:px-2 border border-black/20 dark:border-white/10 
    space-x-4">
      <div className='pl-4'>
        <Avatar url={profile.avatar_url} size={100} radius={6} />
      </div>
      <div className="flex flex-col text-left pt-2 space-y-2">
        <p>{profile.username}</p>
        <p>
          <small>
            Ultima atualização{' '}
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
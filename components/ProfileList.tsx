import ProfileCard from './ProfileCard'
import { Profile } from '../lib/constants'
import { supabase } from '../lib/supabaseClient'
import { useEffect, useReducer } from 'react'

/**
 * Since we want this component to update in realtime,
 * we should use "useReducer" for sending Realtime events
 */

type State = {
  profiles: Profile[]
}
type Action = {
  type?: string
  payload: any
}
type ProfileListProps = {
  profiles: Profile[]
}

const handleDatabaseEvent = (state: State, action: Action) => {
  if (action.type === 'upsert') {
    const otherProfiles = state.profiles.filter((x) => x.id != action.payload.id)
    return {
      profiles: [action.payload, ...otherProfiles],
    }
  } else if (action.type === 'set') {
    return {
      profiles: action.payload,
    }
  }
  return { profiles: [] }
}

export default function ProfileList({ profiles }: ProfileListProps) {
  const initialState: State = { profiles }
  const [state, dispatch] = useReducer(handleDatabaseEvent, initialState)

  useEffect(() => {
    const subscription = supabase
      .from('profiles')
      .on('*', (payload) => {
        dispatch({ type: 'upsert', payload: payload.new })
      })
      .subscribe()

    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [])

  useEffect(() => {
    dispatch({ type: 'set', payload: profiles })
  }, [profiles])

  return (
    <>
      {state.profiles.length === 0 ? (
        <div className='flex flex-col w-full font-bold'>
          <p className='text-center bg-[length:400px_400px] bg-gradient-to-r 
              from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent 
              animate-[mygradient_3s_ease_infinite] items-center self-center duration-300 
              selection:bg-blue-600/30 dark:selection:bg-blue-600/10'>
            Ainda não há perfis públicos criados
          </p>
        </div>
      ) : (
        <div className="flex flex-col w-full space-y-6">
          {state.profiles?.map((profile: any) => (
            <ProfileCard profile={profile} key={profile.id} />
          ))}
        </div>
      )}
    </>
  )
}
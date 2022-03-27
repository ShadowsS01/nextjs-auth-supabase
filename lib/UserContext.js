import React, { useEffect, useState, createContext, useContext } from 'react'
import { useRouter } from 'next/router'

export const RequireAuth = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])
}

export const AuthRedirect = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/profile')
    }
  }, [user, router])
}

const UserContext = createContext({ user: null, session: null })

export const UserContextProvider = (props) => {
  const { supabaseClient } = props
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = supabaseClient.auth.session()
    setSession(session)
    setUser(session?.user ?? null)
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [supabaseClient.auth])

  const value = {
    session,
    user,
  }
  return <UserContext.Provider value={ value } {...props } />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}

export const RequireUpProfile = () => {
  const { user } = useUser()
  const router = useRouter()

  if (user.user_metadata.username === '' | user.user_metadata.avatar_url === '' |
    !user.user_metadata.username| !user.user_metadata.avatar_url) {
    router.push('/update_profile')
  }
}
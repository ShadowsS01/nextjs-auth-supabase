import ProfileList from '../components/ProfileList'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Profile } from '../lib/constants'
import { useUser, RequireUpProfile } from '../lib/UserContext'
import Link from 'next/link'
import { AiOutlineLoading } from 'react-icons/ai';

export default function Community() {
  const { user, session } = useUser()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  if (user) {
    RequireUpProfile();
  }

  useEffect(() => {
    getPublicProfiles()
  }, [])

  async function getPublicProfiles() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from<Profile>('profiles')
        .select('id, username, avatar_url, website, updated_at')
        .order('updated_at', { ascending: false })

      if (error || !data) {
        throw error || new Error('No data')
      }
      setProfiles(data)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-center p-3 max-w-[520px] m-auto mt-[100px] font-medium 
      transition ease-in-out">
      <div className='flex flex-row justify-between w-full mb-6 border-b border-blue-600/30 pb-2'>
        <h3 className='text-2xl self-center'>
          Perfis públicos
        </h3>
        <div>
          <Link href='/'>
            <a className='w-full flex px-2 py-2 rounded-xl mt-1 sm:mt-2
                font-medium text-blue-600 hover:bg-blue-700/30 dark:hover:bg-blue-600/10 
                selection:bg-blue-700/20 dark:selection:bg-blue-600/10 duration-500'>
              Voltar
            </a>
          </Link>
        </div>
      </div>
      {!user ?
        <>
          {/* <div className='w-full border-b border-blue-600/30'> */}
            <p className='pb-4 text-center selection:bg-blue-700/30 dark:selection:bg-blue-600/20'>
              Faça parte dos{' '}
              <Link href='/login'>
                <a className='text-blue-600 hover:underline'>
                  Perfis públicos
                </a>
              </Link>
            </p>
          {/* </div> */}
        </> :
        <></>
      }
      {!loading ?
        <div className='flex w-full'>
          {error && <div className='font-medium text-red-600'>Falha ao buscar os usuários!</div>}
          <ProfileList profiles={profiles} />
        </div> :
        <div className='flex space-x-2 pt-2'>
          <AiOutlineLoading className='animate-spin h-7 w-7 self-center' />
          <p>Carregando Perfis</p>
        </div>
      }
    </div>
  )
}
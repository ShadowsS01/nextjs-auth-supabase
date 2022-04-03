/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import Link from 'next/link';
import { FaRegUserCircle } from 'react-icons/fa';
import Avatar from '../components/Avatar';
import UploadButton from '../components/UploadButton';
import AuthProvider from '../components/AuthProvider';

import { DEFAULT_AVATARS_BUCKET } from '../lib/constants'
import { useState, useEffect } from 'react'
import { useUser, RequireAuth } from '../lib/UserContext';
import { supabase } from '../lib/supabaseClient';

function UpdateProfile() {
  RequireAuth();

  const { user, session } = useUser();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [doneUploading, setDoneUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [messageUpLoading, setMessageUpLoading] = useState('');
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    getProfile()
  }, [session])

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error logging out:', error.message)
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length == 0) {
        throw 'Você deve selecionar uma imagem para fazer upload.'
      }

      const user = supabase.auth.user()
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${session?.user.id}${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from(DEFAULT_AVATARS_BUCKET)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      let { error: updateError } = await supabase.from('profiles').upsert({
        id: user.id,
        avatar_url: filePath,
      })

      if (updateError) {
        throw updateError
      }

      const { error: updatePError } = await supabase.auth.update({
        data: { avatar: filePath }
      })
      if (updatePError) {
        setError(updatePError.message)
      } else {
        setDoneUploading(true)
        setTimeout(() => setDoneUploading(false), 3000)
        setMessageUpLoading('Avatar atualizado!')
        setTimeout(() => setMessageUpLoading(''), 3000)
      }

      setAvatar(null)
      setAvatar(filePath)
    } catch (error) {
      alert(error.message)
      setDoneUploading(false)
    } finally {
      setUploading(false)
    }
  }

  function setProfile(profile) {
    setAvatar(profile.avatar_url)
    setUsername(profile.username)
  }

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error) {
        throw error
      }

      setProfile(data)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile() {
    try {
      setLoading(true)
      setError('')
      setMessage('')
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        updated_at: new Date(),
      }

      if (!username || username?.length < 3 || username?.length > 16) {
        setError('Digite um Username de 3 à 16 digitos')
      } else {

        let { error } = await supabase.from('profiles').upsert(updates, {
          returning: 'minimal', // Don't return the value after inserting
        })
        if (error) {
          throw error
        } else {
          const { error: updateError } = await supabase.auth.update({
            data: { username: username }
          })
          if (updateError) {
            setError(updateError.message)
          } else {
            setMessage('Perfil atualizado!')
            setIsOpen(true)
            setDone(true)
            setTimeout(() => setMessage(''), 3000)
            setTimeout(() => setDone(false), 3000)
            setTimeout(() => setIsOpen(false), 2000)
          }
        }
      }

    } catch (error) {
      setError(error.message)
      setLoading(false)
      setDone(false)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      {user && (
        <div className="authcontainer text-black dark:text-white flex items-center justify-center 
          rounded-lg p-8 border border-black/10 dark:border-transparent shadow-2xl shadow-black/50 dark:shadow-blue-600/30
          dark:border-transparent dark:bg-zinc-900 font-medium transition-colors duration-300">

          <Head>
            {!user.user_metadata.username || !user.user_metadata.avatar ?
              <title>Informações adicionais!</title>
              : <title>
                Atualizar perfil
              </title>
            }
          </Head>
          <div className="max-w-lg w-full max-w-md">
            <div>
              <h3 className='text-2xl font-semibold'
              >
                {!user.user_metadata.username || !user.user_metadata.avatar ?
                  <>Informações adicionais!</>
                  : <>
                    Atualizar perfil!
                  </>
                }
              </h3>
            </div>

            <div className="flex flex-col">
              <div className='space-y-2 mt-8' >
                <label htmlFor="avatar_url">
                  Imagem do avatar:
                </label>
                <div className='flex flex-row space-x-2'>
                  {avatar ? (
                    <Avatar url={avatar} avatarAlt={username} size={40} radius={8} />
                  ) : (
                    <FaRegUserCircle className='w-10 h-10' />
                  )}
                  <UploadButton onUpload={uploadAvatar} loading={uploading} done={doneUploading} />
                </div>
              </div>
              <div className='mt-3 -mb-5 selection:bg-green-600/30'>
                {messageUpLoading && <div className='text-green-600 font-medium'>{messageUpLoading}</div>}
              </div>
              <div className='flex flex-col mt-8 space-y-5'>
                <div className='space-y-1 opacity-50'>
                  <label htmlFor="email">Email:</label>
                  <input className='inputMail' id="email" type="text" value={session.user.email} disabled />
                </div>

                <div className='space-y-1'>
                  <label htmlFor="username">Username:</label>
                  <input
                    className='inputMail'
                    minLength={3}
                    maxLength={16}
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className='mb-4 text-center'>
                  {error && <div className='font-medium text-red-600'>{error}</div>}
                  {message && <div className='text-green-600 font-medium selection:bg-green-600/30'>{message}</div>}
                </div>
                <div>
                  <AuthProvider.ButtonSubmit
                    onSubmit={updateProfile} loading={loading} done={done} title={'Atualizar'}
                    classNameDone={'h-7 w-7 text-green-600'} classNameLoading={'animate-spin h-7 w-7 mr-2'}
                    classNameP={''} className={'buttonLogin'} />
                </div>
              </div>

              <div className='mt-6 flex justify-between text-sm sm:text-base sm:font-normal 
                  '>
                {!user.user_metadata.username | !user.user_metadata.avatar ?
                  <>
                    <Link href=''>
                      <a
                        className="text-red-600 font-medium hover:underline selection:bg-red-200 
                          dark:selection:bg-red-900/50 dark:selection:text-red-500"
                        onClick={() => signOut()}
                      >
                        Desconectar
                      </a>
                    </Link>
                  </>
                  : <>
                    <Link href='/profile'>
                      <a
                        className="self-center font-medium hover:underline text-blue-600 selection:bg-blue-200 
                          dark:selection:bg-blue-900/50 dark:selection:text-blue-500"
                      >
                        Voltar para perfil
                      </a>
                    </Link>
                    <Link href=''>
                      <a
                        className="self-center font-medium text-red-600 hover:underline selection:bg-red-200 
                          dark:selection:bg-red-900/50 dark:selection:text-red-500"
                        onClick={() => signOut()}
                      >
                        Desconectar
                      </a>
                    </Link>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UpdateProfile;
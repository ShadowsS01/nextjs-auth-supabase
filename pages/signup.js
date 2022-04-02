import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import AuthProvider from '../components/AuthProvider';

import { AuthRedirect } from '../lib/UserContext';
import { supabase } from '../lib/supabaseClient';

const SignUp = () => {
  AuthRedirect()

  const [username, setUsername] = useState('')
  const [avatar_url, setAvatar_url] = useState('')
  const [website, setWebsite] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    if (!email.includes('@')) {
      setError('Por favor, forneça um endereço de e-mail válido')
    } else if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
    } else {
      const { error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
        }, {
        data: { username: username, avatar: avatar_url, website: website }
      })
      if (signUpError) {
        setLoading(false)
        setError(signUpError.message)
      } else {
        setLoading(false)
        setMessage('Verifique seu e-mail para o link de confirmação')
      }
    }
    setLoading(false)
  }

  return (
    <>
      <div className="authcontainer text-black dark:text-white flex items-center justify-center 
            rounded-lg p-8 border border-black/10 dark:border-transparent
            dark:bg-zinc-900 transition-colors duration-300">

        <Head>
          <title>Registrar-se</title>
        </Head>

        <div className="max-w-lg w-full max-w-md">
          <div>
            <h3 className='text-2xl font-semibold'
            >
              Criar conta
            </h3>
          </div>

          <div className="flex flex-col">
            <AuthProvider />

            <form className="flex flex-col mt-10" onSubmit={(e) => handleSignUp(e)}>

              <div className='space-y-5'>
                <div className='space-y-1'>
                  <label htmlFor="email" className='font-medium'>
                    Email:
                  </label>
                  <div>
                    <input
                      className="inputMail peer invalid:border-red-600/60 invalid:hover:border-red-700
                      invalid:focus:ring-red-700/50 invalid:focus:border-red-700 invalid:focus:caret-red-700
                      invalid:selection:bg-pink-700/20 invalid:dark:selection:bg-pink-600/10"
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="hidden peer-invalid:inline text-red-600 font-medium 
                      selection:bg-pink-700/20 dark:selection:bg-pink-600/10">
                      <p className='mt-2 text-sm'>
                        Por favor, forneça um endereço de e-mail válido.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='mt-6 space-y-1'>
                  <label htmlFor="password" className='font-medium'>
                    Senha:
                  </label>
                  <div>
                    <input
                      className="inputMail"
                      minLength={6}
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>


              <div className='mt-4'>
                <div className='mt-2 text-center'>
                  {error && <div className='font-medium text-red-600'>{error}</div>}
                  {message && <div className='text-green-600 font-medium'>{message}</div>}
                </div>

                <div className='mt-6'>
                  {!loading ?
                    <>
                      <button
                        className="buttonLogin"
                        type="submit"
                      >
                        Criar conta
                      </button>
                    </>
                    :
                    <>
                      <button className='buttonLogin cursor-not-allowed disabled:opacity-50' disabled>
                        <div className='flex justify-center'>
                          <AiOutlineLoading className='animate-spin h-7 w-7 mr-2' />
                          Carregando
                        </div>
                      </button>
                    </>
                  }
                </div>
              </div>

              <div className='mt-6 flex flex-col space-y-4 sm:space-y-3 text-sm sm:text-base font-medium sm:font-normal text-center 
                    text-blue-600 selection:bg-blue-200 dark:selection:bg-blue-900/50 dark:selection:text-blue-500'>
                <Link href='/login'>
                  <a className="hover:underline">
                    Você tem uma conta? Entrar
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div >

    </>
  )
}

export default SignUp;
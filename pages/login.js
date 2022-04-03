import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { AuthRedirect } from '../lib/UserContext';
import AuthProvider from '../components/AuthProvider';

const Login = () => {
  AuthRedirect();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false)

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.includes('@')) {
      setError('Por favor, forneça um endereço de e-mail válido')
    } else if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
    } else {
      const { error: signInError } = await supabase.auth.signIn({
        email,
        password,
      })
      if (signInError) {
        setDone(false)
        setLoading(false)
        setError('Credenciais de login inválidas')
      } else {
        setDone(true)
        setLoading(false)
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
          <title>Login</title>
        </Head>

        <div className="max-w-lg w-full max-w-md">
          <div>
            <h3 className='text-2xl font-semibold'
            >
              Login
            </h3>
          </div>

          <div className="flex flex-col">
            <AuthProvider />

            <form className="flex flex-col mt-10" onSubmit={(e) => handleSignIn(e)}>

              <div>
                <div className='space-y-2'>
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

                <div className='mt-6 space-y-2'>
                  <label htmlFor="password" className='font-medium'>
                    Senha:
                  </label>
                  <div>
                    <input
                      className="inputMail"
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className='mt-4'>
                <div className='flex flex-row-reverse'>
                  <Link href='/password_reset'>
                    <a className='text-sm sm:text-base 
                        font-medium sm:font-normal text-blue-600 hover:underline selection:bg-blue-200 
                        dark:selection:bg-blue-900/50 dark:selection:text-blue-500'>
                      Esqueci minha senha!
                    </a>
                  </Link>
                </div>

                <div className='mt-3 text-center'>
                  {error && <div className='font-medium text-red-600'>{error}</div>}
                  {message && <div className='text-green-600 font-medium'>{message}</div>}
                </div>

                <div className='mt-6'>
                  <AuthProvider.ButtonSubmit
                    onSubmit={handleSignIn} loading={loading} done={done} title={'Entrar com e-mail'}
                    classNameDone={'h-7 w-7 text-green-600'} classNameLoading={'animate-spin h-7 w-7 mr-2'}
                    classNameP={''} className={'buttonLogin'} />
                </div>
              </div>

              <div className='mt-6 flex flex-col space-y-4 sm:space-y-3 text-sm sm:text-base font-medium sm:font-normal 
                    text-center text-blue-600 selection:bg-blue-200 dark:selection:bg-blue-900/50 
                    dark:selection:text-blue-500'>
                <Link href='/link_magic'>
                  <a className="hover:underline">
                    Entrar com link mágico
                  </a>
                </Link>
                <Link href='/signup'>
                  <a className="hover:underline">
                    Não tem uma conta? Crie uma
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
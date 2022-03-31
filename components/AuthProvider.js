import Head from 'next/head';
import React, { useState } from 'react';
import { AiOutlineLoading, AiFillGithub, AiOutlineGoogle } from 'react-icons/ai';
import { supabase } from '../lib/supabaseClient';

function AuthProvider() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignInWithGitHub = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await supabase.auth.signIn({
      provider: 'github'
    }, {
      redirectTo: 'https://nextjs-auth-supabase.vercel.app/profile'
    })
    if (signInError) setError(signInError.message);

    setLoading(false);
  }

  const handleSignInWithGoogle = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await supabase.auth.signIn({
      provider: 'google'
    }, {
      redirectTo: 'https://nextjs-auth-supabase.vercel.app/profile'
    });
    if (signInError) setError(signInError.message);

    setLoading(false);
  }

  return (
    <div className="flex flex-col mt-8">
      <p className='font-medium'>Entrar com:</p>
      <div className='space-x-2 flex flex-row mt-3'>
        <button
          className='buttonProvider'
          onClick={handleSignInWithGitHub}
        >
          <AiFillGithub size={30} />
          <p className='sr-only pt-1'>GitHub</p>
        </button>
        <button
          className='buttonProvider'
          onClick={handleSignInWithGoogle}
        >
          <AiOutlineGoogle size={30} />
          <p className='sr-only pt-1'>Google</p>
        </button>
      </div>

      <div className='dark:border-blue-600/20 center mt-10 text-center'>
        <span className='font-medium dark:font-normal text-black/50 selection:bg-blue-200 
                    selection:text-blue-600 dark:selection:bg-blue-600/50 dark:selection:text-white dark:text-white/50'>
          Ou continue com
        </span>
      </div>
    </div>
  )
}

function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
    }
    else {
      const { error } = await supabase.auth.update({ password })
      if (error) setError(error.message)
      else setMessage('Sua senha foi atualizada')
      setLoading(false)
    }
    setLoading(false)
  }

  return (
    <>
      <div className="max-w-[420px] m-auto text-black dark:text-white flex items-center justify-center 
            rounded-lg p-8 border border-black/10 dark:border-transparent
            dark:bg-zinc-900 transition-colors duration-300">

        <Head>
          <title>Redefinir Senha</title>
        </Head>

        <div className="max-w-lg w-full max-w-md">
          <div>
            <h3 className='text-2xl font-semibold'
            >
              Redefinir Senha
            </h3>
          </div>
          <div className="flex flex-col">
            <form className="flex flex-col mt-6" onSubmit={handlePasswordReset}>
              <div>
                <div className='space-y-2'>
                  <label htmlFor="senha" className='font-medium'>
                    Nova senha:
                  </label>
                  <div>
                    <input
                      className="inputMail"
                      type="senha"
                      id="senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className='mt-2'>
                <div className='my-2 mb-4 text-center'>
                  {error && <div className='font-medium text-red-600'>{error}</div>}
                  {message && <div className='text-green-600 font-medium'>{message}</div>}
                </div>
                <div className='mt-2'>
                  {!loading ?
                    <>
                      <button
                        className="buttonLogin text-sm sm:text-base"
                        type="submit"
                      >
                        Atualizar Senha!
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
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

AuthProvider.UpdatePassword = UpdatePassword;
export default AuthProvider;
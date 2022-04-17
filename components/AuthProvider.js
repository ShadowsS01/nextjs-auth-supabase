import Head from 'next/head';
import React, { useState } from 'react';
import { AiOutlineLoading, AiFillGithub, AiOutlineGoogle } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { supabase } from '../lib/supabaseClient';
import ReadPassword from './ReadPassword';

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
  );
}

function ButtonSubmit(props) {
  return (
    <div>
      {props.done ?
        <button
          className='w-full flex justify-center py-3 px-6 focus:outline-none rounded-md bg-green-300/60 
                      hover:bg-green-300/90 dark:bg-green-900/40 dark:hover:bg-green-900/60 transition 
                      ease-in-out duration-500 cursor-default'
        >
          <MdDone className={props.classNameDone} />
        </button>
        : props.loading ?
          <button
            className='w-full flex justify-center py-3 px-6 text-white font-semibold
                        focus:outline-none rounded-md bg-blue-400 hover:bg-blue-500 dark:bg-blue-900/40 
                        dark:hover:bg-blue-900/60 transition ease-in-out duration-500 cursor-progress'
          >
            <div className='flex justify-center items-center'>
              <AiOutlineLoading className={props.classNameLoading} />
              <p
                className={props.classNameP}
              >
                Carregando
              </p>
            </div>
          </button>
          :
          <div>
            <button
              className={props.className}
              type='submit'
              onClick={props.onSubmit}
              disabled={props.loading || props.done}
            >
              {props.title}
            </button>
          </div>
      }
    </div>
  );
}

function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [read, setRead] = useState('password');

  const handlePasswordReset = async () => {
    setError('');
    setMessage('');
    setLoading(true);
    const inputPassword = document.getElementById('password');

    if (password.length < 6 || password.includes(' ')) {
      setError('A senha deve ter pelo menos 6 caracteres');
      inputPassword.classList.replace('inputMail', 'inputError');
      inputPassword.focus();
      inputPassword.onkeydown = function onKeyDownPassword() {
        inputPassword.classList.replace("inputError", "inputMail");
        setError('');
      };
    }
    else {
      const { error } = await supabase.auth.update({ password })
      if (error) {
        setError(error.message);
      } else {
        setMessage('Sua senha foi atualizada');
        setDone(true);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="max-w-[420px] m-auto text-black dark:text-white flex items-center justify-center 
            rounded-lg p-8 border border-black/10 dark:border-transparent
            dark:bg-zinc-900 transition-colors duration-300">

        <Head>
          <title>Redefinir Senha</title>
        </Head>

        <div className="w-full max-w-md">
          <div>
            <h3 className='text-2xl font-semibold'
            >
              Redefinir Senha
            </h3>
          </div>
          <div className="flex flex-col mt-6">
            <div>
              <div className='space-y-2'>
                <div className='flex justify-between self-center items-center'>
                  <label htmlFor="password" className='font-medium'>
                    Nova senha:
                  </label>
                  <ReadPassword password={password} setRead={setRead} read={read} />
                </div>
                <div>
                  <input
                    className="inputMail"
                    minLength={6}
                    type={read}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="text-red-600 font-medium selection:bg-pink-700/20 
                      dark:selection:bg-pink-600/10 mt-0.5">
                    {error == 'A senha deve ter pelo menos 6 caracteres' ?
                      (
                        <>
                          <p className='text-sm'>
                            {error}
                          </p>
                        </>
                      ) : (<></>)}
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <div className={`text-center font-bold
                  ${error ? 'text-red-600 selection:bg-pink-700/20 dark:selection:bg-pink-600/10' :
                  'text-green-600 selection:bg-green-600/30 dark:selection:bg-green-600/20'}`}>
                {error == 'A senha deve ter pelo menos 6 caracteres' ? <></> :
                  <div>{error}</div>
                }
                {message && <div>{message}</div>}
              </div>
              <div className='mt-2'>
                <ButtonSubmit onSubmit={handlePasswordReset} loading={loading} done={done}
                  title={'Atualizar Senha!'} classNameDone={'w-5 h-5 sm:w-6 sm:h-6 text-green-600'}
                  classNameLoading={'animate-spin w-5 h-5 sm:w-6 sm:h-6 mr-2 self-center'}
                  classNameP={'text-sm sm:text-base'} className={'buttonLogin text-sm sm:text-base'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

AuthProvider.ButtonSubmit = ButtonSubmit;
AuthProvider.UpdatePassword = UpdatePassword;
export default AuthProvider;
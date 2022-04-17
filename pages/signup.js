import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import AuthProvider from '../components/AuthProvider';
import ReadPassword from '../components/ReadPassword';

import { AuthRedirect } from '../lib/UserContext';
import { supabase } from '../lib/supabaseClient';

const SignUp = () => {
  AuthRedirect();

  const [username, setUsername] = useState('');
  const [avatar_url, setAvatar_url] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [read, setRead] = useState('password');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('password');

    if (!inputEmail || !inputPassword) {
      alert("Parece que mexeram nos id's do site, irei atualizar!");
      location.reload();
    } else if (!email.includes('@') || !email.includes('.') || !email.trim() || email.includes('@.') || email.includes('.@')) {
      setError('Por favor, forneça um endereço de e-mail válido');
      inputEmail.classList.replace('inputMail', 'inputError');
      inputEmail.focus();
      inputEmail.onkeydown = function onKeyDownEmail() {
        inputEmail.classList.replace("inputError", "inputMail");
        setError('');
      };
    } else if (password.length < 6 || password.includes(' ')) {
      setError('A senha deve ter pelo menos 6 caracteres');
      inputPassword.classList.replace('inputMail', 'inputError');
      inputPassword.focus();
      inputPassword.onkeydown = function onKeyDownPassword() {
        inputPassword.classList.replace("inputError", "inputMail");
        setError('');
      };
    } else {
      const { error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
        }, {
        data: { username: username, avatar: avatar_url, website: website }
      })
      if (signUpError) {
        setLoading(false);
        setError(signUpError.message);
      } else {
        setLoading(false);
        setDone(true);
        setMessage('Verifique seu e-mail para o link de confirmação');
      }
    }
    setLoading(false);
  }

  return (
    <>
      <div className="authcontainer text-black dark:text-white flex items-center justify-center 
            rounded-lg p-8 border border-black/10 dark:border-transparent
            dark:bg-zinc-900 transition-colors duration-300">

        <Head>
          <title>Registrar-se</title>
        </Head>

        <div className="w-full max-w-md">
          <div>
            <h3 className='text-2xl font-semibold'
            >
              Criar conta
            </h3>
          </div>

          <div className="flex flex-col">
            <AuthProvider />

            <form className="flex flex-col mt-10" onSubmit={(e) => handleSignUp(e)}>

              <div>
                <div className='space-y-2'>
                  <label htmlFor="email" className='font-medium'>
                    Email:
                  </label>
                  <div>
                    <input
                      className="inputMail"
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="text-red-600 font-medium selection:bg-pink-700/20 
                      dark:selection:bg-pink-600/10 mt-0.5">
                      {error == 'Por favor, forneça um endereço de e-mail válido' ?
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

                <div className={`space-y-2 ${error == 'Por favor, forneça um endereço de e-mail válido' ? 'mt-2' : 'mt-6'}`}>
                  <div className='flex justify-between self-center items-center'>
                    <label htmlFor="password" className='font-medium'>
                      Senha:
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


              <div className={`${error == 'Credenciais de login inválidas' ? 'mt-0' : 'mt-4'}`}>
                <div className={`text-center font-bold
                  ${error ? 'text-red-600 selection:bg-pink-700/20 dark:selection:bg-pink-600/10' :
                    'text-green-600 selection:bg-green-600/30 dark:selection:bg-green-600/20'}`}>
                  {error == 'Por favor, forneça um endereço de e-mail válido' || error == 'A senha deve ter pelo menos 6 caracteres' ? <></> :
                    <div>{error}</div>
                  }
                  {message && <div>{message}</div>}
                </div>

                <div className='mt-4'>
                  <AuthProvider.ButtonSubmit
                    onSubmit={handleSignUp} loading={loading} done={done} title={'Criar conta'}
                    classNameDone={'h-7 w-7 text-green-600'} classNameLoading={'animate-spin h-7 w-7 mr-2'}
                    classNameP={''} className={'buttonLogin'} />
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
  );
}

export default SignUp;
import Link from 'next/link';
import Head from 'next/head';
import React, { useState } from 'react';

import { useUser, RequireUpProfile } from '../lib/UserContext';
import AuthProvider from '../components/AuthProvider';
import { supabase } from '../lib/supabaseClient';

function PasswordReset() {
  const { user, session } = useUser();

  if (user) {
    RequireUpProfile();
  };

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const inputEmail = document.getElementById('email');

    if (!inputEmail) {
      alert("Parece que mexeram nos id's do site, irei atualizar!");
      location.reload();
    } else if (!email.includes('@') || !email.includes('.') || !email.trim() || email.includes('@.') || email.includes('.@')) {
      setError('Por favor, forneça um endereço de e-mail válido');
      setDone(false);
      inputEmail.classList.replace('inputMail', 'inputError');
      inputEmail.focus();
      inputEmail.onkeydown = function onKeyDownEmail() {
        inputEmail.classList.replace("inputError", "inputMail");
        setError('');
      };
    } else {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email)
      if (error) {
        if (error.message == 'Unable to validate email address: invalid format') {
          setError('Por favor, forneça um endereço de e-mail válido');
          inputEmail.classList.replace('inputMail', 'inputError');
          inputEmail.focus();
          inputEmail.onkeydown = function onKeyDownEmail() {
            inputEmail.classList.replace("inputError", "inputMail");
            setError('');
          };
        } else if (error.message == 'For security purposes, you can only request this once every 60 seconds') {
          setError('Por motivos de segurança, você só pode solicitar isso uma vez a cada 60 segundos');
          inputEmail.classList.replace('inputMail', 'inputError');
          inputEmail.focus();
          inputEmail.onkeydown = function onKeyDownEmail() {
            inputEmail.classList.replace("inputError", "inputMail");
            setError('');
          };
        } else if (error.message == 'User not found') {
          setError('Usuário não encontrado');
          inputEmail.classList.replace('inputMail', 'inputError');
          inputEmail.focus();
          inputEmail.onkeydown = function onKeyDownEmail() {
            inputEmail.classList.replace("inputError", "inputMail");
            setError('');
          };
        } else {
          setError(error.message);
        }
      } else {
        setLoading(false);
        setDone(true);
        setMessage('Verifique seu e-mail para o link de redefinição de senha');
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
          <title>Redefinir senha!</title>
        </Head>

        <div className="w-full max-w-md">
          <div>
            <h3 className='text-2xl font-semibold'
            >
              Redefinir sua senha
            </h3>
          </div>

          {user ? <></> : <AuthProvider />}

          <form className="flex flex-col mt-10" onSubmit={handlePasswordReset}>

            <div>
              <div className='space-y-2'>
                <label htmlFor="email" className="font-medium after:content-['*'] after:ml-1 after:text-red-500">
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
            </div>

            <div className='mt-2'>
              <div className={`text-center font-bold
                  ${error ? 'text-red-600 selection:bg-pink-700/20 dark:selection:bg-pink-600/10' :
                  'text-green-600 selection:bg-green-600/30 dark:selection:bg-green-600/20'}`}>
                {error == 'Por favor, forneça um endereço de e-mail válido' ? <></> :
                  <div>{error}</div>
                }
                {message && <div>{message}</div>}
              </div>

              <div className='mt-2'>
                <AuthProvider.ButtonSubmit
                  onSubmit={handlePasswordReset} loading={loading} done={done}
                  title={'enviar e-mail de redefinição de senha'}
                  classNameDone={'w-5 h-5 sm:w-6 sm:h-6 text-green-600'}
                  classNameLoading={'animate-spin w-5 h-5 sm:w-6 sm:h-6 mr-2 self-center'}
                  classNameP={'text-sm sm:text-base'} className={'buttonLogin text-sm sm:text-base'} />
              </div>
            </div>

            <div className='mt-6 flex text-sm sm:text-base font-medium sm:font-normal 
                  text-blue-600 selection:bg-blue-200 dark:selection:bg-blue-900/50 
                  dark:selection:text-blue-500'>
              {!user ?
                <><Link href='/login'>
                  <a className="hover:underline">
                    Voltar para fazer login
                  </a>
                </Link>
                </>
                : <>
                  <Link href='/profile'>
                    <a className="hover:underline">
                      Voltar para perfil
                    </a>
                  </Link>
                </>
              }
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PasswordReset;
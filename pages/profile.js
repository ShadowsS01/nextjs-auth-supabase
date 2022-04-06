import Head from "next/head";
import Link from "next/link";
import { useUser, RequireAuth, RequireUpProfile } from "../lib/UserContext";
import classNames from "../lib/classsesNames";
import { Tab } from '@headlessui/react';
import { supabase } from "../lib/supabaseClient";

export default function ProfileUser() {
  RequireAuth();
  const { user, session } = useUser();

  if (user) {
    RequireUpProfile();
  };

  return (
    <>
      {user && (
        <div className="p-3 max-w-[520px] m-auto mt-[100px] font-medium transition ease-in-out">
          <Head>
            {!user.user_metadata.username ?
              <title>Perfil</title>
              : <title>
                Perfil - {user.user_metadata.username}
              </title>
            }
          </Head>

          <div className='flex mb-4'>
            <div className='w-full flex flex-col text-center md:text-left'>
              <p className='text-lg text-green-600 selection:bg-green-600/20'>Você está conectado!</p>
              <p className='mt-2'>E-mail: {user.email}</p>
              <p>Username: {user.user_metadata.username}</p>
            </div>
          </div>

          <div className="py-4">
            <Tab.Group>
              <Tab.List className='flex justify-around mb-6 bg-blue-900/20 dark:bg-black/40 rounded-t-xl'>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full py-3.5 text-sm leading-5 font-medium rounded-t-xl',
                      'focus:outline-none border-b-2 border-transparent duration-500',
                      selected
                        ? 'bg-blue-300 text-blue-700 border-b-2 border-blue-600 dark:bg-blue-600/20 dark:text-blue-500'
                        : 'hover:bg-white/30 hover:text-black/75 dark:hover:bg-black/30 dark:hover:text-white/75'
                    )
                  }
                >
                  Visão Geral
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full py-3.5 text-sm leading-5 font-medium rounded-t-xl',
                      'focus:outline-none border-b-2 border-transparent duration-500',
                      selected
                        ? 'bg-blue-300 text-blue-700 border-b-2 border-blue-600 dark:bg-blue-600/20 dark:text-blue-500'
                        : 'hover:bg-white/30 hover:text-black/75 dark:hover:bg-black/30 dark:hover:text-white/75'
                    )
                  }
                >
                  Configurações
                </Tab>
              </Tab.List>
              <Tab.Panels className='text-center'>
                <Tab.Panel>
                  <div>
                    <div className='flex flex-col mt-8'>
                      <div className='text-blue-600 selection:bg-blue-200 space-y-1
                              dark:selection:bg-blue-600/20 dark:selection:text-blue-500 text-center 
                              md:text-left border-b border-blue-600/30 pb-5'>
                        <p>Informações do usuário: {user.email}</p>
                      </div>

                      <div className='flex flex-col mt-5 space-y-6 font-medium text-left'>
                        <div className='space-y-1'>
                          <label htmlFor="email">Email:</label>
                          <div className='opacity-75 dark:opacity-50'>
                            <input id="email" type="email" value={session.user.email} className='inputMail' disabled />
                          </div>
                        </div>

                        <div className='space-y-1'>
                          <label htmlFor="username">Username:</label>
                          <div className='opacity-75 dark:opacity-50'>
                            <input id="username" type="text" value={session.user.user_metadata.username}
                              className='inputMail' disabled />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className='flex flex-row justify-between'>
                    <Link href='/password_reset'>
                      <a className='px-2 py-2 rounded-xl font-medium text-blue-600 hover:bg-blue-700/30 
                            dark:hover:bg-blue-600/10 selection:bg-blue-700/20 dark:selection:bg-blue-600/10 
                            selection:text-blue-900 dark:selection:text-blue-600 duration-500'>
                        Redefinir senha!
                      </a>
                    </Link>
                    <Link href='/update_profile'>
                      <a className='px-2 py-2 rounded-xl font-medium text-blue-600 hover:bg-blue-700/30 
                            dark:hover:bg-blue-600/10 selection:bg-blue-700/20 dark:selection:bg-blue-600/10 
                            selection:text-blue-900 dark:selection:text-blue-600 duration-500'>
                        Atualizar perfil!
                      </a>
                    </Link>
                    <Link href=''>
                      <a onClick={() => supabase.auth.signOut()}
                        className='flex items-center px-2 py-2 rounded-xl font-medium text-red-600 hover:bg-red-700/30 
                          dark:hover:bg-red-600/10 selection:bg-pink-700/20 dark:selection:bg-pink-600/10 
                          duration-500'>
                        Desconectar
                      </a>
                    </Link>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div >
      )
      }
    </>
  );
}
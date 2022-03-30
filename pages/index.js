import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import AuthProvider from '../components/AuthProvider';

import { useUser, RequireUpProfile } from '../lib/UserContext';

const Home = () => {
  const [authView, setAuthView] = useState('home')
  const { user, session } = useUser();

  if (user) {
    RequireUpProfile();
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') setAuthView('update_password');
      if (event === 'USER_UPDATED') setTimeout(() => setAuthView('home'), 1000);
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  return (
    <>
      {authView === 'update_password'
        &&
        <div className='mt-[150px]'>
          <AuthProvider.UpdatePassword />
        </div>
      }
      <>
        {authView === 'home' ? (
          <main className="mt-[100px] mx-auto max-w-7xl px-4 sm:mt-28 sm:px-6 md:mt-32 lg:mt-35 lg:px-8 xl:mt-40">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                Autenticação de usúarios usando o{' '}
                <a href='https://supabase.com/'
                  className="text-green-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer">
                  Supabase
                </a> e{' '}
                <a href='https://nextjs.org/'
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer">
                  Next.js!
                </a>
              </h1>

              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href='#'
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-green-400 hover:bg-green-600 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-400 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Live demo
                  </a>
                </div>
              </div>
            </div>
          </main>
        ) : null}
      </>
    </>
  )
}

export default Home
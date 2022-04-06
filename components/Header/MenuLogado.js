import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import classNames from '../../lib/classsesNames';
import ThemeToggle from './ThemeToggle';
import { supabase } from '../../lib/supabaseClient';

import Avatar from '../Avatar';

const MenuLogado = ({ profile }) => (
  <>
    <div className='font-bold -mr-1 transition-colors'>
      <Link href='/community'>
        <a className="hidden sm:flex bg-[length:400px_400px] bg-gradient-to-r 
              from-purple-600 via-blue-600 to-purple-600 hover:from-purple-600/30 hover:via-blue-600/30 
              hover:to-purple-600/30 bg-clip-text text-transparent hover:bg-clip-padding hover:text-current 
              rounded-md px-1 py-1 animate-[mygradient_3s_ease_infinite] items-center self-center duration-500">
          Comunidade
        </a>
      </Link>
    </div>
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <div className='mx-4'>
            <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:opacity-50 duration-300">
              <span className="sr-only">Abrir menu de usuário</span>
              <Avatar url={profile.avatar} avatarAlt={profile.username} size={38} radius={9999} />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="font-medium origin-top-right absolute right-0 mt-2 w-48 rounded-md py-1 ring-1 
              ring-black ring-opacity-5 focus:outline-none bg-white/90 dark:bg-black/90 shadow-2xl 
              dark:shadow-blue-900/80 shadow-blue-500/50 transition-all ease-in-out text-center"
            >
              <Menu.Item>
                {({ active }) => (
                  <Link href="/profile">
                    <a className={classNames(
                      active ? '' : 'rounded-sm hover:text-blue-600 hover:bg-blue-300 dark:hover:text-blue-300 dark:hover:bg-blue-600/30 duration-300',
                      'block px-4 py-2 text-sm'
                    )}>
                      Seu perfil
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <>
                    <Link href="/community">
                      <a
                        className={classNames(
                          active ? '' : 'flex sm:hidden font-bold justify-center bg-[length:400px_400px] bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-[mygradient_3s_ease_infinite] rounded-sm hover:from-blue-600/50 hover:via-purple-600/50 hover:to-blue-600/50 dark:hover:from-purple-600/30 dark:hover:via-blue-600/30 dark:hover:to-purple-600/30 hover:bg-clip-padding hover:text-current duration-500',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Comunidade
                      </a>
                    </Link>
                  </>
                )}
              </Menu.Item>
              <Menu.Item>
                <Link href=''>
                  <a onClick={() => supabase.auth.signOut()}
                    className="font-medium text-left block w-48 px-4 py-2 text-sm rounded-sm
                    hover:text-red-600 hover:bg-red-700/30 dark:hover:bg-red-600/10 text-center duration-300">
                    Desconectar
                  </a>
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu >
    <div className='flex -ml-1'>
      <ThemeToggle />
    </div>
  </>
)

export default MenuLogado;
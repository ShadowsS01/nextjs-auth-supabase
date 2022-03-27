import Link from 'next/link'
import { HiMenu } from "react-icons/hi";
import React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import ThemeToggle from './ThemeToggle';

const MenuNotLogado = () => (
  <div className="flex space-x-4">
    <nav className="flex space-x-3 content-center items-center place-content-center">
      <div className='font-bold'>
        <Link href='/community'>
          <a className="hidden sm:flex bg-[length:400px_400px] bg-gradient-to-r 
              from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent 
              animate-[mygradient_3s_ease_infinite] hover:opacity-75 dark:hover:opacity-50
              items-center self-center duration-300">
            Comunidade
          </a>
        </Link>
      </div>
      <div className='flex space-x-1 content-center items-center place-content-center'>
        <Link href="/login">
          <a className="hidden sm:flex self-center px-2 py-1 font-medium hover:opacity-50 duration-300"
          >
            Login
          </a>
        </Link>
        <Link href="/signup">
          <a className="px-2 py-1 font-medium border rounded-lg border-black dark:border-white 
          hover:opacity-50 flex self-center duration-300"
          >
            Registrar-se
          </a>
        </Link>
      </div>
      <div className="hidden sm:inline">
        <ThemeToggle />
      </div>
    </nav>
    <Menu as="div" className="relative sm:hidden">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="flex text-sm focus:outline-none active:opacity-50 hover:opacity-50 duration-300">
              <span className="sr-only">Abrir menu</span>
              <HiMenu className="h-8 w-8" />
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
              className="flex flex-col origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 ring-1 
                    ring-black ring-opacity-5 focus:outline-none bg-white/90 dark:bg-black/90 dark:shadow-blue-900/30
                    shadow-2xl shadow-blue-300 content-around"
            >
              <Menu.Item>
                <div className="flex justify-center pt-3">
                  <ThemeToggle />
                </div>
              </Menu.Item>
              <Menu.Item>
                <div className="flex justify-center space-x-2 pt-5 text-normal font-medium duration-300 mb-3">
                  <Link href="/login">
                    <a
                      className='px-2 py-1 hover:opacity-50'
                    >
                      Login
                    </a>
                  </Link>
                  <Link href="/signup">
                    <a
                      className='px-2 py-1 border rounded-md border-black/30 dark:border-white/30 hover:opacity-50'
                    >
                      Registre-se
                    </a>
                  </Link>
                </div>
              </Menu.Item>
              <Menu.Item>
                <div className="flex justify-center text-xl font-bold duration-300 mb-2">
                  <Link href='/community'>
                    <a className="bg-[length:400px_400px] bg-gradient-to-r 
                      from-blue-600 via-purple-600 to-blue-600
                      bg-clip-text text-transparent animate-[mygradient_3s_ease_infinite] 
                      items-center self-center">
                      Comunidade
                    </a>
                  </Link>
                </div>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  </div>
)

export default MenuNotLogado
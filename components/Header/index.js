import MenuNotLogado from "./MenuNotLogado";
import MenuLogado from "./MenuLogado";
import Link from 'next/link';
import Image from "next/image";

import { useUser } from '../../lib/UserContext';

const Header = () => {
  const { user, session } = useUser()

  return <>
    <header className="flex items-center fixed top-0 left-0 w-full flex-row justify-between dark:shadow-2xl 
      shadow-xl backdrop-blur header dark:bg-gray-900/50 dark:shadow-blue-900/30
      pt-2 pb-2 duration-300 transition-opacity ease-in-out duration-300">
      <div className="flex ml-5">
        <Link href="/" passHref>
          <Image src="https://github.com/ShadowsS01.png" alt="Home" width={48} height={48}
            className="rounded-full cursor-pointer hover:opacity-75 dark:hover:opacity-50 duration-300">
          </Image>
        </Link>
      </div>
      <nav className="flex pr-5 content-center items-center place-content-center">
        {!user ?
          <MenuNotLogado /> :
          <MenuLogado profile={user.user_metadata} />
        }
      </nav>
    </header>
  </>
};

export default Header
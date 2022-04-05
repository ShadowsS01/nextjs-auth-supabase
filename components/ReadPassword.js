import { BiShowAlt, BiHide } from 'react-icons/bi';

export default function ReadPassword(props) {
  function IsRead() {
    if (props.password === '') {
      props.setRead('password')
    } else if (props.read == 'password') {
      props.setRead('text')
    } else {
      props.setRead('password')
    }
  }

  return (
    <div className='flex self-center'>
      {props.password === '' ?
        <></> :
        <button
          onClick={() => IsRead()}
          className='text-blue-600 hover:underline cursor-pointer'
          aria-label={props.read == 'password' ? 'Mostrar senha' : 'Esconder senha'}
          type='button'
        >
          {props.read == 'password' ?
            <div className='flex space-x-1'>
              <BiShowAlt className='w-6 h-6' />
              <span className="sr-only">Mostrar Senha</span>
            </div>
            :
            <div className='flex'>
              <BiHide className='w-6 h-6' />
              <span className="sr-only">Esconder Senha</span>
            </div>
          }
        </button>
      }
    </div>
  )
}
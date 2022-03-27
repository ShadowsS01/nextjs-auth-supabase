import { AiOutlineLoading } from 'react-icons/ai';

export default function UploadButton(props) {
  return (
    <div className="flex flex-wrap text-sm sm:text-base font-medium sm:font-normal">
      <label
        className='px-3 sm:px-5 py-2 rounded-lg font-medium text-black border border-blue-900/30 
          hover:border-blue-900 bg-blue-300/50 hover:bg-blue-300 dark:border-transparent
          dark:text-white/75 dark:hover:text-white dark:hover:border-blue-600/50 dark:bg-black/50 
          dark:hover:bg-black selection:bg-blue-700/20 dark:selection:bg-blue-600/10 selection:text-blue-900 
          dark:selection:text-blue-600 duration-700 cursor-pointer flex'
        htmlFor="single">
        {props.loading ?
          <div className='flex'>
            <AiOutlineLoading className='animate-spin self-center mr-1.5' />
            Enviando
          </div> :
          'Escolher imagem!'
        }
      </label>
      <input
        className='hidden'
        style={{
          position: 'absolute',
        }}
        type="file"
        id="single"
        accept="image/*"
        onChange={props.onUpload}
        disabled={props.loading}
      />
    </div>
  )
}
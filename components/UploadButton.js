import { AiOutlineLoading } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

function UploadButton(props) {
  return (
    <div className="flex flex-wrap text-sm sm:text-base font-medium sm:font-normal">
      {props.done ? (
        <>
          <label
            className='flex justify-center items-center px-5 py-2 rounded-lg font-medium text-green-600 border 
              border-green-800/40 hover:border-green-800/90 bg-green-300/60 hover:bg-green-300/90 
              dark:border-transparent dark:hover:border-green-600/30 dark:bg-black/50 dark:hover:bg-black
              duration-700'
            htmlFor="single"
          >
            <MdDone className='w-5 h-5' />
          </label>
        </>
      ) : props.loading ? (
        <>
          <label
            className='flex justify-center items-center px-3 sm:px-5 py-2 rounded-lg font-medium text-black 
              border border-blue-900/30 hover:border-blue-900/60 bg-blue-300/50 hover:bg-blue-300/70
              dark:border-transparent dark:text-white/75 dark:hover:text-white dark:hover:border-blue-600/30 
              dark:bg-black/50 dark:hover:bg-black selection:bg-blue-700/20 dark:selection:bg-blue-600/10 
              selection:text-blue-900 dark:selection:text-blue-600 duration-700 cursor-progress'
            htmlFor="single"
          >
            <AiOutlineLoading className='animate-spin self-center mr-1.5' />
            Enviando
          </label>
        </>
      ) : (
        <>
          <label
            className='flex justify-center text-center items-center px-3 sm:px-5 py-2 rounded-lg font-medium text-black 
              border border-blue-900/30 hover:border-blue-900 bg-blue-300/50 hover:bg-blue-300 
              dark:border-transparent dark:text-white/75 dark:hover:text-white dark:hover:border-blue-600/50 
              dark:bg-black/50 dark:hover:bg-black selection:bg-blue-700/20 dark:selection:bg-blue-600/10 
              selection:text-blue-900 dark:selection:text-blue-600 duration-700 cursor-pointer'
            htmlFor="single"
          >
            Escolher imagem!
          </label>
        </>
      )}
      <input
        className='hidden'
        style={{
          position: 'absolute',
        }}
        type="file"
        id="single"
        accept="image/*"
        onChange={props.onUpload}
        disabled={props.loading || props.done}
      />
    </div>
  );
}

export default UploadButton;
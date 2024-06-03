import { useState } from 'react';
import Header from './components/Header';
import Alert from './components/Alert';
import Footer from './components/Footer';
import Search from './steps/Search';
import uploadFile from './services/upload';
import { Toaster, toast } from 'sonner';
import { type Data } from './types';
//Haciendo que nuestra UI por asi decirlo, tenga diferentes pasos
//Osea que nuestra aplicacion tiene diferentes estados que en los que se encuentre que visualmente va a cambiar
const APP_STATUS = {
  IDLE: 'idle', //estado cuando acabamos de entrar
  ERROR: 'error', //cuando hay un error
  READY_UPLOAD: 'ready_upload', //al elegir el archivo
  UPLOADING: 'uploading', //mientras se sube
  READY_USAGE: 'ready_usage', //esto es cuando ya podamos hacer las busquedas, despues de subir
} as const

const BUTTON_TEXT = {
  [APP_STATUS.READY_UPLOAD] : 'Upload File',
  [APP_STATUS.UPLOADING] : 'Uploading...'
}

type AppStatusType = typeof APP_STATUS[keyof typeof APP_STATUS]

function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<Data>([]);
  const [error, setError] = useState({error: false, msg: ''});


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? [];
    console.log(file); 
    if(file){
      setFile(file);
      setAppStatus(APP_STATUS.READY_UPLOAD);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    if(appStatus !== APP_STATUS.READY_UPLOAD || !file){
      setError({error: true, msg: 'No has subido tu archivo o no se pudo cargar correctamente, intenta de nuevo'});
      return
    }
    setAppStatus(APP_STATUS.UPLOADING);
    const [err, newData] = await uploadFile(file);
    console.log(err);
    console.log(newData);
    if(err){
      setAppStatus(APP_STATUS.ERROR);
      //Usando el toast en el error
      toast.error(err.message);
      return
    }
    
    //Ready to use
    setTimeout(() => {
      setAppStatus(APP_STATUS.READY_USAGE);
      if(newData) setData(newData);
      //Usando el toast en el success
      toast.success('File Uploaded Successfully')
      console.log(data);
    }, 3000);
  }

  //Ocultando el Button
  const showButton = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING
  //Ocultando el Input
  const showInput = appStatus !== APP_STATUS.READY_USAGE;

  return (
    <>
    <Toaster />
      <Header />
      {error.error && <Alert error={error} />}
      {showInput &&
        <form className='mt-5 text-black px-20 box-border flex flex-col justify-center items-center h-1/2 border-dashed rounded-md border-gray-600 border-2 bg-gray-100' onSubmit={handleSubmit}>
          <div className='max-w-20 mb-5'>
            <img src="./../../public/img/csvpng.png" alt="" />
          </div>
          <label className='cursor-pointer'htmlFor='csv'>
            <input className='cursor-pointer'
            disabled={appStatus === APP_STATUS.UPLOADING}
              onChange={handleInputChange}
              placeholder='Aqui we'
              type="file"
              accept='.csv'
              name="file"
              id="csv" />
              
          </label>
          {showButton && (
            <>
              <div className='flex justify-center items-center'>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-check" width="52" height="52" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                  </svg>
                </div>
                <div>
                  <p className='text-green-700'>Ready to upload</p>
                </div>

              </div>
            
              <button className='button' disabled={appStatus === APP_STATUS.UPLOADING}>{BUTTON_TEXT[appStatus]}</button>
            </>
          )}
        </form>
      }  

      {appStatus === APP_STATUS.READY_USAGE && (
        <Search initialData= {data} />
      )}   

      <Footer />
    </>
  )
}

export default App

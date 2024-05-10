import { useState } from 'react';
import './App.css'
import Alert from './components/Alert';
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
  [APP_STATUS.READY_UPLOAD] : 'Subir Archivo',
  [APP_STATUS.UPLOADING] : 'Subiendo...'
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
    setAppStatus(APP_STATUS.READY_USAGE);
    if(newData) setData(newData);
    //Usando el toast en el success
    toast.success('Archivo Subido Correctamente')
    console.log(data);
  }

  //Ocultando el Button
  const showButton = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING
  //Ocultando el Input
  const showInput = appStatus !== APP_STATUS.READY_USAGE;

  return (
    <>
    <Toaster />
      <h4>Upload CSV + Search</h4>
      {error.error && <Alert error={error} />}
      {showInput &&
        <form onSubmit={handleSubmit}>
          <label>
            <input
            disabled={appStatus === APP_STATUS.UPLOADING}
              onChange={handleInputChange}
              type="file"
              accept='.csv'
              name="file"
              id="" />
          </label>
          {showButton && (
            <button disabled={appStatus === APP_STATUS.UPLOADING}>{BUTTON_TEXT[appStatus]}</button>
          )}
        </form>
      }  

      {appStatus === APP_STATUS.READY_USAGE && (
        <Search initialData= {data} />
      )}   
    </>
  )
}

export default App

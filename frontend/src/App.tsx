import { useState } from 'react';
import './App.css'
import Alert from './components/Alert';
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
  const [error, setError] = useState({error: false, msg: ''});


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? [];
    console.log(file); 
    if(file){
      setFile(file);
      setAppStatus(APP_STATUS.READY_UPLOAD);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    if(appStatus !== APP_STATUS.READY_UPLOAD || !file){
      setError({error: true, msg: 'No has subido tu archivo o no se pudo cargar correctamente, intenta de nuevo'});
      return
    }
    setAppStatus(APP_STATUS.UPLOADING);
    console.log('TODO');
  }

  const showButton = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING

  return (
    <>
      <h4>Upload CSV + Search</h4>
      {error.error && <Alert error={error} />}
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
          <button>{BUTTON_TEXT[appStatus]}</button>
        )}
      </form>
    </>
  )
}

export default App

import { useState } from 'react';
import './App.css'
//Haciendo que nuestra UI por asi decirlo, tenga diferentes pasos
//Osea que nuestra aplicacion tiene diferentes estados que en los que se encuentre que visualmente va a cambiar
const APP_STATUS = {
  IDLE: 'idle', //estado cuando acabamos de entrar
  ERROR: 'error', //cuando hay un error
  READY_UPLOAD: 'ready_upload', //al elegir el archivo
  UPLOADING: 'uploading', //mientras se sube
  READY_USAGE: 'ready_usage', //esto es cuando ya podamos hacer las busquedas, despues de subir
} as const

type AppStatusType = typeof APP_STATUS[keyof typeof APP_STATUS]

function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [file, setFile] = useState<File | null>(null)

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
    console.log('TODO');
  }

  return (
    <>
      <h4>Upload CSV + Search</h4>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            onChange={handleInputChange}
            type="file"
            accept='.csv'
            name="file"
            id="" />
        </label>
        <button>Subir Archivo</button>
      </form>
    </>
  )
}

export default App

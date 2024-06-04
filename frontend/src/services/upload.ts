import { API_HOST } from "../config";
import { ApiUploadResponse, type Data } from "../types";
const uploadFile = async (file: File): Promise<[Error? , Data?]> => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);

    try {
        const url = `${API_HOST}/api/files`
        const res = await fetch(url, {
            method: 'POST',
            body: formData
            //NOTA IMPORTANTE: Aqui no usamos los headers para especificar el Content-Type: multipart/form-data
            //A pesar de que multer nos dice que no lo olvidemos, aqui no es necesario ya que le tendriamos que 
            //especificar el boundary de este content type, y esta muy especifico y complicado
            //entonces como dice la documentacion, al usar un FormData con FetchAPI NO DEBEMOS PONERLE EL CONTENT-TYPE
            //el navegador lo generara por nosotros, aun debo confirmar si en Axios funciona igual
        })

        if(!res.ok) return [new Error(`Error uploading file: ${res.statusText}`)]
        // const json = await res.json() as {message: string, data: Data};
        const json = await res.json() as ApiUploadResponse;
        return [undefined, json.data];
    } catch (error) {
        if(error instanceof Error) return [error]

        return [new Error('Unknown Error')];
    }

}

export default uploadFile;
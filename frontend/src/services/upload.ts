import { ApiUploadResponse, type Data } from "../types";
const uploadFile = async (file: File): Promise<[Error? , Data?]> => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);

    try {
        const url = 'http://localhost:3000/api/files'
        const res = await fetch(url, {
            method: 'POST',
            body: formData
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
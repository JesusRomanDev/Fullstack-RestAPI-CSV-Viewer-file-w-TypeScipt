import { type ApiSearchResponse, type Data } from "../types";
const searchData = async (search: string): Promise<[Error? , Data?]> => {
    try {
        const url = `http://localhost:3000/api/users?q=${search}`
        const res = await fetch(url)

        if(!res.ok) return [new Error(`Error searching data: ${res.statusText}`)]
        // const json = await res.json() as {message: string, data: Data};
        const json = await res.json() as ApiSearchResponse;
        return [undefined, json.data];
    } catch (error) {
        if(error instanceof Error) return [error]

        return [new Error('Unknown Error')];
    }

}

export default searchData;
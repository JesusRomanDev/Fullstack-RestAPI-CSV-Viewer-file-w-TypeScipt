import { type ApiSearchResponse, type Data } from "../types";
import { API_HOST } from "../config";
const searchData = async (search: string): Promise<[Error? , Data?]> => {
    try {
        const url = `${API_HOST}/api/users?q=${search}`
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
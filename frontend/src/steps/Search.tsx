import { ChangeEvent, useEffect, useState } from "react"
import { Data } from "../types"
import searchData from "../services/search";
import { toast } from "sonner";

const Search = ({initialData}: {initialData : Data}) => {
    const [data, setData] = useState<Data>(initialData);
    const [search, setSearch] = useState<string>(() => {
        const searchParams = new URLSearchParams(window.location.search)
        return searchParams.get('q') ?? ''; //con .get('q')vamos a obtener el parametro q que puede ser juan, elizabeth, etc, si no
        //retorname un string vacio
    });

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    useEffect(()=>{
        const newPathName = search === '' ? window.location.pathname : `?q=${search}`;

        window.history.pushState({}, '', newPathName);
        // if(search === ''){
        //     window.history.pushState({}, '', window.location.pathname);
        //     return;
        // }
        // window.history.pushState({}, '', `?q=${search}`);
    }, [search]);

    useEffect(()=>{
        if(!search){
            setData(initialData);
            return
        }
        //Llamar a la API para filtrar los resultados
        searchData(search)
        .then(response => {
            const [err, newData] = response;
            console.log(newData);
            if(err){
                toast.error(err?.message);
                return;
            }
            if(newData) setData(newData);
        })

    },[search, initialData])
  return (
    <div>
        <h1>Search</h1>
        <form action="">
            <input onChange={handleSearch} type="search" placeholder="Buscar Informacion..." />
        </form>
        <ul>
            {data.map((row) => (
                <li key={row.id}>
                    <article>
                        {Object.entries(row).map(([key, value]) => <p key={key}><strong>{key} {' '}</strong>{value}</p> )}
                    </article>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Search
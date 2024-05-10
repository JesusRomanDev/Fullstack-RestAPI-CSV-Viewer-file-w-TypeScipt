import { ChangeEvent, useEffect, useState } from "react"
import { Data } from "../types"
import searchData from "../services/search";
import { toast } from "sonner";

const Search = ({initialData}: {initialData : Data}) => {
    const [data, setData] = useState<Data>(initialData);
    const [search, setSearch] = useState<string>(() => {
        const searchParams = new URLSearchParams(window.location.search) //window.location.search por ejemplo si tenemos esta URL
        //https://www.youtube.com/watch?v=MmfoLqiu1A0 el location.search lo que retorna es ?v=MmfoLqiu1A0 o http://localhost:4000/?q=jesus
        return searchParams.get('q') ?? ''; //con .get('q')vamos a obtener el parametro q que puede ser juan, elizabeth, etc, por ejemplo
        // de este http://localhost:4000/?q=jesus, lo que obtendremos es jesus, ya que queremos obtener el parametro q, si no
        //retorname un string vacio

        //Entonces como resumen tendremos un nombre o lo que querramos buscar y lo tenemos se valor inicial en el search
    });

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    //Esto nos servira para escribir en la URL sin irnos a esa URL, pero si damos back nos cargara en la url ese endpoint
    //Este en conjunto con el useEffect de abajo nos da una busqueda muy dinamica y visualmente agradable de ver que estamos
    //buscando(mostrado en la URL) y mostrando los resultados de esa busqueda
    useEffect(()=>{
        const newPathName = search === '' ? window.location.pathname : `?q=${search}`;

        //Agregame en el historial el ?q=${search}
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
            <input onChange={handleSearch} type="search" placeholder="Buscar Informacion..." defaultValue={search} />
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
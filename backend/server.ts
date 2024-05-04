import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import csvToJson from 'convert-csv-to-json';
import multer from 'multer';
//Nota: vamos a instalar multer, ya que recibiremos un file y sera mas facil y aparte el csv to json
//Multer es un middleware que lo que nos permite es manejar facilmente la subida de archivos.
//En nuestro caso no usaremos el uplader, usaremos el memoryStorage
//npm i multer convert-csv-to-json

const app = express();

dotenv.config();
const port = process.env.PORT || 4000;

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

//Por el momento vamos a guardarlo en memoria
let userData: Array<Record<string, string>> = [];



app.use(cors());

app.post('api/files', upload.single('file'), async (req, res)=> {
    //1.Extract file from request
    const {file} = req;
    //2.Validate that we have file
    if(!file){
        return res.status(500).json({message: 'File is required'});
    }
    //3.Validate the mimetype(csv) //tipo de archivo que es que solo puede ser csv
    if(file.mimetype !== 'text/csv'){
        return res.status(500).json({message: 'File must be CSV'});
    }
    //4.Transform the File(Buffer) to string
    let json: Array<Record<string, string>> = [];
    try {
        //Nota: Los datos no viajan como cadenas de texto en si, viajan en dato binario, entonces para poder transformarlo
        //a un string tenemos que hacer lo de abajo.
        const rawCsv = Buffer.from(file.buffer).toString('utf-8');
        //5. Transform string (csv) to JSON osea transformando esa cadena de texto a un json
        json = csvToJson.csvStringToJson(rawCsv);
    } catch (error) {
        return res.status(500).json({message: 'Error parsing the file'})
    }
    //6.Save the JSON to db (or memory)
    userData = json; //<-----asignandolo en memoria
    //7.Return 200 with the message and JSON
    return res.send(200).json({data: userData, message: 'File uploaded successfully'})
})

app.get('api/users', async (req,res) => {
    //1.Extract the query param 'q' from the request
    const {q} = req.query;
    //2.Validate that we have the query param
    if(!q){
        return res.status(500).json({message: 'Query param "q" is required'})
    }
    //3.Filter the data from the db with the query param
    //Haciendolo insensible a mayusculas o minusculas, aqui lo abajo lo hacemos todo minusculas
    const search = q.toString().toLowerCase();

    const filteredData = userData.filter( row => {
        return Object.values(row).some(value => value.toLowerCase().includes(search));
    });
    //4.Return 200 with the filtered data
    return res.send(200).json({data: filteredData});
})

app.listen(port, () => {
    console.log(`Escuchando por el puerto ${port}`);
})
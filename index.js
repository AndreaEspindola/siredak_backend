const express = require('express');
const cors = require('cors');
//Importamos rutas
const routes = require('./routes/routes')

const config = require('./config');

//Inicializando applicacion
const app = express();



//Middleware
app.use(express.json()); //Parsear a json
app.use(cors({
    origin: '*'
})); //Configuración cors


//Usar rutas
app.use(routes);

app.listen(config.api.port, ()=>{
    console.log(`Escuchando en el puerto: ${ config.api.port }`);
});
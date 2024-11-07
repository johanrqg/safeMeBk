const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { Pool } = require('pg'); // Importa el cliente de PostgreSQL
const app = express();
const port = 3000;

// Importa las rutas de tu API
const registroRouter = require('../Backend/API/registroRouter');
const loginAPI = require('../Backend/API/loginAPi');
const registroForm = require('../Backend/API/registroForm');
// Conexión a la base de datos de PostgreSQL
const pool = new Pool({
  host: process.env.HOST_DB,
  user: 'postgres',
  password: process.env.PASSWORD_DB,
  database: 'railway',        // Cambia a tu nombre de base de datos
  port: process.env.PORT_DB,                   // Puerto por defecto de PostgreSQL
});

// Middleware para analizar el cuerpo de la solicitud
app.use(express.json());
app.use(cors());

// Usa las rutas en tu servidor y pasa la conexión a la base de datos
app.use('/', registroRouter(pool));
app.use('/', loginAPI(pool));
app.use('/', registroForm(pool))

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});


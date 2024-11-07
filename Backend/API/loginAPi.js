const express = require('express');
const router = express.Router();

module.exports = (connection) => {
  // Ruta para el inicio de sesión
  router.post('/login', (req, res) => {
    // Obtén el número de DPI y la contraseña enviados desde la aplicación móvil
    const { dpi, password } = req.body;
  
    // Realiza una consulta SQL para buscar al usuario en la base de datos por DPI y contraseña
    const selectQuery = 'SELECT * FROM usuarios WHERE dpi = $1 AND password = $2';
    const valores = [dpi, password];
  
    connection.query(selectQuery, valores, (err, result) => {
      if (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ message: 'Error en la consulta' });
      } else {
        if (result.rows.length === 0) {
          // No se encontró un usuario con ese DPI y contraseña
          res.status(404).json({ message: 'Usuario o contraseña incorrectos' });
        } else {
          // Usuario y contraseña correctos
          const usuario = result.rows[0];
          console.log('Usuario autenticado:', usuario);
          res.json({ message: 'Inicio de sesión exitoso', usuario });
        }
      }
    });
  });
  
  
  router.get('/usuarios', (req, res) => {
    const selectAllQuery = 'SELECT * FROM usuarios';

    connection.query(selectAllQuery, (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ message: 'Error en la consulta' });
      } else {
        res.json({ message: 'Usuarios obtenidos exitosamente', data: results.rows });
      }
    });
  });

  return router;
};

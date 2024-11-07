const express = require('express');
const router = express.Router();

module.exports = (connection) => {
  // Ruta para el registro de usuarios
  router.post('/registro_form', (req, res) => {
    // Obtén los datos enviados desde la aplicación móvil
    const { fecha, ubicacion, menores, informe, category } = req.body;

    // Realiza una consulta SQL para insertar el nuevo reporte en la base de datos
    const insertQuery = 'INSERT INTO reporte (fecha, ubicacion, menores, informe, reporte_type) VALUES ($1, $2, $3, $4, $5)';
    const valores = [fecha, ubicacion, menores, informe, category];

    connection.query(insertQuery, valores, (err, result) => {
      if (err) {
        console.error('Error al registrar el reporte:', err);
        res.status(500).json({ message: 'Error al registrar el reporte' });
      } else {
        console.log('Reporte registrado correctamente');
        res.json({ message: 'Registro exitoso' });
      }
    });
  });

  return router;
};

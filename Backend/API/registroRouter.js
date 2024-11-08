const express = require('express');
const router = express.Router();

module.exports = (connection) => {
  // Ruta para el registro de usuarios
  router.post('/registro', (req, res) => {
    // Obtén los datos enviados desde la aplicación móvil
    const { dpi, nombre, apellido, email, password } = req.body;

    // Realiza la validación de datos del DPI
    if (!esDPIValido(dpi)) {
      return res.status(400).json({ message: 'DPI no válido: ' + dpi });
    }

    // Consulta SQL para insertar un nuevo usuario con los datos proporcionados
    const insertQuery = 'INSERT INTO usuarios (dpi, nombre, apellido, email, "password") VALUES ($1, $2, $3, $4, $5)';
    const valores = [dpi, nombre, apellido, email, password];

    connection.query(insertQuery, valores, (err, result) => {
      if (err) {
        console.error('Error al registrar el usuario:', err);
        res.status(500).json({ message: 'Error al registrar el usuario' });
      } else {
        console.log('Usuario registrado correctamente');
        res.json({ message: 'Registro exitoso' });
      }
    });
  });

  // Función para validar el DPI
  function esDPIValido(dpi) {
    // Verifica si la longitud del DPI es igual a 13
    if (dpi.length !== 13) {
      return false;
    }

    // Si la longitud es correcta, verifica que todos los caracteres sean dígitos numéricos
    if (!/^[0-9]+$/.test(dpi)) {
      return false;
    }

    // Si ha superado ambas comprobaciones, el DPI se considera válido
    return true;
  }

  return router;
};

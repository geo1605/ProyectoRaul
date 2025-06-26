import React from 'react';
import { Card } from 'antd';

// Datos de ejemplo de un mensaje recibido
const mensajeRecibido = {
  remitente: 'Luis Martínez',
  mensaje: 'Hola, ¿te gustaría reunirte mañana?',
  fecha: '2025-06-26 12:00',
};

const Ver = () => {
  return (
    <div>
      <h2>Ver Mensaje</h2>
      <Card title={`Mensaje de ${mensajeRecibido.remitente}`}>
        <p>{mensajeRecibido.mensaje}</p>
        <small>{mensajeRecibido.fecha}</small>
      </Card>
    </div>
  );
};

export default Ver;

import React, { useState } from 'react';
import { Input, Button, Form, message as antMessage } from 'antd';
import { enviarMensaje } from '../../api/chat/chat'; // Ajusta la ruta si es necesario

interface AñadirProps {
  onMensajeEnviado: () => void; // Callback para actualizar la lista
}

const Añadir: React.FC<AñadirProps> = ({ onMensajeEnviado }) => {
  const [mensaje, setMensaje] = useState('');
  const [matricula, setMatricula] = useState('');

  const handleSubmit = async () => {
    try {
      await enviarMensaje(matricula, mensaje);
      antMessage.success("Mensaje enviado correctamente.");
      setMensaje('');
      setMatricula('');
      onMensajeEnviado(); // Actualizar mensajes en el padre
    } catch (error: any) {
      antMessage.error(error.message || "Error al enviar el mensaje.");
    }
  };

  return (
    <div>
      <h2>Enviar Mensaje</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Matrícula del Receptor"
          name="matricula"
          rules={[{ required: true, message: 'Por favor ingresa una matrícula' }]}
        >
          <Input
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            placeholder="Matrícula del receptor"
          />
        </Form.Item>

        <Form.Item
          label="Mensaje"
          name="mensaje"
          rules={[{ required: true, message: 'Por favor ingresa un mensaje' }]}
        >
          <Input.TextArea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={4}
            placeholder="Escribe tu mensaje aquí"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Enviar Mensaje
        </Button>
      </Form>
    </div>
  );
};

export default Añadir;

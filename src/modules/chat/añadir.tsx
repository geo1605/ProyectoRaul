import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';

const Añadir = () => {
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = () => {
    console.log('Mensaje enviado:', mensaje);
    setMensaje(''); 
  };

  return (
    <div>
      <h2>Enviar Mensaje</h2>
      <Form onFinish={handleSubmit}>
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

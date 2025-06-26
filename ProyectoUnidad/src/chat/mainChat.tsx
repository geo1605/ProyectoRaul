import React, { useState } from 'react';
import { Table, Button, Modal, Input, Form } from 'antd';

// Datos de ejemplo del historial
const historialData = [
  {
    key: '1',
    remitente: 'Juan Pérez',
    mensaje: 'Hola, ¿cómo estás?',
    fecha: '2025-06-26 10:00',
  },
  {
    key: '2',
    remitente: 'Ana García',
    mensaje: '¿Vamos a la reunión a las 3?',
    fecha: '2025-06-26 11:30',
  },
  {
    key: '3',
    remitente: 'Luis Martínez',
    mensaje: 'Estoy esperando tu confirmación.',
    fecha: '2025-06-25 09:45',
  },
];

const MainChat = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [matricula, setMatricula] = useState('');

  // Función para mostrar el modal con los detalles completos del mensaje
  const showFullMessage = (record) => {
    setModalMessage(record);
    setIsModalVisible(true);
  };

  // Función para manejar el cierre del modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setModalMessage(null);
  };

  // Función para abrir el modal de añadir mensaje
  const showAddMessageModal = () => {
    setIsAddModalVisible(true);
  };

  // Función para cerrar el modal de añadir mensaje
  const handleAddCancel = () => {
    setIsAddModalVisible(false);
    setMensaje('');
    setMatricula('');
  };

  // Función para manejar el envío del mensaje
  const handleSendMessage = () => {
    console.log('Mensaje enviado:', mensaje);
    console.log('Matrícula:', matricula);
    setIsAddModalVisible(false);
    setMensaje('');
    setMatricula('');
  };

  const columns = [
    {
      title: 'Remitente',
      dataIndex: 'remitente',
      key: 'remitente',
      responsive: ['md'], // Only show on medium screens and larger
    },
    {
      title: 'Mensaje',
      dataIndex: 'mensaje',
      key: 'mensaje',
      ellipsis: true, // Add ellipsis for truncated text
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      responsive: ['lg'], // Only show on large screens and larger
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Button type="link" onClick={() => showFullMessage(record)}>
          Ver Completo
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Historial de Mensajes</h2>

      {/* Botón para abrir el modal de añadir mensaje */}
      <div style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={showAddMessageModal}>
          Añadir Mensaje
        </Button>
      </div>

      <Table 
        dataSource={historialData} 
        columns={columns} 
        scroll={{ x: true }} // Enable horizontal scrolling on small screens
        style={{ width: '100%' }}
      />

      {/* Modal para enviar un mensaje */}
      <Modal
        title="Enviar Mensaje"
        open={isAddModalVisible}
        onCancel={handleAddCancel}
        footer={null}
        width={800}
        styles={{
          body: { padding: '20px' },
        }}
      >
        <Form onFinish={handleSendMessage}>
          <Form.Item
            label="Matrícula"
            name="matricula"
            rules={[{ required: true, message: 'Por favor ingresa una matrícula' }]}
          >
            <Input
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              placeholder="Escribe la Matrícula"
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

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Enviar Mensaje
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para mostrar el mensaje completo */}
      <Modal
        title="Mensaje Completo"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        styles={{
          body: { padding: '20px' },
        }}
      >
        {modalMessage && (
          <div>
            <p><strong>Remitente:</strong> {modalMessage.remitente}</p>
            <p><strong>Mensaje:</strong> {modalMessage.mensaje}</p>
            <p><strong>Fecha:</strong> {modalMessage.fecha}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MainChat;
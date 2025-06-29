import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message as antMessage } from 'antd';
import { enviarMensaje, obtenerMisMensajes } from '../../api/chat/chat';

const MainChat = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [matricula, setMatricula] = useState('');
  const [historialData, setHistorialData] = useState([]);

  // Función reutilizable para obtener mensajes
  const fetchMensajes = async () => {
    try {
      const data = await obtenerMisMensajes();
      const mapped = data.map((msg, i) => ({
        key: i,
        remitente: msg.emisor,
        mensaje: msg.mensaje,
        fecha: new Date(msg.createdAt || Date.now()).toLocaleString()
      }));
      setHistorialData(mapped);
    } catch (error: any) {
      antMessage.error(error.message || "No se pudieron cargar los mensajes.");
    }
  };

  useEffect(() => {
    fetchMensajes();
  }, []);

  const showFullMessage = (record) => {
    setModalMessage(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalMessage(null);
  };

  const showAddMessageModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
    setMensaje('');
    setMatricula('');
  };

  const handleSendMessage = async () => {
    try {
      const data = await enviarMensaje(matricula, mensaje);
      antMessage.success(data.message || "Mensaje enviado.");
      setMensaje('');
      setMatricula('');
      setIsAddModalVisible(false);
      fetchMensajes(); // 🔄 Refrescar historial al enviar mensaje
    } catch (error: any) {
      antMessage.error(error.message || "Error al enviar mensaje.");
    }
  };

  const columns = [
    {
      title: 'Remitente',
      dataIndex: 'remitente',
      key: 'remitente',
      responsive: ['md']
    },
    {
      title: 'Mensaje',
      dataIndex: 'mensaje',
      key: 'mensaje',
      ellipsis: true
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      responsive: ['lg']
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Button type="link" onClick={() => showFullMessage(record)}>
          Ver Completo
        </Button>
      )
    }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Historial de Mensajes</h2>

      <div style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={showAddMessageModal}>
          Añadir Mensaje
        </Button>
      </div>

      <Table
        dataSource={historialData}
        columns={columns}
        scroll={{ x: true }}
        style={{ width: '100%' }}
      />

      {/* Modal para Enviar Mensaje */}
      <Modal
        title="Enviar Mensaje"
        open={isAddModalVisible}
        onCancel={handleAddCancel}
        footer={null}
        width={800}
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

      {/* Modal para Ver Detalles del Mensaje */}
      <Modal
        title="Mensaje Completo"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
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

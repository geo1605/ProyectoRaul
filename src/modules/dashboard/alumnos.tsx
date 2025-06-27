import React, { useState } from 'react';
import { Table, Input, Button, Space, Modal, Form, Tag } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Alumnos = () => {
  // Estado para los datos y filtrado
  const [alumnosData, setAlumnosData] = useState([
    {
      key: '1',
      matricula: 'A12345',
      nombre: 'Juan',
      apellidos: 'Pérez López',
      correo: 'juan.perez@example.com',
      estado: 'activo',
    },
    {
      key: '2',
      matricula: 'B67890',
      nombre: 'Ana',
      apellidos: 'García Sánchez',
      correo: 'ana.garcia@example.com',
      estado: 'activo',
    },
    {
      key: '3',
      matricula: 'C11223',
      nombre: 'Luis',
      apellidos: 'Martínez Díaz',
      correo: 'luis.martinez@example.com',
      estado: 'inactivo',
    },
    {
      key: '4',
      matricula: 'D44556',
      nombre: 'María',
      apellidos: 'Rodríguez Pérez',
      correo: 'maria.rodriguez@example.com',
      estado: 'activo',
    },
  ]);

  // Estados para los modales y formularios
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAlumno, setCurrentAlumno] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  // Columnas de la tabla con responsividad
  const columns = [
    {
      title: 'Matrícula',
      dataIndex: 'matricula',
      key: 'matricula',
      responsive: ['xs'], // Visible en todos los tamaños
      sorter: (a, b) => a.matricula.localeCompare(b.matricula),
    },
    {
      title: 'Nombre Completo',
      key: 'nombreCompleto',
      responsive: ['sm'], // Visible en pantallas pequeñas y mayores
      render: (_, record) => `${record.nombre} ${record.apellidos}`,
      sorter: (a, b) => `${a.nombre} ${a.apellidos}`.localeCompare(`${b.nombre} ${b.apellidos}`),
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      responsive: ['md'], // Visible en pantallas medianas y mayores
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos',
      responsive: ['md'], // Visible en pantallas medianas y mayores
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo',
      responsive: ['lg'], // Visible en pantallas grandes y mayores
      render: (correo) => <a href={`mailto:${correo}`}>{correo}</a>,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      responsive: ['sm'],
      render: (estado) => (
        <Tag color={estado === 'activo' ? 'green' : 'red'}>
          {estado.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Activo', value: 'activo' },
        { text: 'Inactivo', value: 'inactivo' },
      ],
      onFilter: (value, record) => record.estado === value,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            aria-label="Editar"
          />
          <Button 
            type="link" 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.key)}
            danger
            aria-label="Eliminar"
          />
        </Space>
      ),
    },
  ];

  // Funciones CRUD
  const handleAdd = () => {
    setCurrentAlumno(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (alumno) => {
    setCurrentAlumno(alumno);
    form.setFieldsValue(alumno);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: 'Confirmar eliminación',
      content: '¿Estás seguro de que deseas eliminar este alumno?',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: () => {
        setAlumnosData(alumnosData.filter(item => item.key !== key));
      },
    });
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (currentAlumno) {
        // Editar alumno existente
        setAlumnosData(alumnosData.map(alumno => 
          alumno.key === currentAlumno.key ? { ...values, key: currentAlumno.key } : alumno
        ));
      } else {
        // Añadir nuevo alumno
        setAlumnosData([...alumnosData, { ...values, key: Date.now().toString() }]);
      }
      setIsModalVisible(false);
    });
  };

  // Filtrado de datos
  const filteredData = alumnosData.filter(alumno =>
    Object.values(alumno).some(
      val => val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '16px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <h2 style={{ margin: 0 }}>Lista de Alumnos</h2>
        <Space>
          <Input
            placeholder="Buscar alumnos..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 200 }}
            allowClear
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAdd}
          >
            Nuevo Alumno
          </Button>
        </Space>
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        bordered
        size="middle"
        scroll={{ x: true }}
        pagination={{ 
          pageSizeOptions: ['5', '10', '20', '50'],
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} alumnos`,
        }}
        rowClassName={(record) => record.estado === 'inactivo' ? 'row-inactive' : ''}
      />

      {/* Modal para agregar/editar alumnos */}
      <Modal
        title={currentAlumno ? 'Editar Alumno' : 'Nuevo Alumno'}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText={currentAlumno ? 'Actualizar' : 'Guardar'}
        cancelText="Cancelar"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="matricula"
            label="Matrícula"
            rules={[{ required: true, message: 'Por favor ingresa la matrícula' }]}
          >
            <Input placeholder="Ej: A12345" />
          </Form.Item>
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
          >
            <Input placeholder="Ej: Juan" />
          </Form.Item>
          <Form.Item
            name="apellidos"
            label="Apellidos"
            rules={[{ required: true, message: 'Por favor ingresa los apellidos' }]}
          >
            <Input placeholder="Ej: Pérez López" />
          </Form.Item>
          <Form.Item
            name="correo"
            label="Correo Electrónico"
            rules={[
              { required: true, message: 'Por favor ingresa el correo' },
              { type: 'email', message: 'Ingresa un correo válido' },
            ]}
          >
            <Input placeholder="Ej: usuario@dominio.com" />
          </Form.Item>
          <Form.Item
            name="estado"
            label="Estado"
            initialValue="activo"
          >
            <Input placeholder="Ej: activo/inactivo" />
          </Form.Item>
        </Form>
      </Modal>

      <style jsx global>{`
        .row-inactive {
          background-color: #fff2f0;
        }
        .ant-table-thead > tr > th {
          white-space: nowrap;
        }
        @media (max-width: 768px) {
          .ant-table-cell {
            padding: 8px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Alumnos;
import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Space, Modal, Form, Tag } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { getAllUsers } from '../../api/auth/login'; // Ajusta la ruta si es necesario

const Alumnos = () => {
  const [alumnosData, setAlumnosData] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  // Cargar alumnos desde la API
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const users = await getAllUsers();
        const mapped = users.map((user: any) => ({
          key: user._id,
          matricula: user.matricula.toString(),
          nombre: user.names,
          apellidos: `${user.middleName} ${user.lastName}`,
          correo: user.email,
          estado: user.status ? 'activo' : 'inactivo',
        }));
        setAlumnosData(mapped);
      } catch (error) {
        console.error('Error al cargar alumnos:', error);
      }
    };

    fetchAlumnos();
  }, []);

  const columns = [
    {
      title: 'Matrícula',
      dataIndex: 'matricula',
      key: 'matricula',
      sorter: (a, b) => a.matricula.localeCompare(b.matricula),
    },
    {
      title: 'Nombre Completo',
      key: 'nombreCompleto',
      render: (_, record) => `${record.nombre} ${record.apellidos}`,
      sorter: (a, b) => `${a.nombre} ${a.apellidos}`.localeCompare(`${b.nombre} ${b.apellidos}`),
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo',
      render: (correo) => <a href={`mailto:${correo}`}>{correo}</a>,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
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
  ];

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

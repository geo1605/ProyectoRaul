/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Input, Space, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getAllUsers } from '../../api/auth/login';

const Alumnos = () => {
  const [alumnosData, setAlumnosData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

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
      } catch (error: any) {
        console.error('Error al cargar alumnos:', error);
        if (error.response?.status === 500) {
          navigate('/server-error');
        }
      }
    };

    fetchAlumnos();
  }, [navigate]);

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
    <div style={{ 
      minHeight: '100vh',
      width: '100vw',
      background: '#fff',
      padding: '16px',
      boxSizing: 'border-box',
      position: 'absolute',
      top: '64px', // Adjust this value based on your menu height
      left: 0,
      overflow: 'auto'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex', 
        flexDirection: 'column',
        minHeight: 'calc(100vh - 64px)' // Adjust to account for menu height
      }}>
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
          style={{ flex: 1 }}
        />
      </div>

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

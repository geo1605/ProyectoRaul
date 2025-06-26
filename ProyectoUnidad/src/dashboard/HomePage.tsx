import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';  // Importamos Outlet para mostrar las rutas hijas

const { Header, Content } = Layout;

function HomePage() {
  // Definir los items del menú como un array
  const menuItems = [
    {
      key: '1',
      label: <Link to="/alumnos">Alumnos</Link>,  // Enlace a la página de Alumnos
    },
    {
      key: '2',
      label: <Link to="/chat">Chat</Link>,  // Enlace a la página de Chat
    },
  ];

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        {/* Usamos items en lugar de children para el menú */}
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={menuItems} />
      </Header>
      <Content style={{ padding: '0 50px', marginTop: '64px' }}>
        <div className="site-layout-content">
          {/* Aquí se renderizarán las rutas anidadas */}
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}

export default HomePage;

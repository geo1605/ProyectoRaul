import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context'; // Ajusta la ruta según tu estructura

const { Header, Content } = Layout;

function HomePage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      key: '1',
      label: <Link to="/alumnos">Alumnos</Link>,
    },
    {
      key: '2',
      label: <Link to="/chat">Chat</Link>,
    },
  ];

  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={menuItems}
            style={{ lineHeight: '64px' }}
          />
        </div>

        <div>
          {user && (
            <span style={{ color: 'white', marginRight: '10px' }}>
              {user.names} {user.lastName}
            </span>
          )}
          <Button onClick={handleLogout} type="primary" danger>
            Cerrar sesión
          </Button>
        </div>
      </Header>

      <Content style={{ padding: '0 50px', marginTop: '64px' , minHeight: "79vh"}}>
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}

export default HomePage;
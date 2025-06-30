import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ServerError: React.FC = () => (
  <div
    style={{
      height: '100vh',
      width: '100vw',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      background: 'linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(174, 82, 82) 100%)',
      animation: 'fadeIn 1s ease-in-out',
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
    <Space
      direction="vertical"
      size="large"
      style={{ animation: 'floatContent 3s infinite ease-in-out', position: 'relative', zIndex: 1 }}
    >
      <Title
        level={1}
        style={{
          fontSize: '4rem',
          color: '#e74c3c',
          marginBottom: 0,
          animation: 'pulse 1.5s infinite ease-in-out, bounceIn 0.8s ease-in-out',
        }}
      >
        500
      </Title>
      <Title level={3} style={{ margin: 0, color: '#444', animation: 'fadeInText 1s ease-in-out' }}>
        Error Interno del Servidor
      </Title>
      <Paragraph style={{ fontSize: '1.125rem', color: '#666', maxWidth: '90%', animation: 'fadeInText 1.5s ease-in-out' }}>
        Algo salió mal en nuestro servidor. Por favor, intenta más tarde.
      </Paragraph>
      <Link to="/alumnos">
        <Button
          type="primary"
          icon={<HomeOutlined />}
          size="large"
          style={{
            borderRadius: '6px',
            padding: '0.625rem 1.25rem',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            fontSize: '1.125rem',
            height: 'auto',
            transition: 'all 0.3s',
            animation: 'fadeInButton 2s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(26, 115, 232, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Volver al inicio
        </Button>
      </Link>
    </Space>

    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      @keyframes fadeInText {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeInButton {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes floatContent {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
      }
      @keyframes moveParticles {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50vw, 50vh); }
      }
      div:nth-child(1)::before,
      div:nth-child(1)::after {
        content: '';
        position: 'absolute';
        width: 0.625rem;
        height: 0.625rem;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        animation: moveParticles 15s linear infinite;
      }
      div:nth-child(1)::before {
        top: 20%;
        left: 10%;
        animation-delay: 0s;
      }
      div:nth-child(1)::after {
        top: 70%;
        left: 80%;
        animation-delay: 5s;
      }
      div:nth-child(1)::before,
      div:nth-child(1)::after {
        box-shadow:
          30vw -20vh 0 rgba(255, 255, 255, 0.3),
          -10vw 40vh 0 rgba(255, 255, 255, 0.4),
          50vw 10vh 0 rgba(255, 255, 255, 0.2);
      }
      @media (max-width: 1024px) {
        h1 { font-size: 3rem !important; }
        p { fontSize: 1rem !important; }
        .ant-btn { font-size: 1rem !important; padding: 0.5rem 1rem; }
      }
      @media (max-width: 768px) {
        h1 { font-size: 2.5rem !important; }
        p { font-size: 0.875rem !important; }
        .ant-btn { font-size: 0.875rem !important; padding: 0.5rem 1rem; }
      }
      @media (max-width: 480px) {
        h1 { font-size: 2rem !important; }
        p { font-size: 0.75rem !important; }
        .ant-btn { font-size: 0.75rem !important; padding: 0.375rem 0.75rem; }
      }
    `}</style>
  </div>
);

export default ServerError;
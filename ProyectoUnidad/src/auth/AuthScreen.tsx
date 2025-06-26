import React, { useState } from 'react';
import { Tabs, Input, Button, Form, message, Divider } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
// Importamos ReCAPTCHA y GoogleLogin, pero lo comentamos por ahora
// import ReCAPTCHA from 'react-google-recaptcha';
// import { GoogleLogin } from '@react-oauth/google';

function AuthScreen() {
  const [selectedTab, setSelectedTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = (values) => {
    setIsLoading(true);
    console.log('Iniciar sesión con:', values);
    
    // Simulación de llamada API
    setTimeout(() => {
      setIsLoading(false);
      message.success('Inicio de sesión exitoso!');
    }, 1500);
  };

  const handleRegister = (values) => {
    setIsLoading(true);
    console.log('Registrar con:', values);
    
    // Simulación de llamada API
    setTimeout(() => {
      setIsLoading(false);
      message.success('Usuario registrado con éxito!');
      setSelectedTab('login');
    }, 1500);
  };

  const handleGoogleLogin = (response) => {
    setIsLoading(true);
    console.log('Google login response:', response);
    
    // Simulación de llamada API
    setTimeout(() => {
      setIsLoading(false);
      message.success('Inicio de sesión con Google exitoso!');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {selectedTab === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
          </h1>
          <p className="text-gray-600">
            {selectedTab === 'login' 
              ? 'Inicia sesión para continuar' 
              : 'Regístrate para comenzar'}
          </p>
        </div>

        <Tabs 
          activeKey={selectedTab} 
          onChange={(key) => setSelectedTab(key)} 
          centered
          className="mb-6"
        >
          <Tabs.TabPane tab="Iniciar Sesión" key="login">
            <Form form={form} onFinish={handleLogin} layout="vertical">
              <Form.Item 
                name="email"
                label="Correo Electrónico"
                rules={[{ required: true, message: 'Por favor ingresa tu correo' }, { type: 'email', message: 'Correo no válido' }]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="tucorreo@ejemplo.com"
                  size="large"
                />
              </Form.Item>
              
              <Form.Item 
                name="password"
                label="Contraseña"
                rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
              >
                <Input.Password
                  prefix={<EyeOutlined />}
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  placeholder="••••••••"
                  size="large"
                />
              </Form.Item>
              
              {/* Comentar ReCAPTCHA */}
              {/* <div className="mb-6 flex justify-center">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Clave de prueba
                  onChange={() => {}}
                />
              </div> */}
              
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                size="large"
                loading={isLoading}
              >
                Iniciar Sesión
              </Button>
              
              <Divider>o</Divider>
              
              {/* Comentar GoogleLogin */}
              {/* <div className="flex justify-center mb-4">
                <GoogleLogin 
                  onSuccess={handleGoogleLogin}
                  onError={() => message.error('Error al iniciar con Google')}
                  shape="pill"
                  size="large"
                  text={selectedTab === 'login' ? 'signin_with' : 'signup_with'}
                />
              </div> */}
              
              <div className="text-center">
              </div>
            </Form>
          </Tabs.TabPane>
          
          <Tabs.TabPane tab="Registrarse" key="register">
            <Form form={form} onFinish={handleRegister} layout="vertical">
              <Form.Item 
                name="name"
                label="Nombre Completo"
                rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Tu nombre completo"
                  size="large"
                />
              </Form.Item>
              
              <Form.Item 
                name="email"
                label="Correo Electrónico"
                rules={[{ required: true, message: 'Por favor ingresa tu correo' }, { type: 'email', message: 'Correo no válido' }]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="tucorreo@ejemplo.com"
                  size="large"
                />
              </Form.Item>
              
              <Form.Item 
                name="password"
                label="Contraseña"
                rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }, { min: 6, message: 'Mínimo 6 caracteres' }]}
              >
                <Input.Password
                  prefix={<EyeOutlined />}
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  placeholder="••••••••"
                  size="large"
                />
              </Form.Item>
              
              <Form.Item 
                name="confirmPassword"
                label="Confirmar Contraseña"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Por favor confirma tu contraseña' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Las contraseñas no coinciden');
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<EyeOutlined />}
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  placeholder="••••••••"
                  size="large"
                />
              </Form.Item>
              
              {/* Comentar ReCAPTCHA */}
              {/* <div className="mb-6 flex justify-center">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Clave de prueba
                  onChange={() => {}}
                />
              </div> */}
              
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                size="large"
                loading={isLoading}
              >
                Registrarse
              </Button>
              
              <Divider>o</Divider>
              
              {/* Comentar GoogleLogin */}
              {/* <div className="flex justify-center mb-4">
                <GoogleLogin 
                  onSuccess={handleGoogleLogin}
                  onError={() => message.error('Error al registrar con Google')}
                  shape="pill"
                  size="large"
                  text="signup_with"
                />
              </div> */}
              
              <div className="text-center">

              </div>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthScreen;

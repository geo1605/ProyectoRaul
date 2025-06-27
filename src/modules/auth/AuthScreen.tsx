import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Añade estos imports
import { Form, Input, Button, message, Tabs, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import { loginUser, registerUser } from '../../api/auth/login';
import { useAuth } from '../../contexts/auth.context';
import './AuthScreen.css';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface LoginValues {
  matricula: string;
  password: string;
}

interface RegisterValues {
  names: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  matricula: string;
}

const AuthScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const { login, isAuthenticated } = useAuth(); // Añade isAuthenticated
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from?.pathname || '/', { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const onLogin = async (values: LoginValues) => {
    setIsLoading(true);
    try {
      const { token, user } = await loginUser(values.matricula, values.password);
      login({ token, user });
      message.success('¡Bienvenido! Sesión iniciada correctamente');
      
      // Redirige a la ruta previa o a la página principal
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (error: any) {
      message.error(error.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (values: RegisterValues) => {
    setIsLoading(true);
    try {
      await registerUser(values);
      message.success('¡Registro exitoso! Por favor inicia sesión');
      setActiveTab('login');
    } catch (error: any) {
      message.error(error.message || 'Error al registrar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Title level={3} className="auth-title">
            {activeTab === 'login' ? 'Inicio de Sesión' : 'Registro de Usuario'}
          </Title>
          <Text type="secondary">
            {activeTab === 'login' 
              ? 'Ingresa tus credenciales para continuar' 
              : 'Completa el formulario para registrarte'}
          </Text>
        </div>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          centered
          className="auth-tabs"
        >
          <TabPane tab="Iniciar Sesión" key="login">
            <Form<LoginValues>
              name="login"
              initialValues={{ remember: true }}
              onFinish={onLogin}
              layout="vertical"
            >
              <Form.Item
                name="matricula"
                label="Matrícula"
                rules={[
                  { required: true, message: 'Por favor ingresa tu matrícula' },
                  { pattern: /^[A-Za-z0-9]+$/, message: 'Matrícula no válida' }
                ]}
              >
                <Input
                  prefix={<IdcardOutlined />}
                  placeholder="Ej. ABC12345"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                  { required: true, message: 'Por favor ingresa tu contraseña' },
                  { min: 6, message: 'Mínimo 6 caracteres' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="••••••••"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={isLoading}
                  className="auth-button"
                >
                  Iniciar Sesión
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Registrarse" key="register">
            <Form<RegisterValues>
              name="register"
              onFinish={onRegister}
              layout="vertical"
              scrollToFirstError
            >
              <Form.Item
                name="names"
                label="Nombres"
                rules={[
                  { required: true, message: 'Por favor ingresa tus nombres' },
                  { min: 2, message: 'Mínimo 2 caracteres' }
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Ej. Juan Carlos"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="middleName"
                label="Apellido Paterno"
                rules={[
                  { required: true, message: 'Por favor ingresa tu apellido paterno' },
                  { min: 2, message: 'Mínimo 2 caracteres' }
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Ej. Pérez"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Apellido Materno"
                rules={[
                  { required: true, message: 'Por favor ingresa tu apellido materno' },
                  { min: 2, message: 'Mínimo 2 caracteres' }
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Ej. López"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Correo Electrónico"
                rules={[
                  { required: true, message: 'Por favor ingresa tu correo' },
                  { type: 'email', message: 'Correo no válido' },
                  { pattern: /@utd\.edu\.mx$/, message: 'Debe ser correo @utd.edu.mx' }
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="ejemplo@utd.edu.mx"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="matricula"
                label="Matrícula"
                rules={[
                  { required: true, message: 'Por favor ingresa tu matrícula' },
                  { pattern: /^[A-Za-z0-9]{10}$/, message: 'La matrícula debe tener 10 caracteres' }
                ]}
              >
                <Input
                  prefix={<IdcardOutlined />}
                  placeholder="10 caracteres"
                  size="large"
                  maxLength={10}
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                  { required: true, message: 'Por favor ingresa una contraseña' },
                  { min: 8, message: 'Mínimo 8 caracteres' }
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="••••••••"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirmar Contraseña"
                dependencies={['password']}
                hasFeedback
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
                  prefix={<LockOutlined />}
                  placeholder="••••••••"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={isLoading}
                  className="auth-button"
                >
                  Registrarse
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthScreen;
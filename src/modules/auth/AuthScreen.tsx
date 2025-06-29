import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, message, Tabs, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import { loginUser, registerUser } from '../../api/auth/login';
import { useAuth } from '../../contexts/auth.context';
import './AuthScreen.css';
import { loginWithGoogle } from '../../api/auth/authGoogle.api';
import { useGoogleLogin } from '@react-oauth/google';
import ReCAPTCHA from 'react-google-recaptcha';
import Swal from 'sweetalert2';


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
  const { login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from?.pathname || '/', { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const onLogin = async (values: LoginValues) => {
    if (!captchaValue) {
      Swal.fire({
        icon: 'warning',
        title: '¡Atención!',
        text: 'Por favor completa el reCAPTCHA para iniciar sesión',
        confirmButtonColor: '#1677ff'
      });
      return;
    }

    setIsLoading(true);
    try {
      const { token, user } = await loginUser(values.matricula, values.password, captchaValue);
      login({ token, user });
      message.success('¡Bienvenido! Sesión iniciada correctamente');

      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: error.message || 'Hubo un problema al iniciar sesión. Verifica tus credenciales.',
        confirmButtonColor: '#1677ff'
      });
      }
  
    };
  
    const onRegister = async (values: RegisterValues) => {
      setIsLoading(true);
      try {
        await registerUser(values);
        message.success('¡Registro exitoso! Por favor inicia sesión');
        setActiveTab('login');
      } catch (error: any) {
        message.error(error.response?.data?.message || 'Error al registrar usuario');
      } finally {
        setIsLoading(false);
      }
    };
  
    const loginGoogle = useGoogleLogin({
      flow: 'implicit',
      scope: 'openid email profile',
      onSuccess: async (tokenResponse) => {
        try {
          const tokenToSend = tokenResponse.access_token;
          if (!tokenToSend) throw new Error("No se recibió token válido");
  
          const res = await loginWithGoogle(tokenToSend);
          login({ token: res.token, user: res.user });
  
          navigate('/', { replace: true });
  
        } catch (error: any) {
          const msg = error?.response?.data?.message || error?.response?.data?.error || error?.message;
  
          console.error("Mensaje de error:", msg);
  
          if (msg?.toLowerCase().includes('utd') || msg?.toLowerCase().includes('correo')) {
            Swal.fire({
              icon: 'error',
              title: 'Acceso Denegado',
              text: 'El acceso con Google solo está permitido para correos del alumnado de la UTD.',
              confirmButtonColor: '#1677ff'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error con Google',
              text: 'No se pudo iniciar sesión con Google. Intenta nuevamente.',
              confirmButtonColor: '#1677ff'
            });
          }
        }
      },
      onError: (error: unknown) => {
        console.error("Error de Google:", error);
        message.error("Error al autenticar con Google");
      },
    });


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

          <Tabs activeKey={activeTab} onChange={setActiveTab} centered className="auth-tabs">
            {/* Login Tab */}
            <TabPane tab="Iniciar Sesión" key="login">
              <Form<LoginValues> name="login" onFinish={onLogin} layout="vertical">
                <Form.Item
                  name="matricula"
                  label="Matrícula"
                  rules={[
                    { required: true, message: 'Por favor ingresa tu matrícula' },
                    { pattern: /^[A-Za-z0-9]+$/, message: 'Matrícula no válida' }
                  ]}
                >
                  <Input prefix={<IdcardOutlined />} placeholder="Ej. ABC12345" size="large" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Contraseña"
                  rules={[
                    { required: true, message: 'Por favor ingresa tu contraseña' },
                    { min: 6, message: 'Mínimo 6 caracteres' }
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
                </Form.Item>


                <Form.Item>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ReCAPTCHA
                      sitekey="6LdQKG8rAAAAAE6v21HvH7OBvwjr_NH9AzWT4SdY"
                      onChange={(value) => {
                        console.log("Captcha value:", value);
                        setCaptchaValue(value);
                      }} />
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={isLoading}
                    style={{
                      backgroundColor: '#1677ff',
                      borderColor: '#1677ff',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    block
                    size="large"
                    icon={
                      <img
                        src="https://img.icons8.com/color/48/google-logo.png"
                        alt="Google"
                        style={{ width: 20, height: 20, marginRight: 8 }}
                      />
                    }
                    onClick={() => loginGoogle()}
                    style={{
                      backgroundColor: '#ffffff',
                      borderColor: '#d9d9d9',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#555',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    Continuar con Google
                  </Button>
                </Form.Item>

              </Form>
            </TabPane>

            {/* Registro Tab */}
            <TabPane tab="Registrarse" key="register">
              <Form<RegisterValues> name="register" onFinish={onRegister} layout="vertical">
                <Form.Item
                  name="names"
                  label="Nombres"
                  rules={[
                    { required: true, message: 'Por favor ingresa tus nombres' },
                    { min: 2, message: 'Mínimo 2 caracteres' }
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Ej. Juan Carlos" size="large" />
                </Form.Item>

                <Form.Item
                  name="middleName"
                  label="Apellido Paterno"
                  rules={[
                    { required: true, message: 'Por favor ingresa tu apellido paterno' },
                    { min: 2, message: 'Mínimo 2 caracteres' }
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Ej. Pérez" size="large" />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Apellido Materno"
                  rules={[
                    { required: true, message: 'Por favor ingresa tu apellido materno' },
                    { min: 2, message: 'Mínimo 2 caracteres' }
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Ej. López" size="large" />
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
                  <Input prefix={<MailOutlined />} placeholder="ejemplo@utd.edu.mx" size="large" />
                </Form.Item>

                <Form.Item
                  name="matricula"
                  label="Matrícula"
                  rules={[
                    { required: true, message: 'Por favor ingresa tu matrícula' },
                    { pattern: /^[A-Za-z0-9]{10}$/, message: 'La matrícula debe tener 10 caracteres' }
                  ]}
                >
                  <Input prefix={<IdcardOutlined />} placeholder="10 caracteres" size="large" />
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
                  <Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
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
                  <Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block size="large" loading={isLoading}>
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

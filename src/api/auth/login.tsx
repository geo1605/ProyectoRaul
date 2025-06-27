// api/auth/index.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface LoginResponse {
  token: string;
  user: {
    matricula: string;
    names: string;
    lastName: string;
    email: string;
  };
}

export interface RegisterResponse {
  message: string;
  user: any;
  accessToken: string;
}

export interface RegisterData {
  email: string;
  password: string;
  matricula: string;
  confirmPassword: string;
  names: string;
  middleName: string;
  lastName: string;
  status: string;
}

export const loginUser = async (matricula: string, password: string, captcha: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, { 
    matricula, 
    password, 
    captcha });
  return response.data;
};

export const registerUser = async (userData: RegisterData): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(`${API_URL}/createUser`, userData);
  return response.data;
};
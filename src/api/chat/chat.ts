// src/api/chatApi.ts
const API_URL = import.meta.env.VITE_API_URL;

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export const enviarMensaje = async (receptor: string, mensaje: string) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/chatmsj`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ receptor, mensaje }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new ApiError(data.message || 'Error al enviar el mensaje', res.status);
  }
  return data;
};

export const obtenerMisMensajes = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/chat/misMensajes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Error al obtener los mensajes');
  }
  return data;
};

import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Backend URL'yi buraya gir

export const sendMessage = async (
  phoneNumbers: string[],
  message: string,
  schedule: string,
  isActive: boolean
) => {
  const response = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phoneNumbers,
      message,
      schedule,
      isActive,
    }),
  });

  if (!response.ok) {
    throw new Error("Mesaj gönderilemedi");
  }

  return response.json();
};

export const getMessages = async () => {
  const response = await fetch(`${API_URL}/messages`);
  
  if (!response.ok) {
    throw new Error("Mesajlar alınamadı");
  }

  return response.json();
};

export const updateMessageStatus = async (messageId: string, isActive: boolean) => {
  const response = await fetch(`${API_URL}/messages/${messageId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    throw new Error("Mesaj durumu güncellenemedi");
  }

  return response.json();
};

export const getQR = async () => {
  return axios.get(`${API_URL}/qr`);
};

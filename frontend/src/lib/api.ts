import axios from "axios";
import { z } from "zod";
import { formSchema } from "./schemas";

const API_URL = import.meta.env.BE_URL;

export const sendMessage = async (values: z.infer<typeof formSchema>) => {
  const response = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
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

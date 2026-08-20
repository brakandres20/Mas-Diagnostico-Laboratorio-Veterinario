import axios from 'axios';
import { API_URL } from '../config';

const client = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

/**
 * Registra una solicitud (convenio, cotización, recolección o contacto).
 * El backend genera el enlace de WhatsApp con el detalle y, si la WhatsApp
 * Cloud API está configurada, envía el mensaje al laboratorio automáticamente.
 */
export async function createQuote(payload) {
  const { data } = await client.post('/quotes', payload);
  return data;
}

export default client;
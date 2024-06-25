
import axios from 'axios';

const xhr = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export default xhr;
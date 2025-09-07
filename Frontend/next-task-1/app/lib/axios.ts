// lib/axios.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // NestJS backend
  withCredentials: true,
});

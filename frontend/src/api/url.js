import axios from 'axios';

const API = axios.create({
  baseURL: "https://url-shortner-h0vd.onrender.com",
});

export const createShortUrl = (url) =>
  API.post('/url', { url });
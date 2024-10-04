import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined in the env. variables");
}

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_API_KEY is not defined in the env. variables");
}

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'api-key': apiKey, 
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

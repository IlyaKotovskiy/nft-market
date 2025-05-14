import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.MODE !== 'production' 
        ? 'http://localhost:3001/api' 
        : import.meta.env.VITE_BACKEND,
    headers: {
        'x-wallet-address': localStorage.getItem('wallet_address')
    }
});
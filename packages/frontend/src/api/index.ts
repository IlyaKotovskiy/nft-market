import axios from "axios";

export const BASE_URL = 'http://localhost:3001/api';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'x-wallet-address': localStorage.getItem('wallet_address')
    }
});
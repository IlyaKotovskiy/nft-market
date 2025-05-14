import { handleRequest } from "@/utils/api-helpers";
import { api } from ".";

export const getUsers = () => 
    handleRequest(api.get('/users').then(r => r.data));

export const getUser = (wallet_address: string) => 
    handleRequest(api.post('/get-user', { wallet_address }).then(r => r.data));
import { handleRequest } from "@/utils/api-helpers";
import { api } from ".";

export const authUser = (wallet_address: string) =>
    handleRequest(api.post('/user', { wallet_address }).then(res => res.data));
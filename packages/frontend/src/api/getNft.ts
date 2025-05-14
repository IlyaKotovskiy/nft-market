import { handleRequest } from "@/utils/api-helpers";
import { api } from ".";

export const getNfts = () =>
    handleRequest(api.get('/nfts').then(r => r.data));
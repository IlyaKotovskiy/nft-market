import { handleRequest } from "@/utils/api-helpers";
import { api } from ".";

export const createNft = (formData) =>
    handleRequest(api.post('/create-nft', formData));
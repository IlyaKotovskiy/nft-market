import { handleRequest } from "@/utils/api-helpers";
import { api } from ".";

export const updateUser = (id, username, email) =>
    handleRequest(api.put('/update-user', { id, username, email }));
import { Router } from "express";
import { authUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/User.controller.js";
import { requireAdmin } from "../middlewares/adminMiddleware.js";

export const UserRoutes = (router: Router) => {
    router.get('/users', requireAdmin, getUsers)
    router.post('/get-user', getUser)
    router.post('/user', authUser)
    router.delete('/delete-user', requireAdmin, deleteUser)
    router.put('/update-user', updateUser)
};
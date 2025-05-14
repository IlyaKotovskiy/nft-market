import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../config/db.js";

export const getUsers = asyncHandler(async (_, res) => {
    const users = await User.findAll();
    return res.status(200).json(users);
});

export const getUser = asyncHandler(async (req, res) => {
    const { wallet_address } = req.body;

    if (!wallet_address) {
        return res.status(400).json({ error: 'wallet_address value is required' })
    }

    const returnedUser = await User.findOne({
        where: { wallet_address: wallet_address }
    });

    if (!returnedUser) {
        return res.status(400).json({ error: 'User not found' });
    }

    return res.status(200).json(returnedUser);
});

export const authUser = asyncHandler(async (req, res) => {
    const { wallet_address } = req.body;

    if (!wallet_address) {
        return res.status(400).json({ error: 'wallet_address value is required' });
    }

    const existingUser = await User.findOne({
        where: { wallet_address }
    });

    if (!existingUser) {
        const newUser = await User.create({
            wallet_address: wallet_address
        });

        return res.status(200).json({ message: 'New user successfuly created and authorized!', user: newUser });
    } else {
        return res.status(200).json({ message: 'You have successfully logged in' });
    }
});

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "id is required!" });
    }

    const deletedUser = await User.destroy({ where: { id } });

    if (deletedUser === 0) {
        return res.status(400).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully!" });
});

export const updateUser = asyncHandler(async (req, res) => {
    const { id, username, email } = req.body;

    if (!id) {
        return res.status(400).json({ error: "user id is required!" });
    }

    if (!username && !email) {
        return res.status(400).json({ error: "At least one field (username or email) must be provided for update!" });
    }

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(400).json({ error: "User not found!" })
    }

    const updateData: { username?: string, email?: string } = {};

    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;

    await user.update(updateData);

    return res.status(200).json({ message: "User updated successfully!" });
});
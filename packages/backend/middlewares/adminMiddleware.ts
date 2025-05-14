import { Request, Response, NextFunction } from "express";
import { EUserRole, IUser } from "../types/User.t.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../config/db.js";

export const requireAdmin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const wallet_address = req.headers['x-wallet-address'] as string;

    if (!wallet_address) {
        return res.status(401).json({ error: 'Wallet address is required' });
    }

    const user = await User.findOne({
        where: { wallet_address: wallet_address }
    }) as unknown as IUser | null;

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (user.role !== EUserRole.ADMIN) {
        return res.status(403).json({ error: 'This user is not admin' });
    }

    next();
});
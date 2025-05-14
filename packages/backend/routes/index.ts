import { Router } from "express";
import { UserRoutes } from "./User.routes.js";
import { NFTRoutes } from "./NFT.routes.js";

const router = Router();

UserRoutes(router);
NFTRoutes(router);

export default router;
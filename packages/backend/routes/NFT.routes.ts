import { Router } from "express";
import { createNft, deleteNft, getNfts } from "../controllers/NFT.controller.js";
import { upload } from "../config/multerConfig.js";

export const NFTRoutes = (router: Router) => {
    router.get('/nfts', getNfts);
    router.post('/create-nft', upload.single('file'), createNft);
    router.delete('/delete-nft', deleteNft);
}
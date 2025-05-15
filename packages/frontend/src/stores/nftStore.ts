import { createNft } from "@/api/createNft";
import { getNfts } from "@/api/getNft";
import { makeAutoObservable, runInAction } from "mobx";

class NFTStore {
    nfts = [];
    isLoading = true;

    constructor() {
        makeAutoObservable(this);
    }

    fetchNfts = async () => {
        const nfts = await getNfts();
        runInAction(() => {
            this.nfts = nfts;
            this.isLoading = false;
        });
    }

    createNft = async (formData) => {
        await createNft(formData);
    }
}

export const nftStore = new NFTStore();
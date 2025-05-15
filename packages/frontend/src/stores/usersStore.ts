import { getUser, getUsers } from "@/api/getUsers";
import { makeAutoObservable, runInAction } from "mobx";
import { nftStore } from "./nftStore";

class UsersStore {
    users = [];
    curUser = null;
    isLoading = true;

    constructor() {
        makeAutoObservable(this);
    }

    fetchCurUser = async (walletAddress: string) => {
        this.isLoading = false;
        const user = await getUser(walletAddress);
        runInAction(() => {
            this.curUser = user;
            this.isLoading = false;
        });
    };

    fetchUsers = async () => {
        this.isLoading = false;
        const users = await getUsers();
        runInAction(() => {
            this.users = users;
            this.isLoading = false;
        });
    };

    setUserWallet = (wallet_address) => {
        runInAction(() => {
            if (this.curUser) {
                this.curUser.wallet_address = wallet_address;
            };
        });
    };

    updateCurUserFields = (data: { email?: string, username?: string }) => {
        runInAction(() => {
            if (data.email !== undefined) {
                this.curUser.email = data.email;
            }
            if (data.username !== undefined) {
                this.curUser.username = data.username;
            }
        });
    };

    get collectionsCurUserNFTs() {
        if (!this.curUser) return [];

        const userNFTs = nftStore.nfts.filter(nft => nft.ownerId === this.curUser.id);
        const collections = userNFTs.map(nft => nft.collection);

        return Array.from(new Set(collections));
    }

    get userCount() {
        return this.users.length;
    };

    get curUserWallet() {
        return this.curUser?.wallet_address;
    };
}

export const usersStore = new UsersStore();
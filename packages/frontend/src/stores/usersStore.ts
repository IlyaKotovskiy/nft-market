import { getUser, getUsers } from "@/api/getUsers";
import { action, makeAutoObservable, runInAction } from "mobx";

class UsersStore {
    users = [];
    curUser = null;
    isLoading = true;

    constructor() {
        makeAutoObservable(this, {
            fetchUsers: action,
            fetchCurUser: action
        });
    }

    // usersStore.ts
fetchCurUser = async (walletAddress: string) => {
    this.isLoading = true;
    
    // Искусственная задержка 2 секунды
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const response = await getUser(walletAddress);
      runInAction(() => {
        this.curUser = response;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
  
  fetchUsers = async () => {
    this.isLoading = true;
    
    // Задержка 1.5 секунды
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const response = await getUsers();
      runInAction(() => {
        this.users = response;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}

export const usersStore = new UsersStore();
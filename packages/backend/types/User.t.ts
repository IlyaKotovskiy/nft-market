export enum EUserRole {
    USER = 'user',
    ADMIN = 'admin'
}

export interface IUser {
    id: string;
    role: EUserRole;
    wallet_address: string;
    username: string | null;
    email: string | null;
}
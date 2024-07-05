import type {ObjectId} from "mongoose";

export interface User {
    _id?: ObjectId
    email: string
    password: string
}


export interface Wallet {
    _id?: ObjectId
    user: User
    address: string;
    balance: number;
    targetBalance: number;
    description: string;
    autoupdate: boolean;
}

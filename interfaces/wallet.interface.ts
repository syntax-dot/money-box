import type {ObjectId} from "mongoose";

export interface Wallet {
    _id: ObjectId
    address: string;
    balance: number;
    targetBalance: number;
    description: string;
    autoupdate: boolean;
}

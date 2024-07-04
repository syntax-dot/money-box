import type {Wallet} from "~/interfaces";

export const defaultWalletData: Wallet = {
    _id: '123123',
    address: process.env.DEFAULT_ADDRESS as string,
    autoupdate: false,
    balance: 0,
    description: 'На новый байк',
    targetBalance: 4000
}

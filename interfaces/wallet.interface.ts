export interface Wallet {
    address: string;
    balance: number;
    targetBalance: number;
    description: string;
    autoupdate: boolean;
}

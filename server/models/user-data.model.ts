import { defineMongooseModel } from "#nuxt/mongoose";
import type {Wallet} from "~/interfaces/wallet.interface";

export const WalletSchema = defineMongooseModel<Wallet>({
    name: 'WalletSchema',
    schema: {
        address: {
            type: String,
            required: true,
            unique: true,
        },
        balance: {
            type: Number,
            required: true,
        },
        targetBalance: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        autoupdate: {
            type: Boolean,
            required: true,
        },
    },
    options: {

    },
    hooks(schema) {

    },
})

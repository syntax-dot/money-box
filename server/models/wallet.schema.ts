import {defineMongooseModel} from "#nuxt/mongoose";
import {Types} from "mongoose";
import {Wallet} from "~/interfaces";

export const WalletSchema = defineMongooseModel<Wallet>({
    name: 'WalletSchema',
    schema: {
        address: {
            type: String,
            required: true,
            unique: true,
        },
        user: {
            type: Types.ObjectId,
            ref: 'User',
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
    options: {},
    hooks(schema) {

    },
})

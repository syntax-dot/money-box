import {WalletSchema} from "~/server/models/wallet.schema";

export default defineEventHandler(async (event) => {
    try {
        return await WalletSchema.findOne({_id: event.context.params?._id})
    } catch (error) {
        return error
    }
})

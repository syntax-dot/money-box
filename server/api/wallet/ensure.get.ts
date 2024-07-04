import {WalletSchema} from "~/server/models/wallet.schema";

export default defineEventHandler(async (event) => {
    try {
        const result = await WalletSchema.find({})
        if (!result.length) {
            const defaultDocument = {
                address: process.env['NUXT_DEFAULT_ADDRESS'],
                autoupdate: false,
                balance: 0,
                description: 'Гоооойда!',
                targetBalance: 4000
            }
            return [await new WalletSchema(defaultDocument).save()]
        } else return result
    } catch (error) {
        return error
    }
})

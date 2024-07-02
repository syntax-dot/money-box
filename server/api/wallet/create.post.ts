import {WalletSchema} from "~/server/models/wallet.schema";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        return await new WalletSchema(body).save()
    } catch (error) {
        return error
    }
})

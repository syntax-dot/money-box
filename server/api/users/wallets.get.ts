import {UserSchema} from "~/server/models/user.schema";
import {WalletSchema} from "~/server/models/wallet.schema";

export default defineEventHandler(async (event) => {
    try {
        const {email} = await requireAuth(event)

        const user = await UserSchema.findOne({email})
        if (!user)
            return

        return await WalletSchema
            .where({user: user._id})
            .find()
            .populate({
                path: 'user',
                select: 'email',
            })
    } catch (error) {
        throw createError({
            statusCode: 500,
        })
    }
})

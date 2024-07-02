import {UserSchema} from "~/server/models/user.schema";

export default defineEventHandler(async () => {
    return await UserSchema.find().select('-password')
})

import {UserData} from "~/server/models/user-data.model";

export default defineEventHandler(async (event) => {
    try {
        return await UserData.findOne({ _id: event.context.params?._id })
    }
    catch (error) {
        return error
    }
})

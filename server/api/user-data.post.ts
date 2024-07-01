import {UserData} from "~/server/models/user-data.model";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        return await new UserData(body).save()
    }
    catch (error) {
        return error
    }
})

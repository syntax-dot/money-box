import type {H3Event} from 'h3'
import {AuthPayload} from "~/interfaces";

const {mongo} = useRuntimeConfig().auth

export async function _useSession(event: H3Event, email?: string) {
    const session = await useSession(event, {
        password: mongo.secret,
        name: 'authorization',
    })

    if (email)
        await session.update({email})
    return {
        ...session,
        data: session.data as AuthPayload
    }
}

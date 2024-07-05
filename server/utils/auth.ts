import type {H3Event} from 'h3'

export async function getAuth(event: H3Event) {
    return (await _useSession(event)).data.email
}

export async function setAuth(event: H3Event, email: string) {
    return await _useSession(event, email)
}

export async function clearAuth(event: H3Event) {
    return (await _useSession(event)).clear()
}

export async function requireAuth(event: H3Event) {
    const token = await getAuth(event)

    if (!token)
        throw createError({
            statusCode: 401,
            statusText: 'Unauthorized! token invalid.'
        })

    return token
}

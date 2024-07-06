import type {AuthPayload} from "~/interfaces";

const useUserSessionState = () => useState<AuthPayload>('nuxt-mongoose-auth', () => ({}))

export function useA() {
    const sessionState = useUserSessionState()

    async function clear() {
        await $fetch('/api/auth/logout', {method: 'DELETE'})
        useUserSessionState().value = {}
    }

    async function me() {
        useUserSessionState().value = await useRequestFetch()('/api/auth/me')
    }

    return {
        loggedIn: computed(() => Boolean(sessionState.value?.email)),
        user: computed(() => sessionState.value || null),
        clear,
        me,
    }
}





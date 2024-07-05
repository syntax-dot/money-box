const useUserSessionState = () => useState<{ email: string }>('nuxt-mongoose-auth', () => ({}))

export function useA() {
    const sessionState = useUserSessionState()

    async function clear() {
        await $fetch('/api/auth/logout', {method: 'DELETE'})
        useUserSessionState().value = {}
    }

    async function me() {
        useUserSessionState().value = await useRequestFetch()('/api/auth/me', {
            headers: {
                Accept: 'text/json'
            }
        })
    }

    return {
        loggedIn: computed(() => Boolean(sessionState.value?.email)),
        user: computed(() => sessionState.value || null),
        clear,
        me,
    }
}





export function useAuth() {
    const email = computed(() => sessionStorage?.getItem('user') ?? null)

    return {
        loggedIn: computed(() => Boolean(email.value)),
        user: computed(() => email.value || null),
        clear,
    }
}

async function clear() {
    sessionStorage.removeItem('user')
}

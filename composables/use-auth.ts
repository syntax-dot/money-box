export function useAuth() {
    // const userEmail = customRef((track, trigger) => {
    //     return {
    //         get() {
    //             track()
    //             if (typeof window === 'undefined') return
    //             return sessionStorage?.getItem('user') ?? null;
    //         },
    //         set(value) {
    //             if (typeof window === 'undefined') return
    //             if (!value) sessionStorage.removeItem('user')
    //             else sessionStorage?.setItem('user', value);
    //             trigger()
    //         }
    //     }
    // })

    const user = computed({
        get: () => sessionStorage?.getItem('user') ?? null,
        set: (value) => {
            if (!value) sessionStorage.removeItem('user')
            else sessionStorage.setItem('user', value)
        }
    })

    // const user = ref<User['email'] | null>(null)

    // onMounted(() => {
    //     user.value = sessionStorage.getItem('user') ?? null
    // })

    function logout() {
        sessionStorage.removeItem('user')
        user.value = null
    }

    return {
        loggedIn: computed(() => Boolean(user.value)),
        user,
        logout,
    }
}



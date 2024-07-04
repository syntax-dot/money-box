import {createInjectable} from "~/utils/composition/create-injectable";

export const userAuthInjectable = createInjectable(() => {
    const user = computed({
        get: () => sessionStorage?.getItem('user') ?? null,
        set: (value) => {
            if (!value) sessionStorage.removeItem('user')
            else sessionStorage.setItem('user', value)
        }
    })

    onMounted(() => {
        user.value = sessionStorage.getItem('user') ?? null
    })

    function logout() {
        user.value = null
    }

    return {
        loggedIn: computed(() => Boolean(user.value)),
        user,
        logout,
    }
})

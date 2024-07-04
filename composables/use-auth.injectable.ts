import {createInjectable} from "~/utils/composition/create-injectable";
import type {User} from "~/interfaces";

export const userAuthInjectable = createInjectable(() => {
    const user = ref<User['email'] | null>(null)
    
    watch(user, (value) => {
        if (!value) sessionStorage.removeItem('user')
        else sessionStorage.setItem('user', value)
    })

    function logout() {
        user.value = null
    }

    onMounted(() => {
        user.value = sessionStorage.getItem('user') ?? null
    })

    return {
        loggedIn: computed(() => Boolean(user.value)),
        user,
        logout,
    }
})

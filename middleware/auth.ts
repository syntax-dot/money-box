import {useAuth} from "~/composables/use-auth";

export default defineNuxtRouteMiddleware(() => {
    const {loggedIn} = useAuth()

    watch(loggedIn, () => {
        if (!loggedIn.value)
            return navigateTo('/login')
    }, {immediate: true})
})

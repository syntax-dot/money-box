import {useAuth} from "~/composables/use-auth";

export default defineNuxtRouteMiddleware(() => {
    const {loggedIn} = useAuth()
    
    if (!loggedIn.value) return navigateTo('/login')
})

import {userAuthInjectable} from "~/composables/use-auth.injectable";

export default defineNuxtRouteMiddleware(() => {
    const {loggedIn} = userAuthInjectable.inject()

    if (!loggedIn.value) return navigateTo('/login')
})

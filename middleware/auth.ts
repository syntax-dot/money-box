import {useA} from "~/composables/use-a";

export default defineNuxtRouteMiddleware(() => {
    const {loggedIn} = useA()
    console.log('loggedIn', loggedIn.value)
    watch(loggedIn, () => {
        if (!loggedIn.value)
            return navigateTo('/')
    })

    if (!loggedIn.value)
        return navigateTo('/')
})

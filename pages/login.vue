<script setup lang="ts">
import type {FormError} from '#ui/types'
import type {User} from "~/interfaces";
import {userAuthInjectable} from "~/composables/use-auth.injectable";

const fields = [
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'Enter your email'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password'
  }
]

const {user} = userAuthInjectable.inject()
const {me} = useA()


const validate = (state: any) => {
  const errors: FormError[] = []
  if (!state.email) errors.push({path: 'email', message: 'Email is required'})
  if (!state.password) errors.push({path: 'password', message: 'Password is required'})
  return errors
}

async function onSubmit(data: User) {
  try {
    const res = await $fetch('/api/auth/login', {method: 'POST', body: data})
    if (res.loggedIn) {
      await me()
      user.value = data.email
      navigateTo('/')
    }
  } catch (error: any) {
    console.error(`Login failed: ${error.message}`)
  }
}
</script>

<template>
  <AuthForm mode="login" @submit="onSubmit"/>
</template>

<style scoped>

</style>

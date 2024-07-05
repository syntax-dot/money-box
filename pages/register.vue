<script setup lang="ts">
import type {User} from "~/interfaces";

const {me} = useA()

async function onSubmit(data: User) {
  const {email} = data

  try {
    const res = await $fetch('/api/auth/register', {method: 'POST', body: data})
    console.log('res', res)
    if (res.registered) {
      await me()
      sessionStorage.setItem('user', email);
      navigateTo('/')
    }
  } catch (error: any) {
    console.error(`Login failed: ${error.message}`)
  }
}
</script>

<template>
  <AuthForm mode="register" @submit="onSubmit"/>
</template>

<style scoped>

</style>

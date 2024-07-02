<script setup lang="ts">
import type {FormError} from '#ui/types'
import type {User} from "~/interfaces";

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

const validate = (state: any) => {
  const errors: FormError[] = []
  if (!state.email) errors.push({path: 'email', message: 'Email is required'})
  if (!state.password) errors.push({path: 'password', message: 'Password is required'})
  return errors
}

function onSubmit(data: User) {
  const {email} = data
  console.log('data', data)
  sessionStorage.setItem('user', email);
}
</script>

<template>
  <UPage class="flex items-center justify-center py-16">
    <UCard class="max-w-sm w-full">
      <UAuthForm
          :fields="fields"
          :validate="validate"
          title="Register"
          align="top"
          icon="i-heroicons-user-circle"
          :ui="{ base: 'text-center', footer: 'text-center' }"
          @submit="onSubmit"
      >
        <template #description>
          Do you have an account?
          <NuxtLink to="/login" class="text-primary font-medium">Login</NuxtLink>
        </template>
      </UAuthForm>
    </UCard>
  </UPage>
</template>

<style scoped>

</style>

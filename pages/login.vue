<script setup lang="ts">
import type {FormError} from '#ui/types'

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

function onSubmit(data: any) {
  console.log('Submitted', data)
}
</script>

<template>
  <UPage class="flex items-center justify-center py-16">
    <UCard class="max-w-sm w-full">
      <UAuthForm
          :fields="fields"
          :validate="validate"
          title="Login"
          align="top"
          icon="i-heroicons-lock-closed"
          :ui="{ base: 'text-center', footer: 'text-center' }"
          @submit="onSubmit"
      >
        <template #description>
          Don't have an account?
          <NuxtLink to="/" class="text-primary font-medium">Sign up</NuxtLink>
        </template>

        <!--        <template #validation>-->
        <!--          <UAlert color="red" icon="i-heroicons-information-circle-20-solid" title="Error signing in"/>-->
        <!--        </template>-->
      </UAuthForm>
    </UCard>
  </UPage>
</template>

<style scoped>

</style>

<script setup lang="ts">
import type {User} from "~/interfaces";
import {type InferType, object, string} from 'yup'
import {capitalize} from "@vue/shared";
import type {FormSubmitEvent} from "#ui/types";
import {userAuthInjectable} from "~/composables/use-auth.injectable";

interface AuthFormProps {
  mode: 'login' | 'register'
}

interface AuthFormEmits {
  (event: 'submit', value: User): void;
}

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
      .min(8, 'Must be at least 8 characters')
      .required('Required'),
})

type Schema = InferType<typeof schema>

const dataByMode = {
  login: {
    description: `Don't have an account? `,
    submitTitle: 'Register',
    icon: 'i-heroicons-lock-closed'
  },
  register: {
    description: 'Do you have an account? ',
    submitTitle: 'Login',
    icon: 'i-heroicons-user-circle'
  }
}

const emit = defineEmits<AuthFormEmits>()
const props = defineProps<AuthFormProps>()

const {me} = useA()
const {user: sessionUser} = userAuthInjectable.inject()

const user = reactive({
  email: '',
  password: '',
})

const isShowPassword = ref(false)
const errorMessage = ref<string | null>(null)

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const {data} = event

  if (!schema.isValidSync(data)) {
    return
  }

  try {
    const res = await $fetch(`/api/auth/${props.mode}`, {method: 'POST', body: data})
    if (res) {
      await me()
      sessionUser.value = data.email
      emit('submit', event.data satisfies User)
      navigateTo('/')
    }
  } catch (error: any) {
    console.error(`Login failed: ${error.message}`)
    errorMessage.value = error.message
    await wait(5000)
    errorMessage.value = null
  }
}
</script>

<template>
  <div class="flex items-center justify-center py-16">
    <UCard class="max-w-sm w-full">

      <UForm :schema="schema" :state="user" class="space-y-4" @submit="onSubmit">
        <div class="flex flex-col items-center gap-4 justify-center">
          <UIcon style="width: 2rem; height: 2rem" :name="dataByMode[mode].icon"/>
          <h2 class="font-bold text-2xl">{{ capitalize(mode) }}</h2>
          <div>
            <span class="text-gray-400">{{ dataByMode[mode].description }}</span>
            <NuxtLink :to="mode === 'login' ? '/register' : '/login'" class="text-primary font-medium">
              {{ dataByMode[mode].submitTitle }}
            </NuxtLink>
          </div>
        </div>
        <UFormGroup label="Email" name="email">
          <UInput v-model="user.email" placeholder="Enter your email"/>
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="user.password"
                  name="password"
                  placeholder="Enter your password"
                  :type="isShowPassword ? 'text' : 'password'"
                  :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                  v-show="user.password"
                  color="gray"
                  variant="link"
                  :icon="isShowPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                  :padded="false"
                  @click.stop="isShowPassword = !isShowPassword"
              />
            </template>
          </UInput>
        </UFormGroup>

        <UDivider/>
        <UButton
            class="w-full"
            :label="capitalize(mode)"
            type="submit"
        />
        <div class="text-red-500" v-if="errorMessage">
          {{ errorMessage }}
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<style scoped>

</style>

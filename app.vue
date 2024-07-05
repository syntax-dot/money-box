<script setup lang="ts">
import {mapContentNavigation} from "#ui-pro/modules/pro/runtime/utils/content";
import type {NavItem} from "@nuxt/content";
import {userAuthInjectable} from "~/composables/use-auth.injectable";
import type {Wallet} from "~/interfaces";

const navigation = ref<NavItem[]>([
  {
    title: 'Login',
    _path: '/login'
  }, {
    title: 'Admin',
    _path: '/admin'
  },
]);

const {user, logout, loggedIn} = userAuthInjectable.provide()
const runtimeConfig = useRuntimeConfig()

async function getWalletBalance() {
  const {data, error} = await useFetch('/api/bscscan/tokenbalance')
  console.log('data', data)
}

async function onAddUserData() {
  // TODO CREATE
  const {data: createdWallet, error} = await useFetch('/api/wallet/create', {
    method: 'POST',
    body: {},
  })
}

async function getEnsureWalletData() {
  const {data, error} = await useFetch<Wallet[]>('/api/wallet/ensure', {
    method: 'GET',
  })

  console.log('getEnsureWalletData data:', data.value)
}


function onClick() {
  if (loggedIn.value && user.value) {
    logout()
  }
  navigateTo('/login')
}

onMounted(getEnsureWalletData)

const links = computed(() => {
  return [
    {
      label: 'Home',
      to: '/'
    },
    loggedIn
        ? {
          label: 'Admin',
          to: '/admin'
        }
        : {}
  ]
})


const loginButtonIcon = computed(() => {
  return loggedIn.value
      ? 'i-heroicons-arrow-left-start-on-rectangle'
      : 'i-heroicons-arrow-left-end-on-rectangle'
})

</script>
<template>
  <UHeader :links="links">
    <template #logo>
      <div class="flex items-center gap-4">
        <UIcon @click="getEnsureWalletData" name="i-ph-rocket-launch" dynamic/>
        Money-box
      </div>

    </template>

    <template #right>
      <UColorModeButton/>
      <UButton @click="onClick"
               :label="loggedIn ? 'Logout' : 'Login'"
               :color="loggedIn ? 'red' : 'primary'"
               :icon="loginButtonIcon"
      />
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)"/>
    </template>
  </UHeader>

  <UMain>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </UMain>
</template>

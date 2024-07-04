<script setup lang="ts">
import {mapContentNavigation} from "#ui-pro/modules/pro/runtime/utils/content";
import type {NavItem} from "@nuxt/content";
import type {Wallet} from "~/interfaces";
import {userAuthInjectable} from "~/composables/use-auth.injectable";

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

async function getWalletBalance() {
  const {data, error} = await useFetch('/api/bscscan/tokenbalance')
  console.log('data', data)
}

async function onAddUserData() {
  const initialWalletData: Wallet = {
    address: 'aboba',
    autoupdate: false,
    balance: 0,
    description: 'коплю',
    targetBalance: 31
  }

  const {data, error} = await useFetch('/api/wallet/create', {
    method: 'POST',
    body: initialWalletData,
  })
}

const links = [
  {
    label: 'Home',
    to: '/'
  }
]

function onClick() {
  if (loggedIn.value && user.value) {
    logout()
  }
  navigateTo('/login')
}


</script>
<template>
  <UHeader :links="links">
    <template #logo>
      <div class="flex items-center gap-4">
        <UIcon name="i-ph-rocket-launch" dynamic/>
        Money-box
      </div>

    </template>

    <template #right>
      <UColorModeButton/>
      <ClientOnly>
        <UButton @click="onClick"
                 :label="loggedIn ? 'Logout' : 'Login'"
                 :color="loggedIn ? 'red' : 'primary'"
                 :icon="`i-heroicons-arrow-${loggedIn ? 'left-start-on-rectangle' : 'left-end-on-rectangle'}`"
        />
      </ClientOnly>
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

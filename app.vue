<script setup lang="ts">
import {mapContentNavigation} from "#ui-pro/modules/pro/runtime/utils/content";
import type {NavItem} from "@nuxt/content";
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
</script>
<template>
  <UHeader title="links">
    <template #logo>
      <UIcon name="i-ph-rocket-launch" dynamic/>
      Копилка
    </template>

    <template #right>
      <UColorModeButton/>
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

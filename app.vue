<script setup lang="ts">
import type {Wallet} from "~/interfaces/wallet.interface";
import type {NavItem} from '@nuxt/content'
import type {Ref} from "vue";
import {mapContentNavigation} from "#ui-pro/modules/pro/runtime/utils/content";

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

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

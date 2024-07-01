<script setup lang="ts">
import type {Wallet} from "~/interfaces/wallet.interface";

const { data } = await useFetch('/api/wallet/')

async function onAddUserData() {
  const initialWalletData: Wallet = {
    address: 'aboba',
    autoupdate: false,
    balance: 0,
    description: 'коплю',
    targetBalance: 31
  }

  const { data, error } = await useFetch('/api/wallet/create', {
    method: 'POST',
    body: initialWalletData,
  })
}
</script>
<template>
  <div>
    <div @click="onAddUserData">
      add
    </div>
    {{data}}
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

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
}
</script>
<template>
  <div>
    <div @click="">
      add
    </div>
    {{data}}
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

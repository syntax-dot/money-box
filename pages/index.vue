<script setup lang="ts">
import type {Wallet} from "~/interfaces/wallet.interface";

const balance = ref<Wallet | null>(null)

async function getWalletBalance() {
  const {data, error} = await useFetch<Wallet>('/api/bscscan/tokenbalance')
  return data.value
}

onMounted(async () => {
  balance.value = await getWalletBalance() ?? null
})
</script>

<template>
  <div>{{ balance }}</div>
</template>

<style scoped>

</style>

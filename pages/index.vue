<script setup lang="ts">

import type {Wallet} from "~/interfaces";

const isAutoUpdate = ref(false)
const isLoadingBalance = ref(false)
const balance = ref<Wallet | null>(null)

let updateBalanceInterval: NodeJS.Timeout | null = null

async function getWalletBalance() {
  isLoadingBalance.value = true
  try {
    const {data, error} = await useFetch<Wallet>('/api/bscscan/tokenbalance')
    if (data.value && !error.value) return data.value
  } finally {
    isLoadingBalance.value = false
  }
}

watch(isAutoUpdate, (value) => {
  if (!value) {
    if (updateBalanceInterval) {
      clearInterval(updateBalanceInterval)
      updateBalanceInterval = null
    }
    return;
  }

  if (updateBalanceInterval) return

  updateBalanceInterval = setInterval(getWalletBalance, 5000)
})

balance.value = await getWalletBalance() ?? null
</script>

<template>
  <div class="p-4">
    <UCard>
      <template #header>
        <h2 class="font-bold">
          aboba
        </h2>
      </template>

      <div>
        aboba
      </div>

      <template #footer>
        <div class="flex flex-row items-center gap-4">

          Autoupdate:
          <UToggle
              :disabled="!isAutoUpdate && isLoadingBalance"
              size="xl"
              v-model="isAutoUpdate"
          />

          <UButton
              v-if="!isAutoUpdate"
              @click="getWalletBalance"
              :loading="isLoadingBalance"
              icon="i-heroicons-arrow-path"
              label="Refresh"
          />
        </div>
      </template>
    </UCard>
  </div>

</template>

<style scoped>

</style>

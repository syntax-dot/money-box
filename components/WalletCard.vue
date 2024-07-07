<script setup lang="ts">
import type {Wallet} from "~/interfaces";

interface WalletCardProps {
  wallet: Wallet
}

interface WalletCardEmits {
  (event: 'refresh'): void;
}

const props = defineProps<WalletCardProps>()
const emit = defineEmits<WalletCardEmits>()

let updateBalanceInterval: NodeJS.Timeout | null = null

const balance = ref<Wallet['balance'] | null>(null)
const isLoadingBalance = ref(false)
const isAutoUpdate = ref(false)

async function getWalletBalance() {
  isLoadingBalance.value = true
  try {
    const {data, error} = await useFetch<Wallet['balance']>('/api/bscscan/tokenbalance')
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
  <UCard>
    <template #header>
      <h2 class="font-bold">
        {{ wallet.description }}
      </h2>
    </template>

    <div>
      {{ wallet.targetBalance }}
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
</template>

<style scoped>

</style>

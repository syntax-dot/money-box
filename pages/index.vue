<script setup lang="ts">
import type {Wallet} from "~/interfaces";
import {userAuthInjectable} from "~/composables/use-auth.injectable";

const walletList = ref<Wallet[] | null>(null)

const {loggedIn} = userAuthInjectable.inject()

async function getEnsureWalletData() {
  const {data, error} = await useFetch<Wallet[]>('/api/wallet/ensure', {
    method: 'GET',
  })
  if (data.value) {
    return data.value
  }
}

walletList.value = await getEnsureWalletData() ?? null
</script>

<template>
  <div class="p-4 flex flex-col items-center">
    <UDashboardCard v-if="!loggedIn"
                    title="Example"
                    description="Example money box"
                    :links="[
                        {
                          click: () => navigateTo('wallet/example'),
                          label: 'Open',
                          color: 'gray',
                          trailingIcon: 'i-heroicons-arrow-right-20-solid'
                        }
                    ]"
    />
    {{ walletList ?? 'asd' }}
    <template v-if="walletList?.length">
      <div class="flex flex-col gap-4" style="max-width: 600px">
        <WalletCard v-for="(wallet, index) of walletList"
                    :key="index"
                    :wallet="wallet"
        />
      </div>
    </template>
  </div>

</template>

<style scoped>

</style>

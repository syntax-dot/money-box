<script setup lang="ts">

import type {Wallet} from "~/interfaces";

const route = useRoute()

const url = `/api/wallet/${route.params.id}`

const {data, pending} = await useFetch<Wallet>(url)
</script>

<template>
  <div>
    {{ data }}
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
const { data } = await useFetch('/api/hello')
</script>
<template>
  <div>
    {{ data }}
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

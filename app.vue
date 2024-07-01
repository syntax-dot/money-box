<script setup lang="ts">
import {UserData} from "~/server/models/user-data.model";
import UserDataGet from "~/server/api/user-data.get";

const { data } = await useFetch('/api/hello')

async function onAddUserData() {

  await UserData.shema
}
</script>
<template>
  <div>
    <div @click="">
      add
    </div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<template>
  <div class="relative" :class="{ dark: general_store.use_darkmode }">
    <OverlayConfirmedData />
    <OverlayRename />
    <BaseToastList />
    <SideBar />
    <div
      class="flex h-full min-h-screen w-full items-center justify-center bg-gray-100 dark:bg-gradient-to-bl dark:from-zinc-800 dark:to-midnight-400 lg:pl-28"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useGeneralStore } from "~/stores/generalStore";

const general_store = useGeneralStore();
</script>

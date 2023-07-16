<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  import { useAnnotationInputStore } from "~/stores/annotationInput"
  const aInput = useAnnotationInputStore()

  aInput.loadConfirmedData()
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

</style>
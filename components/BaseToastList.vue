<template>
  <div
    class="fixed bottom-4 right-4 z-50 flex h-full flex-col justify-end gap-2 overflow-hidden"
  >
    <TransitionGroup name="fade">
      <BaseToast v-for="t in toast_list" :toast="t" :key="t"> </BaseToast>
    </TransitionGroup>
  </div>
</template>

<script setup>
const toast_list = useGeneralStore().toast_list;
</script>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  scale: 0;
}

.fade-leave-active {
  position: absolute;
}
</style>

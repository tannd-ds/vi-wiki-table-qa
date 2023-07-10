<template>
  <div class="absolute bottom-0 right-0 mr-4 md-4 overflow-hidden">
    <TransitionGroup name="fade">
      <BaseToast v-for="t in toast_list" :toast="t" :key="t">
      </BaseToast>
    </TransitionGroup>
    </div>
</template>

<script setup>
  import { useGeneralStore } from '~/stores/generalStore'
  const toast_list = useGeneralStore().toast_list
</script>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-30px, 0);
}

.fade-leave-active {
  position: absolute;
}


</style>
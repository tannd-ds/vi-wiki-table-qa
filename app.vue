<template>
  <div
    :style="`color-scheme: ${general_store.use_darkmode ? 'dark' : 'light'}`"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useAnnotationInputStore } from "~/stores/annotationInput";
import { useGeneralStore } from "~/stores/generalStore";

const general_store = useGeneralStore();
const aInput = useAnnotationInputStore();

aInput.loadConfirmedData();
const isLargeScreen = useMediaQuery("(min-width: 1024px)");
general_store.isLargeScreen = isLargeScreen.value;
watch(isLargeScreen, () => {
  general_store.isLargeScreen = isLargeScreen.value;
});
</script>

<style>
.page-up-enter-active,
.page-up-leave-active {
  transition: all 0.3s ease-in-out;
}
.page-up-enter-from,
.page-up-leave-to {
  position: absolute;
  transform: translateY(-100%);
}

.page-down-enter-active,
.page-down-leave-active {
  transition: all 0.3s ease-in-out;
}
.page-down-enter-from,
.page-down-leave-to {
  position: absolute;
  transform: translateY(100%);
}

.fade-enter-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  scale: 98%;
  opacity: 0;
}
</style>

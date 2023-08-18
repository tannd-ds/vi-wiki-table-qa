<template>
  <Transition name="fade" is="div">
    <div
      v-if="general_store.overlayIsShow"
      class="absolute left-0 top-0 z-20 flex h-full min-h-screen w-screen items-baseline justify-center backdrop-blur-xl lg:items-center"
      @keydown.ctrl="console.log('Yos')"
    >
      <div ref="modal">
        <ConfirmedData v-if="currentOverlay == 'ConfirmedData'" />
        <RenameAnnotator v-else-if="currentOverlay == 'RenameAnnotator'" />
        <AllHints v-else-if="currentOverlay == 'AllHints'" />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
const general_store = useGeneralStore();
const modal = ref(null);

onClickOutside(modal, () => {
  general_store.close_overlay();
});

window.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    general_store.close_overlay();
  }
});

const Components = {
  confirmed: "ConfirmedData",
  rename: "RenameAnnotator",
  hints: "AllHints",
};

const currentOverlay = computed(() => {
  return Components[
    general_store.overlay.list[general_store.overlay.list.length - 1]
  ];
});
</script>

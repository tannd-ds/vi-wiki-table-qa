<template>
  <div>
    <Transition name="fade" is="div">
      <div
        v-if="general_store.overlayIsShow"
        class="absolute left-0 top-0 z-20 flex h-full min-h-screen w-screen items-baseline justify-center backdrop-blur-xl delay-1000 lg:items-center"
      ></div>
    </Transition>
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <KeepAlive>
        <div
          v-if="general_store.overlayIsShow"
          class="absolute left-0 top-0 z-[21] flex h-full min-h-screen w-screen items-baseline justify-center backdrop-blur-xl lg:items-center"
        >
          <component :is="currentOverlay" ref="modal"></component>
        </div>
      </KeepAlive>
    </transition>
  </div>
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

<template>
    <Transition name="fade">
      <div 
        v-if="general_store.overlay.is_show" 
        class="
          absolute w-screen h-screen 
          flex items-center justify-center 
          backdrop-blur-sm
        "
      >
        <BaseBox>
          <div class="w-full">
            <slot> </slot>
          </div>
        </BaseBox>
      </div>
    </Transition>
</template>

<script setup>

import { useGeneralStore } from '~/stores/generalStore'
const general_store = useGeneralStore()

const props = defineProps({
    show: Boolean,
})
</script>


<style scoped>
.fade-enter-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
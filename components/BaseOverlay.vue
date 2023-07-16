<template>
    <Transition name="fade">
      <div 
        v-if="general_store.overlay.is_show" 
        class="
          absolute top-0 left-0 w-screen h-screen 
          flex items-center justify-center 
          backdrop-blur-sm
          z-10
        "
      >
        <div ref="modal">
            <slot> </slot>
        </div>
      </div>
    </Transition>
</template>

<script setup>
  import { useGeneralStore } from '~/stores/generalStore'
  import { onClickOutside } from '@vueuse/core'

  const props = defineProps({
      show: Boolean,
  })

  const modal = ref(null)
  onClickOutside(modal, () => general_store.overlay.is_show = false)

  const general_store = useGeneralStore()
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
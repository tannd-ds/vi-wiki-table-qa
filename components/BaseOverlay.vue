<template>
    <Transition name="fade" is="div">
      <div 
        v-if="general_store.overlay.is_show" 
        class="
          absolute top-0 left-0 w-screen h-full min-h-screen 
          flex items-baseline lg:items-center justify-center 
          backdrop-blur-xl
          z-20
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

  window.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
      general_store.overlay.is_show = false
    }
  })
</script>
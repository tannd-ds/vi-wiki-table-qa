<template>
  <div class="flex flex-col gap-4" ref="modal">
    <div>
      <HTMLTable :table_data="aInput.getCurrentTableHTML" />
    </div>
  </div>
</template>

<script setup>
  import { useAnnotationInputStore } from '~/stores/annotationInput';
  import { onClickOutside } from '@vueuse/core'
  const aInput = useAnnotationInputStore()

  const modal = ref(null)
  const is_open = ref(false)
  
  onClickOutside(modal, (event) => is_open.value = false)

  function choose_table(table_index) {
    aInput.setCurrentTableID(table_index)
    is_open.value = false
  }

</script>
<template>
  <div class="flex flex-col gap-4" ref="modal">
    <div>
      <HTMLTable :table_data="displayed_table" />
    </div>
  </div>
</template>

<script setup>
  import { useAnnotationInputStore } from '~/stores/annotationInput';
  import { useGeneralStore } from '~/stores/generalStore'
  const aInput = useAnnotationInputStore()
  const general_store = useGeneralStore()

  const props = defineProps({
    displayed_table_index: {
      type: Number,
      default: 0,
    },
  })


  const displayed_table = computed(() => {
    if (!general_store.overlay.is_show) {
      console.log(aInput.current_table_index)
      return aInput.getCurrentTableHTML
    } else {
      return aInput.getTableHTMLFromIndex(props.displayed_table_index)
    }
  })
</script>
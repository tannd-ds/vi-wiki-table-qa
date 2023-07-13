<template>
    <BaseOverlay>
    </BaseOverlay>
</template>

<script setup>
  import { useAnnotationInputStore } from '~/stores/annotationInput';
  import { useGeneralStore } from '~/stores/generalStore';
  const aInput = useAnnotationInputStore()
  const general_store = useGeneralStore()
  
  function discardChanges() {
    general_store.overlay.is_show = false
  }
  
  function loadTable(chosen_table) {
    aInput.chosen_table = chosen_table
    general_store.overlay.is_show = false
  }

</script>

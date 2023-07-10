<template>
    <BaseOverlay>
      <form class="flex flex-col gap-2">
        <InputField 
          is="textarea"
          label_name="Add New Table" 
          v-model:model-value="aInput.tableInput"
          placeholder="Insert a new table content"
        ></InputField>
      </form>
      <div class="flex gap-4 justify-end">
        <BaseButton @click="saveChanges">OK</BaseButton>
        <BaseButton @click="discardChanges">Cancel</BaseButton>
      </div>
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

  function saveChanges() {
    aInput.table = aInput.getTableFromCSV
    general_store.overlay.is_show = false
  }

</script>

<template>
    <BaseOverlay>
      <div class="min-w-[50vw] max-h-[75vh] overflow-auto mb-4 flex flex-col gap-4 items-center">
        <div 
            v-for="table in aInput.tables" :key="table"
            class="p-4 flex flex-col gap-2 border-blue-400 border rounded-lg hover:bg-blue-50 transition-all duration-200 cursor-pointer"
            @click="loadTable(table)"
          >
          <div 
              class="
                inline-flex items-center justify-center
                mr-2 px-2.5 py-0.5 
                bg-blue-100 
                text-blue-800 text-xs font-semibold 
                border border-blue-400 rounded 
                dark:bg-gray-700 dark:text-blue-400 
              "
            >ID: {{ table.id }}
          </div>
          <BaseTable class="overflow-hidden w-fit min-w-[30vw]" :table="table.content"/>
        </div>
      </div>
      <div class="flex gap-4 justify-end">
      </div>
      <div class="p-4 mt-2 lg:absolute lg:top-4 lg:right-4 flex gap-4 items-center bg-yellow-50 border-2 border-yellow-200 rounded-lg italic">
        <Icon name="carbon:idea" color="currentColor" size="1.5em" />
        <div class=" space-y-2">
          <div>Click on a <span class="text-blue-500" >Table</span> to Load it!</div>
          <div>Click <span class="text-red-500" >Outside</span> to close this.</div>
        </div>
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
  
  function loadTable(chosen_table) {
    aInput.chosen_table = chosen_table
    general_store.overlay.is_show = false
  }

</script>

<template>
    <BaseOverlay>
      <div 
          class="min-w-[33vw] p-4 flex flex-col gap-2 overflow-auto"
      >
        <div v-if="aInput.confirmedData.length <= 0">There is nothing here.</div>
        <div 
            class="relative p-4 flex justify-between items-center border-blue-400 border rounded-lg hover:bg-blue-50 transition-all duration-200 cursor-pointer"
            v-for="confirmed in aInput.confirmedData" 
            :key="confirmed"
        >
          <div>
            <div>Question: {{ confirmed.question }} </div>
            <div>Answer  : {{ confirmed.answer }} </div>
            <div>Table ID: {{ confirmed.table_id }} </div>
          </div>
          <button class="w-fit h-fit p-1 rounded-full hover:bg-slate-300" @click="aInput.removeConfirmed(confirmed)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
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

<template>
  <div>
    <BaseBox class="flex justify-center items-center gap-4">
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
    </BaseBox>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "custom",
    pageTransition: {
        name: 'page',
        mode: 'out-in'
    }
  })

  import { useAnnotationInputStore } from "~/stores/annotationInput"
  import { useGeneralStore } from "~/stores/generalStore"

  const aInput = useAnnotationInputStore()
  const general_store = useGeneralStore()

</script>

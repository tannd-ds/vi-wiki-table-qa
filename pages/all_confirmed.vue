<template>
  <div class="h-full flex justify-center items-center">
    <div class="flex gap-2">
        <button class="h-fit w-fit p-2 relative rounded bg-white group dark:bg-green-600 dark:text-gray-300 dark:hover:bg-green-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="w-auto h-auto min-w-max py-2 px-4 absolute top-0 right-16 text-white bg-gray-900 rounded font-bold scale-0 group-hover:scale-100 transition-all duration-200">Download All Data</div>
        </button>
      <BaseBox class="w-fit max-w-[33vw] max-h-[70vh] relative gap-4 overflow-auto">
      <div 
            class="p-2 flex flex-col gap-2"
        >
          <div v-if="aInput.confirmedData.length <= 0">There is nothing here.</div>

          <TransitionGroup name="fade">
            <div 
                class="w-full relative p-4 flex justify-between items-center border-green-400 border rounded-lg hover:bg-green-50 dark:text-gray-100 dark:hover:bg-midnight-400 transition-all duration-200 cursor-pointer"
                v-for="confirmed in aInput.confirmedData" 
                :key="confirmed"
            >
              <div class="leading-8">
                <div>
                  <div 
                      class="
                        inline-flex items-center justify-center
                        mr-2 px-2.5 py-0.5 
                        bg-blue-100 
                        text-blue-800 text-xs font-semibold 
                        border border-blue-400 rounded 
                        dark:bg-gray-700 dark:text-blue-400 
                      "
                    > Table ID: {{ confirmed.table_id }}
                  </div>
                </div>
                <div><span class="font-mono font-bold">Question</span>: {{ confirmed.question }} </div>
                <div><span class="font-mono font-bold">Answer</span>: {{ confirmed.answer }} </div>
              </div>
              <button class="w-fit h-fit p-1 rounded-full hover:bg-slate-300 dark:hover:bg-midnight-100" @click="aInput.removeConfirmed(confirmed)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </TransitionGroup>
        </div>
      </BaseBox>
    </div>
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

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  scale: 0;
}

.fade-leave-active {
  position: absolute;
}


</style>
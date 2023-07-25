<template>
  <Transition name="fade">
    <BaseOverlay v-if="general_store.overlay.type == 'confirmed_list'">
      <div class="h-[80vh] flex gap-8 justify-center">
        <div
          class="w-[30vw] h-fit max-h-[80vh] p-2 flex flex-col bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-midnight-200 dark:border-zinc-800"
        >
          <div class="flex justify-between">
            <div class="mb-4 flex justify-center gap-4">
              <div 
                v-for="tab in tabs" :key="tab"
                class="
                  relative 
                  min-w-[20%] h-10 px-4 py-2 
                  flex justify-center items-center gap-2 
                  rounded-lg 
                  text-xs font-bold dark:text-gray-200
                "
                :class="{
                  'cursor-pointer hover:bg-gray-200 dark:hover:bg-midnight-100': tab.is_available,
                  'cursor-not-allowed': !tab.is_available,
                }"
                @click="change_tab(tab)"
              >
                <div v-html="tab.icon"></div>
                {{ tab.name }}
                <Transition name="fade">
                  <div 
                    v-if="tab.is_show"
                    class="absolute -bottom-1 w-1/2 h-[0.1em] bg-green-300 dark:bg-green-500 rounded-full"
                  ></div>
                </Transition>
              </div>
            </div>
            <div 
              class="
                relative 
                min-w-[20%] h-10 px-4 py-2 
                flex justify-center items-center gap-2 
                rounded-lg  
                text-xs font-bold dark:text-gray-200
                hover:bg-gray-200 dark:hover:bg-midnight-100
                cursor-pointer
              "
              @click="aInput.download_confirmed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"> 
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1-1.414 0l-6.586-6.586A1 1 0 0 1 5.414 12H9V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z"/> 
              </svg>
              Save
            </div>
          </div>
          <div class="h-full overflow-auto">
            <ul role="list" class="divide-y divide-gray-200 dark:divide-zinc-700">
              <TransitionGroup name="fade">
                <li 
                  class="mr-4 py-3 sm:py-4 hover:cursor-pointer" 
                  v-for="(confirmed, confirmed_index) in aInput.confirmedData"
                  :key="confirmed" 
                  @click="set_chosen_table(confirmed_index, confirmed.table_id)"
                >
                  <div class="flex items-center space-x-4">
                    <div class="flex-1 min-w-0">
                      <p 
                        class="text-sm font-medium text-gray-900 dark:text-white"
                        :class="{
                          'truncate': confirmed_index != displayed_confirmed_index,
                        }"
                      >
                        {{ confirmed.question }}
                      </p>
                      <p 
                        class="text-sm text-gray-500 dark:text-gray-400"
                        :class="{
                          'truncate': confirmed_index != displayed_confirmed_index,
                        }"
                      >
                        {{ confirmed.answer }}
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        Table {{ confirmed.table_id }}
                      </p>
                    </div>
                    <button class="p-2 inline-flex items-center rounded hover:bg-red-300 dark:hover:bg-red-700 text-base font-semibold text-gray-900 dark:text-white"
                      @click="aInput.removeConfirmed(confirmed)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </button>
                  </div>
                </li>
              </TransitionGroup>
            </ul>
          </div>
        </div>
        <TableDisplay class="max-w-[55vw]" :displayed_table_index="chosen_table"/>
      </div>
    </BaseOverlay>
  </Transition>
</template>

<script setup>
  import { useAnnotationInputStore } from '~/stores/annotationInput';
  import { useGeneralStore } from '~/stores/generalStore';
  const aInput = useAnnotationInputStore()
  const general_store = useGeneralStore()

  // TODO: Clean up this code, we don't really need chosen_table variable
  const chosen_table = ref(0)
  const displayed_confirmed_index = ref(0)
  function set_chosen_table(confirmed_index, index) {
    displayed_confirmed_index.value = confirmed_index
    chosen_table.value = index
  }

  const tabs = ref([
    {
      name: 'All',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4"/> </svg>',
      is_show: true,
      is_available: true, 
    },
    {
      name: 'Statistics',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"> <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M3 3v18h18"/> <path d="M7 9a2 2 0 1 0 4 0a2 2 0 1 0-4 0m10-2a2 2 0 1 0 4 0a2 2 0 1 0-4 0m-5 8a2 2 0 1 0 4 0a2 2 0 1 0-4 0m-1.84-4.38l2.34 2.88m2.588-.172l2.837-4.586"/> </g> </svg>',
      is_show: false,
      is_available: false, 
    },
  ])
  function change_tab(to_tab) {
    for (let tab of tabs.value) {
      tab.is_show = false
    }
    to_tab.is_show = true
  }
</script>
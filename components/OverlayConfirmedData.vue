<template>
  <Transition name="fade">
    <BaseOverlay 
      v-if="general_store.overlay.type == 'confirmed_list'"
      class="overflow-hidden"
    >
      <div class="h-[80vh] flex gap-8 justify-center animate-fade-up">
        <div
          class="w-[35vw] h-fit max-h-[80vh] p-2 flex flex-col bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-midnight-200 dark:border-zinc-800"
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
                  cursor-pointer
                "
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
            <ul v-if="tabs[0].is_show" role="list" class="divide-y divide-gray-200 dark:divide-zinc-700">
              <TransitionGroup name="fade">
                <li 
                  class="mr-4 py-3 sm:py-4 hover:cursor-pointer" 
                  v-for="(confirmed, confirmed_index) in aInput.confirmedData"
                  :key="confirmed" 
                  @click.prevent="set_chosen_table(confirmed_index)"
                >
                  <div class="flex items-center space-x-4">
                    <div class="flex-1 min-w-0">
                      <form
                        class="
                          py-2
                          flex flex-col gap-2 
                        "
                        v-if="confirmed_index == displayed_confirmed_index && confirmed == confirmed_is_editing" 
                      >
                        <input 
                          v-model="qa_after_edit['question']"
                          class="w-full p-2 rounded bg-gray-100 dark:bg-midnight-100 text-sm dark:text-gray-200"
                        />
                        <input 
                          v-model="qa_after_edit['answer']"
                          class="w-full p-2 rounded bg-gray-100 dark:bg-midnight-100 text-sm dark:text-gray-200"
                        />
                      </form>
                      <p 
                        v-if="confirmed_index != displayed_confirmed_index | confirmed != confirmed_is_editing"
                        class="text-sm font-medium text-gray-900 dark:text-gray-100"
                        :class="{
                          'truncate': confirmed_index != displayed_confirmed_index,
                        }"
                      >
                        {{ confirmed.question }}
                      </p>
                      <p 
                        v-if="confirmed_index != displayed_confirmed_index | confirmed != confirmed_is_editing"
                        class="text-sm text-gray-500 dark:text-gray-400"
                        :class="{
                          'truncate': confirmed_index != displayed_confirmed_index,
                        }"
                      >
                        {{ confirmed.answer }}
                      </p>
                      <p 
                        class="
                          mt-2 px-2 py-[2px] w-fit
                          rounded border border-green-500 dark:border-green-300
                          text-xs text-green-500 truncate dark:text-green-400
                        "
                      >
                        Table {{ confirmed.table_id }}
                      </p>
                    </div>
                    <button v-if="confirmed_index != displayed_confirmed_index" class="p-1 rounded dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-700">
                      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 20q-.825 0-1.413-.588T10 18q0-.825.588-1.413T12 16q.825 0 1.413.588T14 18q0 .825-.588 1.413T12 20Zm0-6q-.825 0-1.413-.588T10 12q0-.825.588-1.413T12 10q.825 0 1.413.588T14 12q0 .825-.588 1.413T12 14Zm0-6q-.825 0-1.413-.588T10 6q0-.825.588-1.413T12 4q.825 0 1.413.588T14 6q0 .825-.588 1.413T12 8Z"/>
                      </svg>
                    </button>
                    <div v-if="confirmed_index == displayed_confirmed_index">
                      <div 
                        v-if="confirmed_is_editing != confirmed"
                        class="flex flex-col gap-2"
                      >
                        <button class="p-1 inline-flex items-center rounded hover:bg-gray-300 dark:hover:bg-zinc-700 text-base font-semibold text-gray-900 dark:text-white"
                          @click="edit_confirmed(confirmed)"
                        >
                          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM4 21q-.425 0-.713-.288T3 20v-2.825q0-.2.075-.388t.225-.337l10.3-10.3l4.25 4.25l-10.3 10.3q-.15.15-.337.225T6.825 21H4Z"/>
                          </svg>
                        </button>
                        <button class="p-1 inline-flex items-center rounded hover:bg-red-300 dark:hover:bg-red-700 text-base font-semibold text-gray-900 dark:text-white"
                          @click="aInput.removeConfirmed(confirmed)"
                        >
                          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
                          </svg>
                        </button>
                      </div>
                      <div v-if="confirmed_is_editing == confirmed">
                        <button 
                          class="p-2 inline-flex items-center rounded hover:bg-green-300 dark:hover:bg-green-700 text-base font-semibold text-gray-900 dark:text-white"
                          @click="save_edit_confirmed()"
                        >

                          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41L9 16.17z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </TransitionGroup>
            </ul>
            <PieChart v-if="tabs[1].is_show" />
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

  const chosen_table = computed(() => {
    return aInput.confirmedData[displayed_confirmed_index.value].table_id
  })
  const displayed_confirmed_index = ref(0)
  function set_chosen_table(confirmed_index) {
    if (confirmed_index >= aInput.confirmedData.length) return
    displayed_confirmed_index.value = confirmed_index
  }

  const tabs = ref([
    {
      name: 'All',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4"/> </svg>',
      is_show: true,
    },
    {
      name: 'Statistics',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"> <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M3 3v18h18"/> <path d="M7 9a2 2 0 1 0 4 0a2 2 0 1 0-4 0m10-2a2 2 0 1 0 4 0a2 2 0 1 0-4 0m-5 8a2 2 0 1 0 4 0a2 2 0 1 0-4 0m-1.84-4.38l2.34 2.88m2.588-.172l2.837-4.586"/> </g> </svg>',
      is_show: false,
    },
  ])
  function change_tab(to_tab) {
    for (let tab of tabs.value) {
      tab.is_show = false
    }
    to_tab.is_show = true
  }

  const confirmed_is_editing = ref(null)
  const qa_after_edit = ref(null)
  function edit_confirmed(confirmed) {
    confirmed_is_editing.value = confirmed
    qa_after_edit.value = {
      'question': (confirmed_is_editing.value) ? confirmed_is_editing.value['question'] : null,
      'answer': (confirmed_is_editing.value) ? confirmed_is_editing.value['answer'] : null,
    }
  }
  function save_edit_confirmed() {
    confirmed_is_editing.value['question'] = qa_after_edit.value['question']
    confirmed_is_editing.value['answer'] = qa_after_edit.value['answer']
    aInput.update_confirmed(confirmed_is_editing.value)
    confirmed_is_editing.value = null
    qa_after_edit.value = null
  }
  watch(aInput.confirmedData, () => {
    set_chosen_table(0)
  })
  watch(displayed_confirmed_index, () => {
    edit_confirmed(null)
  })
</script>
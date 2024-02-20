<script setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const props = defineProps({
  table_list: Array,
  qa_list: Array,
  prevent_update_question: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(
    [
        'save:qa_list', 'download:qa_list',
        'update:state',
    ]
)

const tabs = ref({
  all: {
    id: 1,
    label: "All",
    icon: 'i-heroicons-archive-box',
  },
  stats: {
    id: 2,
    label: "Statistics",
    icon: 'i-heroicons-information-circle',
  },
});

const state = reactive({
  current_table_id: null,
  current_qa_index: null,
});

const filter_confirmed = computed(() => {
  return props.qa_list;
});

function set_chosen_qa(index) {
  if (index >= filter_confirmed.value.length) return;
  state.current_qa_index = index;
  state.current_table_id = props.qa_list[index].table_id;
  emit('update:state', state);
}

onBeforeMount(() => {
  state.current_qa_index = 0;
  state.current_table_id = props.qa_list[0].table_id;
})

</script>

<template>
  <div class="w-[90vw]">
    <TabGroup as="div" class="flex gap-4">

      <BaseBox :override_bg="true" class="p-4">
        <TabPanels as="div" class="w-[35vw] min-w-[35vw] flex flex-1 flex-col gap-4">
          <div class="flex items-center gap-2">
            <TabList
                as="div"
                class="grow flex space-x-1 rounded-xl bg-gray-300 p-1 dark:bg-zinc-700/20"
            >
              <Tab
                  v-for="tab in Object.keys(tabs)"
                  as="template"
                  :key="tab"
                  v-slot="{ selected }"
              >
                <button
                    :class="[
                  'flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm leading-5',
                  'ring-0 ring-opacity-60 focus:outline-none',
                  selected
                    ? 'bg-white font-bold text-green-400 shadow dark:bg-midnight-200 dark:text-green-500'
                    : 'text-midnight-100 hover:bg-white/[0.12] dark:text-gray-300',
                ]"
                >
                  <UIcon class="text-xl" :name="tabs[tab].icon" />
                  <span class="text-sm">{{ tabs[tab].label }}</span>
                </button>
              </Tab>
            </TabList>
            <div class="self-stretch">
              <UTooltip class="h-full" :text="`Download File`">
                <UButton @click="emit('download:qa_list')">
                  <UIcon name="i-heroicons-arrow-down-tray" />
                </UButton>
              </UTooltip>
            </div>
          </div>
          <slot name="filter">
            Filter goes here...
          </slot>
          <TabPanel tabindex="-1" as="div" class="flex flex-1 flex-col">
            <div class="flex items-center justify-between gap-8">
              <ul
                role="list"
                class="w-full h-[75vh] divide-y divide-gray-200 dark:divide-zinc-700 overflow-y-auto"
              >
                <TransitionGroup name="fade">
                  <li
                    class="px-4 flex justify-between items-center"
                    v-for="(qa, qa_index) in filter_confirmed"
                    :key="qa_index"
                    @click.prevent="set_chosen_qa(qa_index)"
                  >
                    <div
                        class="grow mr-4 py-3 flex flex-col gap-2 hover:cursor-pointer sm:py-4"
                    >
                      <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-question-mark-circle" class="text-md shrink-0" />
                        <UInput
                            v-if="!props.prevent_update_question && qa_index === state.current_qa_index"
                            v-model="qa.question"
                            class="w-full self-stretch"
                            :ui="{ color: { white: { outline: 'bg-transparent dark:bg-transparent' } } }"
                        />
                        <span
                            v-else
                            class="text-sm font-normal text-midnight-100 dark:text-gray-200"
                            :class="{
                              'text-midnight-200 dark:text-zinc-700': qa.question === '',
                              'text-midnight-200 dark:text-green-300': qa.question !== '' && qa_index === state.current_qa_index,
                            }"
                        >
                          {{ qa.question }}
                        </span>
                      </div>
                      <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-chat-bubble-bottom-center" class="text-md shrink-0" />
                        <UInput
                          v-if="qa_index === state.current_qa_index"
                          v-model="qa.answer"
                          class="w-full self-stretch"
                          :ui="{ color: { white: { outline: 'bg-transparent dark:bg-transparent' } } }"
                        />
                        <span
                          v-else
                          class="text-sm font-normal text-midnight-100 dark:text-gray-200"
                          :class="{
                              'text-midnight-200 dark:text-zinc-700': qa.answer === '',
                              'text-midnight-200 dark:text-green-300': qa.answer !== '' && qa_index === state.current_qa_index,
                            }"
                        >
                          {{ qa.answer ? qa.answer : 'No Answer' }}
                        </span>
                      </div>
                    </div>
                    <slot
                        v-if="qa_index === state.current_qa_index"
                        name="edit_functions">
                      <div>
                        <UIcon name="i-heroicons-pencil" class="text-sm" />
                      </div>
                    </slot>

                  </li>
                </TransitionGroup>
              </ul>
            </div>

          </TabPanel>

          <TabPanel>
            <slot name="statistics">
              Nothing Here...
            </slot>
          </TabPanel>

        </TabPanels>
      </BaseBox>

      <HTMLTable
          class="grow-1"
          v-if="state.current_table_id != null"
          :table_data="props.table_list[state.current_table_id].table_html" />
    </TabGroup>
  </div>
</template>
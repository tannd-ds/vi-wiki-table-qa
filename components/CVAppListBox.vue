<!--This is duplicated from AppListBox, sorry for this.
This need to be optimized later-->
<template>
  <Listbox as="div" v-model="selected">
    <div class="relative mt-2">
      <ListboxButton
        id="listbox-btn"
        class="relative w-full ring-1 ring-green-500 cursor-pointer rounded-md bg-gray-100 py-1.5 pl-1 pr-10 text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-midnight-200 dark:text-gray-200 sm:text-sm sm:leading-8"
      >
        <span class="flex items-center">
          <span class="ml-3 block truncate">{{ selected.name }}</span>
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />
        </span>
      </ListboxButton>

      <div class="relative mt-2 flex gap-2">
        <UButton
            class="grow"
            @click="prev_question">
          <UIcon name="i-heroicons-chevron-left" />
          <span>Previous Question</span>
        </UButton>
        <UButton
            class="grow"
            @click="next_question">
          <span>Next Question</span>
          <UIcon name="i-heroicons-chevron-right" />
        </UButton>
      </div>
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-300 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 max-h-56 w-full divide-y-[1px] divide-gray-100 overflow-auto rounded-md border bg-white py-1 text-base ring-black ring-opacity-5 focus:outline-none dark:divide-zinc-700 dark:border-zinc-700 dark:bg-midnight-100 sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="item in data"
            :key="item.id"
            :value="item"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active
                  ? 'bg-green-200 dark:bg-midnight-200 dark:text-gray-200'
                  : 'text-gray-900 dark:text-gray-200',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <div class="flex items-center">
                <span
                  v-if="!cv_store.is_answer_empty(item.id)"
                  class="text-green-500"
                >
                  <UIcon name="i-heroicons-check" />
                </span>
                <span
                  :class="[
                    selected ? 'font-semibold' : 'font-normal',
                    'ml-3 block truncate',
                  ]"
                  >{{ item.name }}</span
                >
              </div>

              <span
                v-if="selected"
                :class="[
                  active
                    ? 'text-midnight-100  dark:text-green-500'
                    : 'text-green-500',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
<!--                <CheckIcon class="h-5 w-5" aria-hidden="true" />-->
                <UIcon name="i-heroicons-at-symbol" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>

const props = defineProps({
  data: Object,
});

const cv_store = useCrossValidationStore();
const anno_file = cv_store.all_data['cv_anno_file'];
const cross_file = cv_store.all_data['cv_cross_file'];

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const selected = ref(props.data[0]);

// aInput.setCurrentTableID(selected.value.id);
watch(selected, () => {
  let selected_qa = cross_file.data[selected.value.id];
  let selected_table_id = selected_qa.table_id;
  cv_store.set_current_display_question(selected.value.id);
  cv_store.set_current_display_table(selected_table_id);
});

function next_question() {
  cv_store.next_display_question();
  let current_question = cv_store.current_display_question_index;
  selected.value = props.data[current_question];
}

function prev_question() {
  cv_store.prev_display_question();
  let current_question = cv_store.current_display_question_index;
  selected.value = props.data[current_question];
}

</script>

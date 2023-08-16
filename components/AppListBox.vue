<template>
  <Listbox as="div" v-model="selected">
    <div class="relative mt-2">
      <ListboxButton
        class="relative w-full cursor-pointer rounded-md bg-gray-100 py-1.5 pl-1 pr-10 text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-midnight-200 dark:text-gray-200 sm:text-sm sm:leading-8"
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

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 max-h-56 w-full divide-y-[1px] divide-gray-100 overflow-auto rounded-md border bg-white py-1 text-base ring-black ring-opacity-5 focus:outline-none dark:divide-zinc-700 dark:border-zinc-700 dark:bg-midnight-200 sm:text-sm"
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
                  ? 'bg-green-200 dark:bg-green-500'
                  : 'text-gray-900 dark:text-gray-200',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <div class="flex items-center">
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
                    ? 'text-midnight-100  dark:text-white'
                    : 'text-green-500',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
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
import { useAnnotationInputStore } from "~/stores/annotationInput";
const aInput = useAnnotationInputStore();
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const selected = ref(props.data[0]);
watch(selected, () => {
  aInput.setCurrentTableID(selected.value.id);
});
</script>

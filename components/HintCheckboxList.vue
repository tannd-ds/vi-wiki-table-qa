<template>
  <ul class="flex list-none flex-col gap-2 overflow-auto px-4">
    <li v-for="(hint, hint_index) in displayed_hints" :key="hint">
      <!-- NOTE: The v-if below just to make sure the app still works properly
      After removing a Hint from Hint List. Remove this if not needed. -->
      <div
        v-if="hint_index < hints.all_hints.length"
        :class="[
          addition_info[hint_index].checked_percent >= RED_THRESHOLD
            ? 'opacity-50'
            : 'hover:bg-gray-100 dark:hover:bg-midnight-200',
          {
            'border-green-500 pr-2 dark:border-green-600': hint.is_checked,
            'border-gray-300 dark:border-zinc-700': !hint.is_checked,
          },
          'relative flex items-center gap-2 rounded border px-4 transition-all duration-200 ',
        ]"
      >
        <input
          :disabled="addition_info[hint_index].checked_percent >= RED_THRESHOLD"
          :id="getCheckboxID(hint_index, aInput.current_table_index)"
          class="peer flex aspect-square h-4 appearance-none items-center justify-center rounded text-green-600 outline-2 outline-offset-2 focus:outline-green-300 disabled:cursor-not-allowed dark:outline-none dark:focus:outline-green-500"
          :class="{
            'bg-green-300 dark:border-none dark:bg-green-500': hint.is_checked,
            'border-gray-300 bg-gray-100 dark:border-zinc-700 dark:bg-zinc-700':
              !hint.is_checked,
          }"
          type="checkbox"
          value=""
          v-model="hint.is_checked"
        />
        <div
          class="absolute hidden h-4 w-4 items-center justify-center opacity-0 transition-all peer-checked:flex peer-checked:opacity-100"
          @click="hint.is_checked = !hint.is_checked"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="6"
            stroke="currentColor"
            class="h-2 w-2 dark:text-green-900"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <label
          :for="getCheckboxID(hint_index, aInput.current_table_index)"
          class="ml-2 w-full space-y-2 py-4 text-sm font-medium text-midnight-100 peer-disabled:cursor-not-allowed dark:text-gray-200"
        >
          <div>{{ hint.content }}</div>
          <div v-if="verbose" class="text-md font-normal">
            Used:
            <span
              :class="[
                addition_info[hint_index].checked_percent < YELLOW_THRESHOLD
                  ? 'text-green-500'
                  : addition_info[hint_index].checked_percent < RED_THRESHOLD
                  ? 'text-yellow-500'
                  : 'text-red-500',
              ]"
            >
              {{
                Math.round(addition_info[hint_index].checked_percent * 100) /
                100
              }}%
            </span>
          </div>
        </label>
      </div>
    </li>
  </ul>
</template>

<script setup>
import {useHintStore} from "../stores/hintStore";

const aInput = useAnnotationInputStore();
const hints = useHintStore()

const props = defineProps({
  n_displayed: {
    type: Number,
    default: 3,
  },
  verbose: {
    type: Boolean,
    default: false,
  },
});

const RED_THRESHOLD = 25;
const YELLOW_THRESHOLD = 15;

const current_table_confirmed = computed(() => {
  return aInput.confirmedData.filter(
    (confirmed) => confirmed.table_id == aInput.current_table_index,
  );
});
const displayed_hints = computed(() => {
  console.log(hints["hint_set"])
  return hints.hint_set[aInput.current_table_index].slice(0, props.n_displayed);
});
const addition_info = computed(() => {
  let addition = [];
  const hint_list = displayed_hints.value;
  for (let i = 0; i < hint_list.length; i++) {
    let percentage = 0;
    if (current_table_confirmed.value.length > 0) {
      percentage =
        (hint_list[i].checked_count / current_table_confirmed.value.length) *
        100;
    }
    addition.push({
      content: hints.all_hints[hint_list[i].hint_index],
      checked_percent: percentage,
    });
  }
  return addition;
});
function getCheckboxID(hint_id, table_id) {
  return "h" + hint_id + "_t" + table_id;
}
</script>

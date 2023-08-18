<template>
  <div
    class="relative flex h-fit max-h-[80vh] flex-col rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-zinc-800 dark:bg-midnight-100 sm:p-8 lg:w-[35vw]"
  >
    <div
      class="absolute right-4 top-4 cursor-pointer rounded p-2 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-zinc-700"
      @click="general_store.close_overlay()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    <div class="flex items-center gap-4 p-4 text-2xl font-bold dark:text-white">
      <div
        class="rounded bg-yellow-300 p-2 text-yellow-600 dark:bg-yellow-500 dark:text-yellow-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-dasharray="46"
            stroke-dashoffset="46"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 17H9V14.1973C7.2066 13.1599 6 11.2208 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9C18 11.2208 16.7934 13.1599 15 14.1973V17z"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.4s"
              values="46;0"
            />
          </path>
          <rect width="6" height="0" x="9" y="20" fill="currentColor" rx="1">
            <animate
              fill="freeze"
              attributeName="height"
              begin="0.5s"
              dur="0.2s"
              values="0;2"
            />
          </rect>
        </svg>
      </div>
      <div>
        <div>All Hints</div>
        <div class="text-sm font-normal text-gray-700 dark:text-gray-500">
          Every Hints possible
        </div>
      </div>
    </div>

    <ul class="flex list-none flex-col gap-2 overflow-auto px-4">
      <li v-for="(hint, hint_index) in displayed_hints" :key="hint">
        <div
          class="relative flex items-center gap-2 rounded border px-4 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-midnight-200"
          :class="{
            'border border-green-500 pr-2 dark:border-green-600':
              hint.is_checked,
            'border-gray-300 dark:border-zinc-700': !hint.is_checked,
          }"
        >
          <input
            :disabled="
              addition_info[hint_index].checked_percent >= RED_THRESHHOLD
            "
            :id="getCheckboxID(hint_index, aInput.current_table_index)"
            class="peer flex aspect-square h-4 appearance-none items-center justify-center rounded border text-green-600 outline-2 outline-offset-2 focus:outline-green-300 disabled:cursor-not-allowed dark:outline-none dark:focus:outline-green-500"
            :class="{
              'bg-green-300 dark:border-none dark:bg-green-500':
                hint.is_checked,
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
            <div>
              {{ addition_info[hint_index].content }}
            </div>
            <div class="text-md font-normal">
              Used:
              <span
                :class="[
                  addition_info[hint_index].checked_percent < YELLOW_THRESHHOLD
                    ? 'text-green-500'
                    : addition_info[hint_index].checked_percent < RED_THRESHHOLD
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
  </div>
</template>

<script setup>
const aInput = useAnnotationInputStore();
const general_store = useGeneralStore();

const RED_THRESHHOLD = 25;
const YELLOW_THRESHHOLD = 15;

const current_table_confirmed = computed(() => {
  return aInput.confirmedData.filter(
    (confirmed) => confirmed.table_id == aInput.current_table_index,
  );
});
const displayed_hints = computed(() => {
  return aInput.hints["current_hints_set"][aInput.current_table_index];
});
const addition_info = computed(() => {
  let addition = [];
  const hint_list = displayed_hints.value;
  for (let i = 0; i < hint_list.length; i++) {
    let percentage = 0;
    if (aInput.confirmedData.length > 0) {
      percentage =
        (hint_list[i].checked_count / current_table_confirmed.value.length) *
        100;
    }
    addition.push({
      content: aInput.hints["all_hints"][hint_list[i].hint_index],
      checked_percent: percentage,
    });
  }
  return addition;
});
function getCheckboxID(hint_id, table_id) {
  return "h" + hint_id + "_t" + table_id;
}
</script>

<template>
  <BaseBox :override_bg="true" class="border-2 border-yellow-500">
    <div class="relative h-full w-full">
      <div
        class="flex items-center justify-center gap-4 rounded-t-xl bg-yellow-500 px-2 py-4 font-bold text-midnight-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-8 w-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
        <p class="text-center font-bold">
          Your QA must meet ONE OF THESE CRITERIA
        </p>
      </div>
      <div
        class="rounded-2xl p-4 leading-8 dark:bg-midnight-100 dark:text-gray-300"
      >
        <ul class="flex list-none flex-col gap-2 px-4">
          <li v-for="(hint, hint_index) in displayed_hints" :key="hint">
            <div
              class="flex items-center gap-2 rounded border px-4 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-midnight-200"
              :class="{
                'border-r-8 border-green-500 pr-2 dark:border-r-green-600':
                  hint.is_checked,
                'border-gray-300 dark:border-zinc-700': !hint.is_checked,
              }"
            >
              <input
                :id="getCheckboxID(hint_index, aInput.current_table_index)"
                class="peer flex aspect-square h-4 appearance-none items-center justify-center rounded border text-green-600 outline-2 outline-offset-2 focus:outline-green-300 dark:outline-none dark:focus:outline-green-500"
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
                class="absolute flex h-4 w-4 items-center justify-center opacity-0 transition-all peer-checked:opacity-100"
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
                class="ml-2 w-full py-4 text-sm font-medium text-midnight-100 dark:text-gray-200"
              >
                {{ aInput.hints["all_hints"][hint["hint_index"]] }}
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </BaseBox>
</template>

<script setup>
const aInput = useAnnotationInputStore();

const displayed_hints = computed(() => {
  return aInput.hints["current_hints_set"][aInput.current_table_index].slice(
    0,
    aInput.hints["n_displayed_hints"],
  );
});

function getCheckboxID(hint_id, table_id) {
  return "h" + hint_id + "_t" + table_id;
}
</script>

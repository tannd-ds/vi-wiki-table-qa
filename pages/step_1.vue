<template>
  <div class="flex h-full">
    <Head>
      <Title>ViWiki Table</Title>
    </Head>
    <div
      class="flex w-[90vw] flex-col items-center justify-center gap-2 lg:w-full lg:flex-row lg:gap-8"
    >
      <div class="w-full max-w-lg">
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
                <li
                  v-for="(hint, hint_index) in aInput.hints[
                    'current_hints_set'
                  ][aInput.current_table_index].slice(
                    0,
                    aInput.hints['n_displayed_hints'],
                  )"
                  :key="hint"
                >
                  <div
                    class="flex items-center gap-2 rounded border px-4 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-midnight-200"
                    :class="{
                      'border-r-8 border-green-500 pr-2 dark:border-r-green-600':
                        hint.is_checked,
                      'border-gray-300 dark:border-zinc-700': !hint.is_checked,
                    }"
                  >
                    <input
                      hidden
                      :id="
                        getCheckboxID(hint_index, aInput.current_table_index)
                      "
                      type="checkbox"
                      value=""
                      v-model="hint.is_checked"
                    />
                    <div
                      class="flex h-4 w-4 items-center justify-center rounded border text-green-600"
                      :class="{
                        'bg-green-300 dark:border-none dark:bg-green-500':
                          hint.is_checked,
                        'border-gray-300 bg-gray-100 dark:border-zinc-700 dark:bg-zinc-700':
                          !hint.is_checked,
                      }"
                      @click="hint.is_checked = !hint.is_checked"
                    >
                      <Transition name="fade">
                        <svg
                          v-if="hint.is_checked"
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
                      </Transition>
                    </div>
                    <label
                      :for="
                        getCheckboxID(hint_index, aInput.current_table_index)
                      "
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
        <BaseBox class="flex-col">
          <form class="w-full">
            <div class="relative">
              <InputField
                is="div"
                @click="table_dropdown_is_open = !table_dropdown_is_open"
                ref="table_dropdown_modal"
              >
                <div class="flex items-center justify-between">
                  <div>Table {{ aInput.current_table_index }}</div>
                  <svg
                    class="ml-2.5 h-2.5 w-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </div>
              </InputField>
              <Transition name="fade">
                <div
                  v-if="table_dropdown_is_open"
                  class="absolute -bottom-full z-10 w-full rounded-lg border-2 border-green-700 bg-white shadow dark:bg-midnight-100"
                >
                  <ul
                    class="divide-y text-sm text-midnight-100 dark:divide-zinc-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li
                      v-for="(data, table_index) in aInput.anno_file_data"
                      key="table_index"
                      @click="choose_table(table_index)"
                      class="flex cursor-pointer items-center justify-between px-4 py-2 hover:rounded-lg hover:bg-gray-100 dark:hover:bg-midnight-200 dark:hover:text-green-500"
                    >
                      <div>Table {{ table_index }}</div>
                      <div
                        v-if="aInput.current_table_index == table_index"
                        class="text-green-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </div>
                    </li>
                  </ul>
                </div>
              </Transition>
            </div>
            <InputField
              type="text"
              id="question"
              v-model:model-value="aInput.question"
              placeholder="Give me a Question!"
              label_name="Question"
            />
            <InputField
              type="text"
              id="answer"
              v-model:model-value="aInput.answer"
              placeholder="Answer, please"
              label_name="Answer"
            />
            <div class="flex items-center justify-center lg:justify-between">
              <BaseButton @click="aInput.confirmData">Confirm</BaseButton>
            </div>
          </form>
        </BaseBox>
      </div>
      <div class="flex flex-col">
        <TableDisplay />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});

import { useAnnotationInputStore } from "~/stores/annotationInput";
import { useGeneralStore } from "~/stores/generalStore";
import { onClickOutside } from "@vueuse/core";

const aInput = useAnnotationInputStore();
const general_store = useGeneralStore();

const route = useRoute();
const router = useRouter();
watchEffect(() => {
  const redirect_to = general_store.check_step(route.name);
  if (redirect_to != route.name) router.push(redirect_to);
});

const table_dropdown_modal = ref(null);
const table_dropdown_is_open = ref(false);

onClickOutside(
  table_dropdown_modal,
  (event) => (table_dropdown_is_open.value = false),
);

function choose_table(table_index) {
  aInput.setCurrentTableID(table_index);
  table_dropdown_is_open.value = false;
}

function getCheckboxID(hint_id, table_id) {
  return "h" + hint_id + "_t" + table_id;
}
</script>

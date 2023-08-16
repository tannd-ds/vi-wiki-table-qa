<template>
  <div class="flex h-full">
    <Head>
      <Title>ViWiki Table</Title>
    </Head>
    <div
      class="flex w-[90vw] flex-col items-center justify-center gap-2 lg:w-full lg:flex-row lg:gap-8"
    >
      <div class="w-full max-w-lg">
        <Hint />
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
</script>

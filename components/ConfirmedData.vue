<template>
  <div class="overflow-hidden">
    <div class="flex h-[80vh] flex-col gap-8 lg:flex-row lg:justify-center">
      <div
        class="flex h-fit max-h-[80vh] flex-col rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-zinc-800 dark:bg-midnight-200 sm:p-8 lg:w-[35vw]"
      >
        <div class="flex justify-between">
          <div class="mb-4 flex justify-center gap-4">
            <div
              v-for="tab in tabs"
              :key="tab"
              class="relative flex h-10 min-w-[20%] cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-bold dark:text-gray-200"
              @click="change_tab(tab)"
            >
              <div v-html="tab.icon"></div>
              {{ tab.name }}
              <Transition name="fade">
                <div
                  v-if="tab.is_show"
                  class="absolute -bottom-1 h-[0.1em] w-1/2 rounded-full bg-green-300 dark:bg-green-500"
                ></div>
              </Transition>
            </div>
          </div>
          <div
            class="relative flex h-10 min-w-[20%] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-gray-300 text-xs font-bold dark:border-zinc-700 dark:text-gray-200"
          >
            <div
              class="flex h-full w-4/5 items-center justify-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-midnight-100"
              @click="aInput.download_confirmed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1-1.414 0l-6.586-6.586A1 1 0 0 1 5.414 12H9V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z"
                />
              </svg>
              Save
            </div>
            <div
              class="flex h-full w-1/5 items-center justify-center hover:bg-gray-200 dark:hover:bg-midnight-100"
              @click="aInput.download_as_confirmed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </div>
          </div>
        </div>
        <ul v-if="tabs[0].is_show" class="my-3 flex gap-2 dark:text-gray-200">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
          </li>
          <li
            v-for="(show_table, show_table_index) in confirmed_table_is_show"
            :key="show_table_index"
            class="flex h-full min-h-[2em] min-w-[2em] cursor-pointer items-center justify-center rounded border border-gray-200 px-2 text-xs dark:border-zinc-700"
            :class="[
              confirmed_table_is_show[show_table_index]
                ? 'bg-green-300 hover:bg-green-200 dark:bg-green-600 dark:text-midnight-100 dark:hover:bg-green-500'
                : 'hover:bg-gray-100 dark:text-zinc-500 dark:hover:bg-zinc-700',
            ]"
            @click.exact="toggle_show_table(show_table_index)"
            @click.ctrl.exact="toggle_show_table_only(show_table_index)"
          >
            <UTooltip :text="`Table ${show_table_index}. Ctrl + Click to show this Table only`" :popper="{ arrow: false }">
              {{ show_table_index }}
            </UTooltip>
          </li>
        </ul>
        <div class="h-full overflow-auto">
          <ul
            v-if="tabs[0].is_show"
            role="list"
            class="divide-y divide-gray-200 dark:divide-zinc-700"
          >
            <TransitionGroup name="fade">
              <li
                class="mr-4 py-3 hover:cursor-pointer sm:py-4"
                v-for="(confirmed, confirmed_index) in filter_confirmed"
                :key="confirmed"
                @click.prevent="set_chosen_table(confirmed_index)"
              >
                <div class="flex items-center space-x-4">
                  <div class="min-w-0 flex-1">
                    <form
                      class="flex flex-col gap-2 py-2"
                      v-if="
                        confirmed_index == displayed_confirmed_index &&
                        confirmed == confirmed_is_editing
                      "
                    >
                      <input
                        v-model="qa_after_edit['question']"
                        class="w-full rounded bg-gray-100 p-2 text-sm dark:bg-midnight-100 dark:text-gray-200"
                      />
                      <input
                        v-model="qa_after_edit['answer']"
                        class="w-full rounded bg-gray-100 p-2 text-sm dark:bg-midnight-100 dark:text-gray-200"
                      />
                    </form>
                    <p
                      v-if="
                        (confirmed_index != displayed_confirmed_index) |
                          (confirmed != confirmed_is_editing)
                      "
                      class="text-sm font-medium text-midnight-100 dark:text-gray-200"
                      :class="{
                        truncate: confirmed_index != displayed_confirmed_index,
                      }"
                    >
                      {{ confirmed.question }}
                    </p>
                    <p
                      v-if="
                        (confirmed_index != displayed_confirmed_index) |
                          (confirmed != confirmed_is_editing)
                      "
                      class="text-sm text-gray-500 dark:text-gray-400"
                      :class="{
                        truncate: confirmed_index != displayed_confirmed_index,
                      }"
                    >
                      {{ confirmed.answer }}
                    </p>
                    <p
                      class="mt-2 w-fit truncate rounded border border-green-500 px-2 py-[2px] text-xs text-green-500 dark:border-green-300 dark:text-green-400"
                    >
                      Table {{ confirmed.table_id }}
                    </p>
                  </div>
                  <button
                    v-if="confirmed_index != displayed_confirmed_index"
                    class="rounded p-1 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-zinc-700"
                  >
                    <svg
                      class="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 20q-.825 0-1.413-.588T10 18q0-.825.588-1.413T12 16q.825 0 1.413.588T14 18q0 .825-.588 1.413T12 20Zm0-6q-.825 0-1.413-.588T10 12q0-.825.588-1.413T12 10q.825 0 1.413.588T14 12q0 .825-.588 1.413T12 14Zm0-6q-.825 0-1.413-.588T10 6q0-.825.588-1.413T12 4q.825 0 1.413.588T14 6q0 .825-.588 1.413T12 8Z"
                      />
                    </svg>
                  </button>
                  <div v-if="confirmed_index == displayed_confirmed_index">
                    <div
                      v-if="confirmed_is_editing != confirmed"
                      class="flex flex-col gap-2"
                    >
                      <button
                        class="inline-flex items-center rounded p-1 text-base font-semibold text-midnight-100 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-zinc-700"
                        @click="edit_confirmed(confirmed)"
                      >
                        <svg
                          class="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM4 21q-.425 0-.713-.288T3 20v-2.825q0-.2.075-.388t.225-.337l10.3-10.3l4.25 4.25l-10.3 10.3q-.15.15-.337.225T6.825 21H4Z"
                          />
                        </svg>
                      </button>
                      <button
                        class="inline-flex items-center rounded p-1 text-base font-semibold text-midnight-100 hover:bg-red-300 dark:text-gray-200 dark:hover:bg-red-700"
                        @click="aInput.removeConfirmed(confirmed)"
                      >
                        <svg
                          class="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
                          />
                        </svg>
                      </button>
                    </div>
                    <div v-if="confirmed_is_editing == confirmed">
                      <button
                        class="inline-flex items-center rounded p-2 text-base font-semibold text-midnight-100 hover:bg-green-300 dark:text-gray-200 dark:hover:bg-green-700"
                        @click="save_edit_confirmed()"
                      >
                        <svg
                          class="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41L9 16.17z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </TransitionGroup>
          </ul>
          <div class="flex flex-col gap-8" v-if="tabs[1].is_show">
            <PieChart />
            <div class="flex w-full justify-around px-4 dark:text-gray-200">
              <div>
                <div class="text-4xl">
                  <span v-if="aInput.anno_file_data.length < 10">0</span>
                  <span>{{ aInput.anno_file_data.length }}</span>
                </div>
                <div class="text-gray-500">Tables</div>
              </div>
              <div>
                <div class="text-4xl">
                  <span v-if="aInput.confirmedData.length < 10">0</span>
                  <span>{{ aInput.confirmedData.length }}</span>
                </div>
                <div class="text-gray-500">Pairs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HTMLTable
        v-if="chosen_table != null"
        :table_data="aInput.getTableHTMLFromIndex(chosen_table)"
      />
    </div>
  </div>
</template>

<script setup>
const aInput = useAnnotationInputStore();

const displayed_confirmed_index = ref(0);
const chosen_table = computed(() => {
  if (filter_confirmed.value.length == 0) return null;
  return filter_confirmed.value[displayed_confirmed_index.value].table_id;
});
function set_chosen_table(confirmed_index) {
  if (confirmed_index >= aInput.confirmedData.length) return;
  displayed_confirmed_index.value = confirmed_index;
}

const tabs = ref([
  {
    name: "All",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4"/> </svg>',
    is_show: true,
  },
  {
    name: "Statistics",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"> <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M3 3v18h18"/> <path d="M7 9a2 2 0 1 0 4 0a2 2 0 1 0-4 0m10-2a2 2 0 1 0 4 0a2 2 0 1 0-4 0m-5 8a2 2 0 1 0 4 0a2 2 0 1 0-4 0m-1.84-4.38l2.34 2.88m2.588-.172l2.837-4.586"/> </g> </svg>',
    is_show: false,
  },
]);
function change_tab(to_tab) {
  for (let tab of tabs.value) {
    tab.is_show = false;
  }
  to_tab.is_show = true;
}

const confirmed_is_editing = ref(null);
const qa_after_edit = ref(null);

const confirmed_table_is_show = ref([]);
for (let i = 0; i < aInput.anno_file_data.length; i++) {
  confirmed_table_is_show.value.push(true);
}
const filter_confirmed = computed(() => {
  return aInput.confirmedData.filter(
    (confirmed) => confirmed_table_is_show.value[confirmed.table_id],
  );
});

function toggle_show_table(table_index) {
  confirmed_table_is_show.value[table_index] =
    !confirmed_table_is_show.value[table_index];
}
function toggle_show_table_only(table_index) {
  for (let i = 0; i < confirmed_table_is_show.value.length; i++)
    confirmed_table_is_show.value[i] = false;
  confirmed_table_is_show.value[table_index] = true;
}

function edit_confirmed(confirmed) {
  confirmed_is_editing.value = confirmed;
  qa_after_edit.value = {
    question: confirmed_is_editing.value
      ? confirmed_is_editing.value["question"]
      : null,
    answer: confirmed_is_editing.value
      ? confirmed_is_editing.value["answer"]
      : null,
  };
}
function save_edit_confirmed() {
  confirmed_is_editing.value["question"] = qa_after_edit.value["question"];
  confirmed_is_editing.value["answer"] = qa_after_edit.value["answer"];
  aInput.update_confirmed(confirmed_is_editing.value);
  confirmed_is_editing.value = null;
  qa_after_edit.value = null;
}
watch(aInput.confirmedData, () => {
  set_chosen_table(0);
});
watch(displayed_confirmed_index, () => {
  edit_confirmed(null);
});
</script>

<template>
  <div class="flex h-[90vh] gap-2">
    <AppDropzone
      v-if="!validation.is_valid_confirmed_file"
      id="confirmed_dropzone"
      :data="validation.confirmed_file"
      :init-state="validation.is_valid_confirmed_file"
      @update-file="(content) => validation.update_confirmed_file(content)"
      class="min-h-[50vh] min-w-[30vw]"
    >
      <template #default> demo_done.json </template>
      <template #uploaded
        >{{ validation.confirmed_file.name }} uploaded</template
      >
    </AppDropzone>
    <AppDropzone
      v-if="!validation.is_valid_anno_file"
      id="anno_dropzone"
      :data="validation.anno_file"
      :init-state="validation.is_valid_anno_file"
      @update-file="(content) => validation.update_anno_file(content)"
      class="min-h-[50vh] min-w-[30vw]"
    >
      <template #default> demo.json </template>
      <template #uploaded>{{ validation.anno_file.name }} uploaded</template>
    </AppDropzone>

    <Popover class="absolute left-2 top-2 flex items-start">
      <PopoverButton
        tabindex="-1"
        class="bottom-0 right-0 cursor-pointer rounded p-2 outline-none hover:bg-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-zinc-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          class="h-8 w-8 rotate-90"
        >
          <path
            fill="currentColor"
            d="M128 20a108 108 0 1 0 108 108A108.12 108.12 0 0 0 128 20Zm0 192a84 84 0 1 1 84-84a84.09 84.09 0 0 1-84 84Zm48.49-76.49a12 12 0 0 1-17 17L128 121l-31.51 31.49a12 12 0 0 1-17-17l40-40a12 12 0 0 1 17 0Z"
          />
        </svg>
      </PopoverButton>
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="z-[10] translate-x-2 transform px-4 outline-none focus:outline-none sm:px-0"
        >
          <div
            class="relative flex flex-col divide-y-[1px] divide-gray-200 overflow-hidden rounded-lg border-2 border-gray-500 bg-white text-sm transition-all dark:divide-zinc-700 dark:bg-zinc-800"
          >
            <button
              v-if="validation.is_valid_confirmed_file"
              type="reset"
              class="flex cursor-pointer items-center justify-between gap-2 rounded p-4 text-xs font-bold hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-midnight-100"
              @click="validation.delete_confirmed_file"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-6 w-6"
              >
                <path
                  fill="currentColor"
                  d="M15 4v7H5.17l-.59.59l-.58.58V4h11m1-2H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm5 4h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1z"
                />
              </svg>
              Reset Confirmed
            </button>
            <button
              v-if="validation.is_valid_anno_file"
              type="reset"
              class="flex cursor-pointer items-center justify-between gap-2 rounded p-4 text-xs font-bold hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-midnight-100"
              @click="validation.delete_anno_file"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-6 w-6"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M3 10h18M10 3v18m9 1v-6m3 3l-3-3l-3 3"
                />
              </svg>
              Reset Anno
            </button>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
    <div
      v-if="validation.is_valid_anno_file & validation.is_valid_confirmed_file"
      class="flex h-full items-start justify-between gap-8"
    >
      <BaseBox class="h-full w-[42rem] flex-col gap-4">
        <!-- Inconsistency warning -->
        <div
          v-if="!validation.is_same_file"
          class="relative grid gap-2 rounded-lg border-2 border-yellow-500 bg-white p-7 text-sm transition-all dark:bg-midnight-100"
        >
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-yellow-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>

            <h2 class="text-lg font-semibold text-yellow-500">
              Weird... Your 2 uploaded files have different name...
            </h2>
          </div>

          <ul
            class="w-full list-inside list-disc space-y-2 text-gray-500 dark:text-gray-400"
          >
            <li>
              Confirmed File:
              <span class="rounded bg-zinc-700 p-1 font-mono text-green-500">
                {{ validation.confirmed_file.name }}
              </span>
            </li>
            <li>
              Annotator's File:
              <span class="rounded bg-zinc-700 p-1 font-mono text-green-500">
                {{ validation.anno_file.name }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Main Information -->
        <TabGroup as="div" class="flex flex-1 flex-col gap-2">
          <div class="flex gap-2">
            <TabList
              class="flex flex-1 space-x-1 rounded-xl bg-gray-300 p-1 dark:bg-zinc-700/20"
            >
              <Tab
                v-for="tab in Object.keys(tabs)"
                as="template"
                :key="tab"
                v-slot="{ selected }"
              >
                <button
                  :class="[
                    'flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm leading-5 transition-all',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white font-bold text-green-400 shadow dark:bg-midnight-100 dark:text-green-300'
                      : 'text-midnight-100 hover:bg-white/[0.12] dark:text-gray-300',
                  ]"
                >
                  <div v-html="tabs[tab].icon"></div>
                  <div>{{ tabs[tab].title }}</div>
                </button>
              </Tab>
            </TabList>

            <!-- Save button -->
            <div class="flex w-1/5">
              <div
                class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-xs font-bold hover:bg-gray-200 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-midnight-100"
                @click="validation.download_confirmed_file"
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
            </div>
          </div>

          <TabPanels as="div" class="flex flex-1 flex-col">
            <TabPanel tabindex="-1" as="div" class="flex flex-1 flex-col">
              <!-- Table Filter -->
              <ul class="my-3 flex gap-2 dark:text-gray-200">
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
                  v-for="(
                    show_table, show_table_index
                  ) in confirmed_table_is_show"
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
                  {{ show_table_index }}
                </li>
                <li class="group relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                  <div
                    class="absolute -top-1/3 left-[calc(100%+5px)] scale-x-0 truncate rounded bg-gray-100 text-sm transition-all group-hover:scale-x-100 group-hover:p-2 dark:bg-zinc-800"
                  >
                    <span class="font-mono text-green-500">Ctrl + Click</span>
                    on 1 Table to show it only.
                  </div>
                </li>
              </ul>

              <!-- Confirmed List -->
              <ul
                role="list"
                :class="[
                  validation.is_same_file ? 'max-h-[75vh]' : 'max-h-[60vh]',
                  'divide-y divide-gray-200 overflow-auto dark:divide-zinc-700',
                ]"
              >
                <TransitionGroup name="fade">
                  <li
                    class="mr-4 py-3 hover:cursor-pointer sm:py-4"
                    v-for="(confirmed, confirmed_index) in filter_confirmed"
                    :key="confirmed"
                    @click.prevent="set_chosen_table(confirmed_index)"
                  >
                    <div class="flex items-center space-x-4">
                      <div class="flex min-w-0 flex-1 flex-col gap-2">
                        <form class="flex flex-col gap-2 py-2">
                          <div
                            class="flex items-center gap-2 text-sm font-medium text-midnight-100 dark:text-gray-200"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              class="h-4 w-4"
                            >
                              <path
                                fill="currentColor"
                                d="M11 23.59v-3.6c-5.01-.26-9-4.42-9-9.49C2 5.26 6.26 1 11.5 1S21 5.26 21 10.5c0 4.95-3.44 9.93-8.57 12.4l-1.43.69zM11.5 3C7.36 3 4 6.36 4 10.5S7.36 18 11.5 18H13v2.3c3.64-2.3 6-6.08 6-9.8C19 6.36 15.64 3 11.5 3zm-1 11.5h2v2h-2zm2-1.5h-2c0-3.25 3-3 3-5c0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"
                              />
                            </svg>
                            <input
                              v-if="
                                confirmed_index == displayed_confirmed_index &&
                                confirmed == confirmed_is_editing
                              "
                              v-model="qa_after_edit['question']"
                              class="w-full rounded bg-gray-100 p-2 text-sm dark:bg-midnight-100 dark:text-gray-200"
                            />
                            <p
                              v-if="
                                (confirmed_index != displayed_confirmed_index) |
                                  (confirmed != confirmed_is_editing)
                              "
                              :class="{
                                truncate:
                                  confirmed_index != displayed_confirmed_index,
                              }"
                            >
                              {{ confirmed.question }}
                            </p>
                          </div>
                          <div
                            class="flex items-center gap-2 text-sm font-medium text-midnight-100 dark:text-gray-200"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              class="h-4 w-4"
                            >
                              <path
                                fill="currentColor"
                                d="M15 4v7H5.17l-.59.59l-.58.58V4h11m1-2H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm5 4h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1z"
                              />
                            </svg>
                            <input
                              v-if="
                                confirmed_index == displayed_confirmed_index &&
                                confirmed == confirmed_is_editing
                              "
                              v-model="qa_after_edit['answer']"
                              class="w-full rounded bg-gray-100 p-2 text-sm dark:bg-midnight-100 dark:text-gray-200"
                            />
                            <p
                              v-if="
                                (confirmed_index != displayed_confirmed_index) |
                                  (confirmed != confirmed_is_editing)
                              "
                              :class="{
                                truncate:
                                  confirmed_index != displayed_confirmed_index,
                              }"
                            >
                              {{ confirmed.answer }}
                            </p>
                          </div>
                        </form>
                        <div
                          class="flex flex-col gap-2 text-sm text-midnight-100 dark:text-gray-400"
                        >
                          <div
                            class="text-sm dark:text-gray-200"
                            v-for="hint in confirmed.hints"
                          >
                            {{ hint }}
                          </div>
                        </div>
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
                            @click="validation.delete_one_confirmed(confirmed)"
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
            </TabPanel>
            <TabPanel>
              <PieChart
                :data="validation.confirmed_file.confirmed"
                :groups="validation.anno_file.tables"
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </BaseBox>

      <HTMLTable
        class="flex-1"
        v-if="chosen_table != null && table_html"
        :table_data="table_html"
      />
      <div
        v-if="!table_html"
        class="flex h-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-xs font-bold dark:border-zinc-700 dark:text-gray-200"
      >
        <span class="text-red-500">
          Something went wrong. Please reupload your annotator file.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
  pageTransition: {
    name: "page-down",
  },
});
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const validation = useValidationStore();
validation.loadLocalStorage();

const tabs = ref({
  all: {
    id: 1,
    title: "All",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4"/> </svg>',
  },
  stats: {
    id: 2,
    title: "Statistics",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"> <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M3 3v18h18"/> <path d="M7 9a2 2 0 1 0 4 0a2 2 0 1 0-4 0m10-2a2 2 0 1 0 4 0a2 2 0 1 0-4 0m-5 8a2 2 0 1 0 4 0a2 2 0 1 0-4 0m-1.84-4.38l2.34 2.88m2.588-.172l2.837-4.586"/> </g> </svg>',
  },
});

const confirmed_table_is_show = ref([]);
const displayed_confirmed_index = ref(0);

const init_table_list = () => {
  for (let i = 0; i < validation.anno_file.tables.length; i++) {
    confirmed_table_is_show.value.push(true);
  }
};
init_table_list();

watch(validation.anno_file, () => {
  init_table_list();
});

const filter_confirmed = computed(() => {
  return validation.confirmed_file.confirmed.filter(
    (confirmed) => confirmed_table_is_show.value[confirmed.table_id],
  );
});
const chosen_table = computed(() => {
  if (filter_confirmed.value.length == 0) return;
  return filter_confirmed.value[displayed_confirmed_index.value].table_id;
});
const table_html = computed(() => {
  try {
    const data = validation.anno_file.tables[chosen_table.value].table_html;
    return data;
  } catch (e) {
    console.log(e);
    return "<div>You've load a wrong file!</div>";
  }
});

function set_chosen_table(confirmed_index) {
  if (confirmed_index >= validation.confirmed_file.confirmed.length) return;
  displayed_confirmed_index.value = confirmed_index;
}

function toggle_show_table(table_index) {
  confirmed_table_is_show.value[table_index] =
    !confirmed_table_is_show.value[table_index];
}
function toggle_show_table_only(table_index) {
  for (let i = 0; i < confirmed_table_is_show.value.length; i++)
    confirmed_table_is_show.value[i] = false;
  confirmed_table_is_show.value[table_index] = true;
}

// Edit confirmed
const confirmed_is_editing = ref(null);
const qa_after_edit = ref(null);
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
  validation.update_confirmed_file({
    name: validation.confirmed_file.name,
    data: validation.confirmed_file.confirmed,
  });
  confirmed_is_editing.value = null;
  qa_after_edit.value = null;
}
</script>

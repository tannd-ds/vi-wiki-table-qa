<template>
  <div class="flex h-full min-h-[90vh] w-full flex-row justify-center">
    <Head>
      <Title>ViWiki Table - Cross Validation</Title>
    </Head>

    <div class="flex w-3/4 items-center justify-center gap-4">
      <div
          class="flex flex-row gap-4"
          v-if="cv_store.all_file_data_valid()">
        <div class="w-full max-w-lg">
          <div class="flex gap-4 items-center">
            <UButton
              @click="cv_store.reset_file(anno_file.local_storage_key)"
              color="yellow"
            >Reset Tables File</UButton>
            <UButton
              @click="cv_store.reset_file(cross_file.local_storage_key)"
              color="yellow"
            >Reset QAs File</UButton>
            <UButton
              @click="cv_store.download_answer_file"
              icon="i-heroicons-arrow-down-tray"
            >Download File</UButton>
          </div>
          <div class="mt-2"> Question Remain: {{ cv_store.get_n_question_remain }}/{{ cv_store.get_n_question }} </div>
          <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup name="question_list">
              <CVAppListBox :data="question_list" class="mb-6"/>
            </UFormGroup>
            <UFormGroup name="question">
              <div>{{ cv_store.get_current_display_question }}</div>
            </UFormGroup>


            <UFormGroup name="answer">
              <UInput
                variant="outline"
                icon="i-heroicons-chat-bubble-left"
                size="lg"
                :padded="true"
                placeholder="Answer..."
                v-model="answer_file.data[cv_store.current_display_question_index].answer"
                :error="!answer_file.data[cv_store.current_display_question_index].answer && 'You must enter a answer!'"
                :ui="{color: { white: { outline: 'bg-gray-100 dark:bg-midnight-200 ring-0 forcus:ring-2 dark:ring-0 dark:focus:ring-2'}}}"
              />
            </UFormGroup>

            <UButton type="submit">
              Submit
            </UButton>
          </UForm>
        </div>
        <div>

          <HTMLTable
              v-if="state.current_table_id != null"
              :table_data="cv_store.get_table_html_from_index(cv_store.current_display_table_index)" />
        </div>
      </div>
      <div
          v-else
          class="flex flex-row gap-4">
        <AppDropZone
            v-if="true"
            :id="anno_file.local_storage_key"
            :init-state="cv_store.has_file_locally(anno_file.local_storage_key)"
            @update-file="(content) => anno_file.update_file_data(content)"
            class="min-h-[50vh] min-w-[30vw]"
        >
          <template #default>
            <div class="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                  class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
              >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="text-lg text-gray-500 dark:text-green-700 font-mono">
                Table (demo_x.json)
              </p>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span>
                or
                <span class="font-semibold">drag and drop</span>
              </p>
            </div>
          </template>

          <template #uploaded>
            <div class="flex flex-col items-center justify-center gap-8 pb-6 pt-5">
              <div class="flex flex-col items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke="currentColor"
                    class="h-12 w-12"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                  />
                </svg>
                <span> Your file is read successfully! </span>
              </div>
              <div class="flex flex-col items-center gap-4 lg:flex-row">
                <BaseButton @click="cv_store.reset_file(anno_file.local_storage_key)">
                  <div
                      class="group flex flex-row items-center justify-center gap-2"
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
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    <span> Reload </span>
                  </div>
                </BaseButton>
              </div>
            </div>
          </template>
        </AppDropZone>

        <AppDropZone
            v-if="true"
            :id="cross_file.local_storage_key"
            :init-state="cross_file.has_file_locally()"
            @update-file="(content) => cross_file.update_file_data(content)"
            class="min-h-[50vh] min-w-[30vw]"
        >
          <template #default>
            <div class="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                  class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
              >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="text-lg text-gray-500 dark:text-green-700 font-mono">
                QAs (demo_x_done.json)
              </p>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span>
                or
                <span class="font-semibold">drag and drop</span>
              </p>
            </div>
          </template>

          <template #uploaded>
            <div class="flex flex-col items-center justify-center gap-8 pb-6 pt-5">
              <div class="flex flex-col items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke="currentColor"
                    class="h-12 w-12"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                  />
                </svg>
                <span> Your file is read successfully! </span>
              </div>
              <div class="flex flex-col items-center gap-4 lg:flex-row">
                <BaseButton @click="cv_store.reset_file(cross_file.local_storage_key)">
                  <div
                      class="group flex flex-row items-center justify-center gap-2"
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
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    <span> Reload </span>
                  </div>
                </BaseButton>
              </div>
            </div>
          </template>
        </AppDropZone>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useCrossValidationStore} from "~/stores/crossValidationStore";

definePageMeta({
  layout: "custom",
  pageTransition: {
    name: "page-up",
  },
});

const aInput = useAnnotationInputStore();
const general_store = useGeneralStore();

const route = useRoute();
const router = useRouter();
watchEffect(() => {
  const redirect_to = general_store.check_step(route.name);
  if (redirect_to !== route.name) router.push(redirect_to);
});

const cv_store = useCrossValidationStore()
const anno_file = cv_store.all_data['cv_anno_file'];
const cross_file = cv_store.all_data['cv_cross_file'];
const answer_file = cv_store.all_data['cv_answer_file'];

cv_store.all_file_data_valid();

const validate = (state) => {
  const errors = []
  if (!answer_file.data[cv_store.current_display_question_index].answer) errors.push({ path: 'answer', message: 'Required' })
  return errors
}

async function onSubmit (event) {
  cv_store.update_answer_file();
}

const state = ref({
  current_table_id: cv_store.current_display_table_index,
  answer: "",
});

const question_list = computed(() => {
  const question_list = [];
  for (let i = 0; i < cross_file.n_data; i++) {
    question_list.push({ id: i, name: cross_file.data[i].question });
  }
  return question_list;
});

</script>

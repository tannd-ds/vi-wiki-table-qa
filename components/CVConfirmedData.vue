<script setup>
import BaseConfirmedData from "~/components/BaseConfirmedData.vue";

const cv_store = useCrossValidationStore();

const show_no_answer_only = ref(false);
const filter_data = computed(() => {
  if (show_no_answer_only.value) {
    return cv_store.all_data['cv_answer_file'].data.filter((item) => {
      return item.answer === "";
    });
  }
  return cv_store.all_data['cv_answer_file'].data;
});
</script>

<template>
  <BaseConfirmedData
    :qa_list="filter_data"
    :table_list="cv_store.all_data['cv_anno_file'].data"
    :prevent_update_question="true"
    @save:qa_list="() => cv_store.update_answer_file()"
    @download:qa_list="() => cv_store.download_answer_file()"
  >
    <template #filter>
      <div class="ml-2 flex gap-2 items-center">
        <div>Done: <span></span>
          <span
            class="mt-2 w-fit truncate rounded border border-green-500 px-2 py-[2px] text-xs text-green-500 dark:border-green-300 dark:text-green-400"
          >
            {{ cv_store.get_n_question - cv_store.get_n_question_remain }} / {{ cv_store.get_n_question }}
          </span>
        </div>
        <UToggle v-model="show_no_answer_only" />
        <span
            class="text-sm"
            :class="{
              'text-zinc-300': show_no_answer_only,
              'text-zinc-400': !show_no_answer_only
            }"
        >Show Undone Question Only</span>
      </div>
    </template>

    <template #edit_functions>
      <div class="flex gap-2">
        <UButton
            icon="i-heroicons-check"
            size="2xs"
            @click="() => cv_store.update_answer_file()"
            class="flex items-center gap-1" />
      </div>
    </template>

  </BaseConfirmedData>
</template>
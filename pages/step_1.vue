<template>
  <div class="flex h-full">
    <Head>
      <Title>ViWiki Table</Title>
    </Head>
    <div
      class="flex w-[90vw] flex-col items-center justify-center gap-2 lg:w-full lg:flex-row lg:gap-8"
    >
      <div class="w-full max-w-lg">
        <Hint ref="ref_hints" />
        <BaseBox class="flex-col">
          <form class="w-full">
            <AppListBox :data="table_labels" class="mb-6" ref="ref_tables" />
            <InputField
              type="text"
              id="question"
              v-model:model-value="aInput.question"
              placeholder="Give me a Question!"
              label_name="Question"
              ref="ref_question"
            />
            <InputField
              type="text"
              id="answer"
              v-model:model-value="aInput.answer"
              placeholder="Answer, please"
              label_name="Answer"
              ref="ref_answer"
            />
            <div class="flex items-center justify-center lg:justify-between">
              <BaseButton @click="aInput.confirmData">Confirm</BaseButton>
            </div>
          </form>
        </BaseBox>
      </div>
      <div class="flex flex-col">
        <HTMLTable :table_data="aInput.getCurrentTableHTML" />
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

import { useAnnotationInputStore } from "~/stores/annotationInput";
import { useGeneralStore } from "~/stores/generalStore";

const aInput = useAnnotationInputStore();
const general_store = useGeneralStore();

const ref_question = ref(null);
const ref_answer = ref(null);
const ref_tables = ref(null);
const ref_hints = ref(null);
// Real ref is inside these refs
const ref_question_input = computed(() =>
  ref_question.value.$el.querySelector("#question"),
);
const ref_answer_input = computed(() =>
  ref_answer.value.$el.querySelector("#answer"),
);
const ref_tables_input = computed(() =>
  ref_tables.value.$el.nextSibling.querySelector("#listbox-btn"),
);
const ref_hint_1 = computed(() =>
  ref_hints.value.$el.querySelector(
    `#h0_t${String(aInput.current_table_index)}`,
  ),
);
const ref_hint_2 = computed(() =>
  ref_hints.value.$el.querySelector(
    `#h1_t${String(aInput.current_table_index)}`,
  ),
);
const ref_hint_3 = computed(() =>
  ref_hints.value.$el.querySelector(
    `#h2_t${String(aInput.current_table_index)}`,
  ),
);

const { shift, a, q, Escape, t, Digit1, Digit2, Digit3 } = useMagicKeys();
const activeElement = useActiveElement();
const usingInput = computed(
  () =>
    (activeElement.value?.tagName === "INPUT") |
    (activeElement.value?.tagName === "TEXTAREA"),
);

const route = useRoute();
const router = useRouter();
watchEffect(() => {
  const redirect_to = general_store.check_step(route.name);
  if (redirect_to != route.name) router.push(redirect_to);

  if (usingInput.value && Escape.value) {
    activeElement.value.blur();
  }

  if (!usingInput.value) {
    if (shift.value && a.value) {
      setTimeout(() => {
        ref_answer_input.value.focus();
      }, 20);
    }
    if (shift.value && q.value) {
      setTimeout(() => {
        ref_question_input.value.focus();
      }, 20);
    }
    if (shift.value && t.value) {
      ref_tables_input.value.click();
    }
    if (shift.value && Digit1.value) {
      ref_hint_1.value.click();
    }
    if (shift.value && Digit2.value) {
      ref_hint_2.value.click();
    }
    if (shift.value && Digit3.value) {
      ref_hint_3.value.click();
    }
  }
});

const table_labels = computed(() => {
  const table_labels = [];
  for (let i = 0; i < aInput.anno_file_data.length; i++) {
    table_labels.push({ id: i, name: "Table " + String(i) });
  }
  return table_labels;
});
</script>

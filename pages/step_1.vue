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
            <AppListBox :data="table_labels" class="mb-6" />
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

const route = useRoute();
const router = useRouter();
watchEffect(() => {
  const redirect_to = general_store.check_step(route.name);
  if (redirect_to != route.name) router.push(redirect_to);
});

const table_labels = computed(() => {
  const table_labels = [];
  for (let i = 0; i < aInput.anno_file_data.length; i++) {
    table_labels.push({ id: i, name: "Table " + String(i) });
  }
  return table_labels;
});
</script>

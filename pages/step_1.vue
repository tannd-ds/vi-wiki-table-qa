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
          <UForm :validate="validate" :state="aInput" class="space-y-4" @submit="onSubmit">
            <UFormGroup name="table">
              <AppListBox :data="table_labels" class="mb-6" ref="ref_tables" />
            </UFormGroup>
            <UFormGroup name="question">
              <UInput 
                variant="outline" 
                icon="i-heroicons-question-mark-circle"
                size="lg"
                :padded="true"
                placeholder="Question..." 
                v-model="aInput.question"
                :error="!aInput.question && 'You must enter a question!'"
                :ui="{color: { white: { outline: 'bg-gray-100 dark:bg-midnight-200 ring-0 forcus:ring-2 dark:ring-0 dark:focus:ring-2'}}}"
              />
            </UFormGroup>

            <UFormGroup name="answer">
              <UInput 
                variant="outline"
                icon="i-heroicons-chat-bubble-left"
                size="lg"
                :padded="true"
                placeholder="Answer..." 
                v-model="aInput.answer"
                :error="!aInput.answer && 'You must enter a answer!'"
                :ui="{color: { white: { outline: 'bg-gray-100 dark:bg-midnight-200 ring-0 forcus:ring-2 dark:ring-0 dark:focus:ring-2'}}}"
              />
            </UFormGroup>

            <UButton type="submit">
              Submit
            </UButton>
          </UForm>
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

const aInput = useAnnotationInputStore();
const general_store = useGeneralStore();

const route = useRoute();
const router = useRouter();
watchEffect(() => {
  const redirect_to = general_store.check_step(route.name);
  if (redirect_to != route.name) router.push(redirect_to);
});

const validate = (state) => {
  const errors = []
  if (!aInput.question) errors.push({ path: 'question', message: 'Required' })
  if (!aInput.answer)   errors.push({ path: 'answer', message: 'Required' })
  return errors
}

async function onSubmit (event) {
  aInput.confirm_qa();
}

const table_labels = computed(() => {
  const table_labels = [];
  for (let i = 0; i < aInput.getNumOfTables; i++) {
    table_labels.push({ id: i, name: "Table " + String(i) });
  }
  return table_labels;
});

const modal_opened = ref(false);
</script>

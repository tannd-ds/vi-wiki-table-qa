<template>
  <div 
    class="h-full flex"
    :class="{'dark': general_store.use_darkmode,}"
  >
    <Head>
      <Title>ViWiki Table</Title>
    </Head>
    <Transition name="fade">
      <OverlayTableList v-if="general_store.overlay.is_show"/>
    </Transition>
    <div class="w-full flex flex-col gap-8 justify-center items-center lg:flex-row">
      <div class="w-full max-w-lg">
        <div>
        </div>
        <BaseBox class="flex-col gap-4">
          <div v-if="aInput.chosen_table != null" class="p-4 rounded-lg border-green-500 border-2 text-green-700 dark:text-gray-100">
            <span class=" text-black font-bold dark:text-green-500">Hint: </span> 
            <span class=" italic">The "Generic Prompt" will go here!</span>
          </div>
          <form class="w-full">
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
            <div class="flex items-center justify-between">
              <BaseButton @click="aInput.confirmData">Confirm</BaseButton> 
            </div>
          </form>
        </BaseBox>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-col gap-2 items-center" v-if="aInput.chosen_table != null">
          <div 
              class="
                inline-flex items-center justify-center
                mr-2 px-2.5 py-0.5 
                bg-blue-100 
                text-blue-800 text-xs font-semibold 
                border border-blue-400 rounded 
                dark:bg-gray-700 dark:text-blue-400 
              "
            >Table ID: {{ aInput.chosen_table.id }}
          </div>
          <BaseTable :table="aInput.chosen_table.content"/>
          <BaseButton 
            @click="general_store.show_overlay(type='table_list')"
          >
            <Icon name="carbon:renew" size="1.5em" color="currentColor"/>
            <div>Change Table</div>
          </BaseButton>
        </div>
        <BaseButton
          v-else
          @click="general_store.show_overlay(type='table_list')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Load Table</span>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "custom",
    pageTransition: {
      name: "page",
      mode: "out-in"
    },
  })

  import { useAnnotationInputStore } from "~/stores/annotationInput"
  import { useGeneralStore } from "~/stores/generalStore"

  const aInput = useAnnotationInputStore()
  const general_store = useGeneralStore()

  const route = useRoute()
  const router = useRouter()
  watchEffect(() => {
    const redirect_to = general_store.check_step(route.name)
    if (redirect_to != route.name) router.push(redirect_to)
  })

</script>
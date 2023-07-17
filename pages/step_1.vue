<template>
  <div 
    class="h-full flex"
    :class="{'dark': general_store.use_darkmode,}"
  >
    <Head>
      <Title>ViWiki Table</Title>
    </Head>
    <div class="w-full flex flex-col gap-8 justify-center items-center lg:flex-row">
      <div class="w-full max-w-lg">
        <BaseBox :override_bg="true" class="border-2 border-yellow-500">
          <div class="w-full h-full relative">
            <div 
              class="
                max-h-[30%] w-full max-w-[35%] p-4 
                absolute -top-8 left-8 
                flex justify-center items-center gap-4 
                bg-yellow-500
                rounded-2xl text-midnight-200 font-bold
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 rotate-[39deg]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
              <div class="text-2xl">
                Hint!
              </div>
            </div>
            <div class="mt-8 p-4 dark:bg-midnight-100 rounded-2xl dark:text-gray-300 leading-8">
              <p class="font-bold text-center">Your QA should meet ONE OF THESE CRITERIA</p>
              <ul class="pl-12 list-disc">
                <li>This is Criteria 1.</li>
                <li>Like above, but this is Criteria 2. I make this longer for experimental purpose.</li>
                <li>And this is Criteria 3, of course.</li>
              </ul>
            </div>
          </div>
        </BaseBox>
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
        <HTMLTable :table_data="aInput.getCurrentTableHTML"/>
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
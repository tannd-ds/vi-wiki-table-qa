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
        <BaseBox :override_bg="true">
          <div 
            class="
              w-full min-h-[20vh] p-4
              bg-gradient-to-tl from-emerald-950 to-green-800
              rounded-2xl
              text-gray-100
              flex flex-col
            "
          >
            <div class="flex gap-4 items-center">
              <BaseBox 
                :override_bg="true"
                class="p-4 text-yellow-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>

              </BaseBox>
              Hint!
            </div>
            <div class="px-4 pb-2 leading-loose">
              <p>Prompt của bạn PHẢI THOẢ 1 TRONG CÁC YÊU CẦU sau đây</p>
              <ul class="pl-5 text-gray-200 list-item">
                <li>Yêu cầu thứ 1</li>
                <li>Yêu cầu thứ 2</li>
                <li>Yêu cầu thứ 3</li>
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

  console.log(aInput.getCurrentTableHTML)

</script>
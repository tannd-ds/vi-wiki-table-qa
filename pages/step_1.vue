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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 rotate-[30deg]">
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
        <BaseBox class="flex-col">
          <form class="w-full">
            <div class="relative">
              <InputField 
                is="div"
                label_name="Table"
                @click="table_dropdown_is_open = !table_dropdown_is_open"
                ref="table_dropdown_modal"
              >
                <div class="flex justify-between items-center">
                  <div>
                    Table {{ aInput.current_table_index }}
                  </div>
                  <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </div>
              </InputField>
              <Transition name="fade">
                <div 
                  v-if="table_dropdown_is_open"
                  class="w-full absolute -bottom-full z-10 bg-white rounded-lg shadow dark:bg-midnight-100 border-2 border-green-700"
                >
                  <ul class="text-sm text-gray-700 dark:text-gray-200 divide-y dark:divide-zinc-700" aria-labelledby="dropdownDefaultButton">
                    <li 
                      v-for="(data, table_index) in aInput.anno_file_data"
                      key="table_index"
                      @click="choose_table(table_index)"
                      class="
                        px-4 py-2 flex justify-between items-center 
                        hover:rounded-lg
                      hover:bg-gray-100 dark:hover:bg-midnight-200 
                      dark:hover:text-green-500 
                        cursor-pointer
                      "
                    >
                      <div>
                        Table {{ table_index }}
                      </div>
                      <div v-if="aInput.current_table_index == table_index" class="text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    </li>
                  </ul>
                </div>
              </Transition>
            </div>
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
        <TableDisplay />
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
  import { onClickOutside } from '@vueuse/core'

  const aInput = useAnnotationInputStore()
  const general_store = useGeneralStore()

  const route = useRoute()
  const router = useRouter()
  watchEffect(() => {
    const redirect_to = general_store.check_step(route.name)
    if (redirect_to != route.name) router.push(redirect_to)
  })

  const table_dropdown_modal = ref(null)
  const table_dropdown_is_open = ref(false)
  
  onClickOutside(table_dropdown_modal, (event) => table_dropdown_is_open.value = false)

  function choose_table(table_index) {
    aInput.setCurrentTableID(table_index)
    table_dropdown_is_open.value = false
  }
</script>
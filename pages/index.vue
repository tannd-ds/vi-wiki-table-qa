<template>
    <Transition name="fade">
      <OverlayTableList v-if="general_store.overlay.type=='table_list'"/>
      <OverlayConfirmedList v-else />
    </Transition>
    <BaseToastList />
    <div class="w-full mx-8 flex flex-col gap-8 justify-center items-center lg:flex-row">
      <div class="w-full max-w-lg">
        <div class="flex gap-2 justify-between">
          <BaseBox class="w-full flex-col items-center gap-8">
            <div class="flex items-center space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-gray-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div class="font-medium dark:text-white">
                <div class="text-sm text-gray-500 dark:text-gray-400">Welcome,</div>
                <div>Annotator 01!</div>
              </div>
            </div>
          </BaseBox>
          <BaseBox class="flex justify-center items-center gap-4">
            <button 
                title="All created QA Pairs" 
                :disabled="aInput.confirmedData.length <= 0"
                class="p-1 relative rounded-lg hover:bg-blue-200 group"
                @click="general_store.show_overlay('confirmed_list')"
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
              </svg>  
              <div 
                  class="absolute inline-flex items-center justify-center w-7 h-7 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900"
              >
                {{ aInput.confirmedData.length }}
              </div>

            </button>
          </BaseBox>
        </div>
        <BaseBox class="flex-col gap-4">
          <div v-if="aInput.chosen_table != null" class="p-4 rounded-lg border-green-500 border-2 text-green-700">
            <span class=" text-black font-bold">Hint: </span> 
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
          <Icon name="carbon:add-filled" size="1.5em" color="currentColor"/>
          <span>Load Table</span>
        </BaseButton>
      </div>
    </div>
</template>

<script setup>
  definePageMeta({
    layout: "custom"
  })

  import { useAnnotationInputStore } from "~/stores/annotationInput"
  import { useGeneralStore } from "~/stores/generalStore"

  const aInput = useAnnotationInputStore()
  const general_store = useGeneralStore()

  onMounted(async () => {
    aInput.loadConfirmedData()

    // Load tables saved on Github :)
    let github_data = await $fetch('https://raw.githubusercontent.com/tannd-ds/vi-wiki-table-qa/main/test.json')
    github_data = JSON.parse(github_data)
    let new_table = []
    for (let row_id in github_data) {
      let new_row = []
      for (let cell_id in github_data[row_id]) {
        new_row.push(github_data[row_id][cell_id])
      }
      new_table.push(new_row)
    }
    aInput.tables.push({
      'id': '0003',
      'content': new_table
    })
  })

</script>
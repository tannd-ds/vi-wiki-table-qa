<template>
    <Teleport to="body"> <OverlayTableList /> </Teleport>
    <BaseToastList />
    <div class="w-full mx-8 flex flex-col gap-8 justify-center items-center lg:flex-row">
      <BaseBox class=" max-w-lg">
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
            >ID: {{ aInput.chosen_table.id }}
          </div>
          <BaseTable :table="aInput.chosen_table.content"/>
          <BaseButton 
            @click="generalStore.overlay.is_show = true"
          >
            <Icon name="carbon:renew" size="1.5em" color="currentColor"/>
            <div>Change Table</div>
          </BaseButton>
        </div>
        <BaseButton
          v-else
          @click='generalStore.overlay.is_show = true'
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
  const generalStore = useGeneralStore()
  aInput.loadConfirmedData()

</script>
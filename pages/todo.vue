<template>
    <Teleport to="body"> <OverlayInput/> </Teleport>
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
      <!-- <BaseBox> -->
        <div class="flex flex-col">
          <div class="flex flex-col gap-2 items-center" v-if="aInput.table != null">
            <BaseTable :table="aInput.table"/>
            <BaseButton @click="aInput.table=null">Remove Table</BaseButton>
          </div>
          <BaseButton
            v-else
            @click='generalStore.overlay.is_show = true'
          >
            <Icon name="carbon:add-filled" size="1.5em" color="currentColor"/>
            <span>New Table</span>
          </BaseButton>
          <BaseButton @click="generalStore.show_toast('success', 'good')">Button ne</BaseButton>
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
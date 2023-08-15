<template>
  <BaseBox class="flex-col justify-center gap-4 dark:text-gray-200">
    <div class="flex flex-col items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="h-20 w-20"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h3.5m4.92.61a2.1 2.1 0 0 1 2.97 2.97L18 22h-3v-3l3.42-3.39z"
        />
      </svg>
      <div class="font-bold">Change Your Name</div>
    </div>
    <form
      class="flex w-[80vw] max-w-xl flex-col items-center"
      @submit.prevent="save_name"
    >
      <InputField
        type="text"
        id="question"
        v-model:model-value="new_name"
        placeholder="Tell me your new Name!"
        label_name="New Name"
        class="w-full"
      />
      <div class="flex items-center justify-between">
        <BaseButton @click="aInput.save_anno_name(new_name)"> Save </BaseButton>
      </div>
    </form>
  </BaseBox>
</template>

<script setup>
import { useAnnotationInputStore } from "~/stores/annotationInput";
import { useGeneralStore } from "~/stores/generalStore";
const aInput = useAnnotationInputStore();
const general_store = useGeneralStore();

const new_name = ref("");

const save_name = () => {
  aInput.save_anno_name(new_name.value);
};
</script>

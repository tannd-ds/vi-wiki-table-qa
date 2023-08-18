<template>
  <BaseBox :override_bg="true" class="border-2 border-yellow-500">
    <div class="relative h-full w-full">
      <div
        class="flex items-center justify-center gap-4 rounded-t-xl bg-yellow-500 px-2 py-4 font-bold text-midnight-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-8 w-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
        <p class="text-center font-bold">
          Your QA must meet ONE OF THESE CRITERIA
        </p>
      </div>
      <div
        class="space-y-2 rounded-2xl p-4 leading-8 dark:bg-midnight-100 dark:text-gray-300"
      >
        <div class="max-h-[40vh] overflow-auto">
          <HintCheckboxList :n_displayed="3" />
        </div>
        <div class="flex justify-center">
          <button @click="general_store.show_overlay('hints')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </BaseBox>
</template>

<script setup>
const aInput = useAnnotationInputStore();
const general_store = useGeneralStore();
</script>

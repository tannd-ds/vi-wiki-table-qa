<template>
  <div
    class="relative flex h-fit max-h-[80vh] flex-col rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-zinc-800 dark:bg-midnight-100 sm:p-8 lg:w-[35vw]"
  >
    <div
      class="absolute right-4 top-4 cursor-pointer rounded p-2 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-zinc-700"
      @click="general_store.close_overlay()"
    >
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    <div class="flex items-center gap-4 p-4 text-2xl font-bold dark:text-white">
      <div
        class="rounded bg-yellow-300 p-2 text-yellow-600 dark:bg-yellow-500 dark:text-yellow-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-dasharray="46"
            stroke-dashoffset="46"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 17H9V14.1973C7.2066 13.1599 6 11.2208 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9C18 11.2208 16.7934 13.1599 15 14.1973V17z"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.4s"
              values="46;0"
            />
          </path>
          <rect width="6" height="0" x="9" y="20" fill="currentColor" rx="1">
            <animate
              fill="freeze"
              attributeName="height"
              begin="0.5s"
              dur="0.2s"
              values="0;2"
            />
          </rect>
        </svg>
      </div>
      <div>
        <div>All Hints</div>
        <div class="text-sm font-normal text-gray-700 dark:text-gray-500">
          Every Hints possible
        </div>
      </div>
    </div>

    <HintCheckboxList
      :n_displayed="aInput.hints.all_hints.length"
      :verbose="true"
    />
  </div>
</template>

<script setup>
const aInput = useAnnotationInputStore();
const general_store = useGeneralStore();
</script>

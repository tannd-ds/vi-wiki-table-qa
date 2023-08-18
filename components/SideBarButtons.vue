<template>
  <BaseBox
    class="group ml-4 w-[5em] flex-col gap-8 px-[1em] transition-all duration-300 hover:w-[18em] hover:max-w-none"
  >
    <!-- Show Confirmed -->
    <div class="relative flex gap-2">
      <button
        :disabled="aInput.confirmedData.length <= 0"
        class="relative rounded-lg bg-green-200 p-2 text-green-500 dark:bg-green-400 dark:bg-opacity-80 dark:text-green-200 dark:hover:bg-opacity-70"
        @click="general_store.show_overlay('confirmed')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-7 w-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
          />
        </svg>
        <div
          class="absolute -right-2 -top-1 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-green-500 text-xs font-bold text-gray-200 dark:border-gray-900"
        >
          {{ aInput.confirmedData.length }}
        </div>
      </button>
      <div
        class="z-30 hidden truncate rounded px-4 py-2 text-sm font-medium text-midnight-100 transition-all duration-300 group-hover:block dark:text-gray-200"
      >
        <div>Show Comfirmed QA Pairs</div>
      </div>
    </div>

    <!-- User -->
    <div class="relative flex gap-2">
      <button
        class="relative rounded-lg bg-orange-200 p-2 text-orange-500 dark:bg-orange-400 dark:bg-opacity-80 dark:text-orange-200 dark:hover:bg-opacity-70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-7 w-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
      <div
        class="z-30 hidden truncate rounded px-4 py-2 text-sm font-medium text-midnight-100 transition-all duration-300 group-hover:block dark:text-gray-200"
      >
        <div class="flex items-center gap-2">
          <div class="text-sm font-medium dark:text-gray-200">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Welcome,
            </span>
            <span>{{ aInput.anno_name }}!</span>
          </div>
          <button @click="general_store.show_overlay('rename')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 20h4L18.5 9.5a1.5 1.5 0 0 0-4-4L4 16v4m9.5-13.5l4 4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Color Mode -->
    <div class="relative flex gap-2">
      <button
        @click="general_store.use_darkmode = !general_store.use_darkmode"
        class="relative rounded-lg bg-purple-200 p-2 text-purple-500 dark:bg-purple-400 dark:bg-opacity-80 dark:text-purple-200 dark:hover:bg-opacity-70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-7 w-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      </button>
      <div
        class="z-30 hidden truncate rounded px-4 py-2 text-sm font-medium text-midnight-100 transition-all duration-300 group-hover:block dark:text-gray-200"
      >
        <div class="font-medium text-midnight-100 dark:text-gray-200">
          <div>Toggle Color Mode</div>
        </div>
      </div>
    </div>
  </BaseBox>
</template>

<script setup>
const aInput = useAnnotationInputStore();
const general_store = useGeneralStore();
</script>

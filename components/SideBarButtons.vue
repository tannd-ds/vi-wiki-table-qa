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

    <!-- Leaderboard -->
    <div class="relative flex gap-2">
      <button
        @click="general_store.show_overlay('leaderboard')"
        class="relative rounded-lg bg-yellow-200 p-2 text-yellow-500 dark:bg-yellow-400 dark:bg-opacity-80 dark:text-yellow-200 dark:hover:bg-opacity-70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M12 2.25a2.75 2.75 0 0 0-1.898 4.74l-.2.356l-1.797 3.223a8.23 8.23 0 0 1-.373.633a.84.84 0 0 1-.06.077a.854.854 0 0 1-.08-.058a8.265 8.265 0 0 1-.533-.507l-.08-.079a24.07 24.07 0 0 0-.872-.844a2.25 2.25 0 1 0-2.848 1.334l.01.173c.024.325.066.714.113 1.158l.185 1.717l.087.83c.112 1.083.22 2.118.38 2.991c.1.552.228 1.072.404 1.523c.175.448.417.875.774 1.195c.63.564 1.39.81 2.296.926c.875.112 1.978.112 3.352.112h2.28c1.374 0 2.477 0 3.352-.112c.907-.116 1.666-.362 2.296-.926c.357-.32.599-.747.774-1.195c.176-.451.304-.971.405-1.523c.16-.873.267-1.908.379-2.99l.087-.83l.185-1.717c.047-.445.09-.834.112-1.159l.011-.173a2.25 2.25 0 1 0-2.848-1.334c-.264.237-.554.526-.873.844l-.079.079c-.258.258-.412.41-.533.507a.853.853 0 0 1-.08.058a.852.852 0 0 1-.06-.077a8.22 8.22 0 0 1-.373-.633l-1.797-3.223l-.2-.356A2.75 2.75 0 0 0 12 2.25ZM10.75 5a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0Zm.455 3.09c.08-.145.155-.278.224-.4a2.756 2.756 0 0 0 1.142 0c.07.122.143.255.224.4l1.807 3.24c.155.278.298.535.438.734c.149.211.351.445.662.582c.268.118.564.159.854.119c.336-.047.595-.216.796-.378c.188-.153.397-.361.624-.586l.024-.024c.375-.374.65-.645.86-.837c.12.07.246.13.379.178l-.005.074c-.02.294-.06.657-.11 1.116l-.182 1.705l-.092.87c-.07.67-.134 1.295-.209 1.867H5.359a71.753 71.753 0 0 1-.21-1.868c-.028-.282-.059-.572-.09-.87l-.184-1.704a33.475 33.475 0 0 1-.114-1.19c.133-.048.26-.108.38-.178c.21.192.484.463.86.837l.023.024c.227.225.436.433.624.586c.201.162.46.331.796.378c.29.04.586-.001.854-.12c.31-.136.514-.37.662-.581a8.66 8.66 0 0 0 .438-.735l1.807-3.238ZM5.618 18.25c.065.276.137.516.217.72c.13.33.261.52.377.624c.317.283.739.46 1.487.556c.768.099 1.775.1 3.213.1h2.176c1.438 0 2.445-.001 3.213-.1c.748-.095 1.17-.273 1.487-.556c.116-.104.248-.294.377-.623c.08-.205.152-.445.217-.721H5.618ZM3.25 9a.75.75 0 1 1 .759.75H4A.75.75 0 0 1 3.25 9Zm16 0a.75.75 0 1 1 .75.75h-.009A.747.747 0 0 1 19.25 9Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div
        class="z-30 hidden truncate rounded px-4 py-2 text-sm font-medium text-midnight-100 transition-all duration-300 group-hover:block dark:text-gray-200"
      >
        <div class="font-medium text-midnight-100 dark:text-gray-200">
          <div>Leaderboard</div>
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

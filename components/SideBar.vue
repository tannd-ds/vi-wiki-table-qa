<template>
  <div class="fixed z-10 mr-8 flex h-screen items-center justify-start gap-4">
    <!-- Hamburger button -->
    <button
      v-if="!general_store.isLargeScreen"
      type="button"
      @click="navbar_is_show = !navbar_is_show"
      class="fixed top-0 z-[1] p-4 dark:text-gray-200"
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
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>


    <!-- SideBar -->
    <div
      class="fixed left-2 z-0 transition-all"
      :class="{
        '-translate-x-full': !(navbar_is_show || general_store.isLargeScreen),
        'translate-x-0': navbar_is_show || general_store.isLargeScreen,
      }"
    >
      <div class="flex flex-col items-center">
        <SideBarButtons />
      </div>
    </div>
  </div>
</template>

<script setup>
const general_store = useGeneralStore();

const navbar_is_show = ref(general_store.isLargeScreen);
</script>

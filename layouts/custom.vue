<template>
  <div 
    class="relative"  
    :class="{'dark': general_store.use_darkmode,}"
  >
    <OverlayConfirmedData />
    <OverlayRename />
    <BaseToastList />
    <div class="
      fixed h-screen flex items-center justify-start gap-4 mr-8
      z-10
      "
    > 
      <button
        v-if="!general_store.isLargeScreen"
        type="button"
        @click="navbar_is_show = !navbar_is_show"
        class="z-[1] fixed top-0 p-4 dark:text-gray-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

      </button>
      <div 
        class="z-0 fixed transition-all"
        :class="{
          '-translate-x-full': !(navbar_is_show | general_store.isLargeScreen),
          'translate-x-0': navbar_is_show | general_store.isLargeScreen
        }"
      >
        <BaseBox class="ml-4 px-[1em] w-20 flex-col gap-8">
          <ul class="inline-flex flex-col items-center gap-4 -space-y-px text-sm">
            <div class="dark:text-gray-400 font-bold">Step</div>
            <div class="flex flex-col">
              <li 
                v-for="(_, step_index) in general_store.n_steps"
                class="flex flex-col items-center"
                :class="{
                  'opacity-30': step_index > general_store.current_step,
                }"
              >
                <div 
                  v-if="step_index > 0" 
                  class="my-1 leading-3 font-bold text-gray-200 dark:text-zinc-500" 
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" 
                    class="w-6 h-6"
                  >
                    <line stroke-width="2" stroke-linecap="square" stroke-linejoin="undefined" y2="24" x2="12" y1="0" x1="12" fill="none"/>
                  </svg>
                </div>
                <button 
                  :disabled="step_index > general_store.current_step"
                  @click="direct_step(step_index)"
                  class="
                    w-8 h-8
                    flex items-center justify-center
                    rounded-full
                    leading-tight 
                    border border-gray-300 dark:border-zinc-700
                    transition-all duration-200
                    font-bold font-mono text-lg
                  "
                  :class="{
                    'text-gray-500 hover:text-midnight-100 dark:text-gray-400 dark:hover:text-gray-200 \
                    bg-white hover:bg-gray-100 dark:bg-midnight-200 dark:hover:bg-gray-700': (general_store.current_step >= step_index) & (!index_is_current_step(step_index)),
                    'text-midnight-100 hover:text-midnight-100 dark:text-midnight-200 bg-green-500': index_is_current_step(step_index),
                    'text-gray-500 dark:text-gray-400 bg-white dark:bg-midnight-100 cursor-not-allowed': general_store.current_step < step_index,
                  }"
                >
                  {{ step_index }}
                </button>
              </li>
            </div>
          </ul>
        </BaseBox>
        <BaseBox class="ml-4 w-[5em] px-[1em] flex-col gap-8 group hover:max-w-none transition-all duration-300 hover:w-[18em]">

          <!-- Show Confirmed -->
          <div class="relative flex gap-2">
            <button 
                :disabled="aInput.confirmedData.length <= 0"
                class="
                  p-2 relative 
                  rounded-lg 
                  bg-green-200 dark:bg-green-400
                  dark:bg-opacity-80 dark:hover:bg-opacity-70
                  text-green-500 dark:text-green-200
                "
                @click="general_store.show_overlay('confirmed_list')"
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
              </svg>  
              <div class="absolute inline-flex items-center justify-center w-7 h-7 text-xs font-bold text-gray-200 bg-green-500 border-2 border-white rounded-full -top-1 -right-2 dark:border-gray-900" >
                {{ aInput.confirmedData.length }}
              </div>
            </button>
            <div 
              class="
                z-30 py-2 px-4 
                truncate
                text-midnight-100 dark:text-gray-200 text-sm font-medium 
                hidden group-hover:block 
                rounded 
                transition-all duration-300
              "
            >
                <div>Show Comfirmed QA Pairs</div>
            </div>
          </div>

          <!-- User -->
          <div class="relative flex gap-2">
            <button 
              class="
                p-2 relative 
                rounded-lg 
                bg-orange-200 dark:bg-orange-400
                dark:bg-opacity-80 dark:hover:bg-opacity-70
                text-orange-500 dark:text-orange-200
              " 
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <div 
              class="
                z-30 py-2 px-4 
                truncate
                text-midnight-100 dark:text-gray-200 text-sm font-medium 
                hidden group-hover:block 
                rounded 
                transition-all duration-300
              "
            >
              <div class="flex items-center gap-2">
                <div class="font-medium text-sm dark:text-gray-200">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Welcome, </span>
                  <span>{{ aInput.anno_name }}!</span>
                </div>
                <button 
                  @click="general_store.show_overlay('rename')"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 20h4L18.5 9.5a1.5 1.5 0 0 0-4-4L4 16v4m9.5-13.5l4 4"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Color Mode -->
          <div class="relative flex gap-2">
            <button 
              @click="general_store.use_darkmode = !general_store.use_darkmode" 
              class="
                p-2 relative 
                rounded-lg 
                bg-purple-200 dark:bg-purple-400
                dark:bg-opacity-80 dark:hover:bg-opacity-70
                text-purple-500 dark:text-purple-200
              " 
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            </button>
            <div 
              class="
                z-30 py-2 px-4 
                truncate
                text-midnight-100 dark:text-gray-200 text-sm font-medium 
                hidden group-hover:block 
                rounded 
                transition-all duration-300
              "
            >
              <div class="font-medium text-midnight-100 dark:text-gray-200">
                <div>Toggle Color Mode</div>
              </div>
            </div>
          </div>
        </BaseBox> 
      </div>

    </div>
    <div 
      class="
        lg:pl-28 w-full h-full min-h-screen flex justify-center items-center
      bg-gray-100 dark:bg-gradient-to-bl dark:from-zinc-800 dark:to-midnight-400 
      "
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  import { useAnnotationInputStore } from "~/stores/annotationInput"
  import { useGeneralStore } from "~/stores/generalStore"

  const aInput = useAnnotationInputStore()
  const general_store = useGeneralStore()
  const router = useRouter()
  const route = useRoute()

  function direct_step(step_index) {
    const ROUTE_PREFIX = 'step_'
    if (index_is_current_step(step_index))
      return
    router.push('./step_' + step_index)
  }

  function get_index_from_route_name() {
    const ROUTE_PREFIX = 'step_'
    return route.name.substring(ROUTE_PREFIX.length, route.name.length)
  }

  function index_is_current_step(index) {
    index = String(index)
    return (index == get_index_from_route_name())
  }

  const navbar_is_show = ref(general_store.isLargeScreen)
</script>
<template>
  <div :class="{'dark': general_store.use_darkmode,}">
    <OverlayConfirmedData />
    <BaseToastList />
    <div class="h-screen flex items-center justify-start gap-4 mr-8">
      <BaseBox class="ml-4 px-[1em] py-4 flex-col gap-8">
        <NuxtLink to="/" class="relative group">
          <button 
              class="p-1 relative rounded-lg hover:bg-green-200 text-black dark:text-white dark:hover:bg-green-500" 
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <div class="w-auto min-w-max py-2 px-4 absolute top-0 left-14 text-white bg-gray-900 rounded font-bold scale-0 group-hover:scale-100 transition-all duration-200">Back to Home</div>
          </button>
        </NuxtLink>
        <div class="relative group">
          <button 
              :disabled="aInput.confirmedData.length <= 0"
              class="p-1 relative rounded-lg hover:bg-green-200 text-black dark:text-white dark:hover:bg-green-500"
              @click="general_store.show_overlay('confirmed_list')"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
            </svg>  
            <div class="absolute inline-flex items-center justify-center w-7 h-7 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-1 -right-2 dark:border-gray-900" >
              {{ aInput.confirmedData.length }}
            </div>
          </button>
          <div class="w-auto min-w-max py-2 px-4 absolute top-0 left-14 text-white bg-gray-900 rounded font-bold scale-0 group-hover:scale-100 transition-all duration-200">All Comfirmed QA Pairs</div>
        </div>
        <NuxtLink class="relative group">
          <button disabled class="p-1 relative rounded-lg text-black dark:text-white" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div class="w-auto min-w-max py-2 px-4 absolute top-0 left-14 text-white bg-gray-900 rounded font-bold scale-0 group-hover:scale-100 transition-all duration-200">
            <div class="font-medium dark:text-white">
              <div class="text-sm text-gray-500 dark:text-gray-400">Welcome,</div>
              <div>Annotator 01!</div>
            </div>
          </div>
        </NuxtLink>
        <div class="relative group">
          <button 
              @click="general_store.use_darkmode = !general_store.use_darkmode" 
              class="p-1 relative rounded-lg hover:bg-green-200 text-black dark:text-white dark:hover:bg-green-500" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          </button>
          <div class="w-auto min-w-max py-2 px-4 absolute top-0 left-14 text-white bg-gray-900 rounded font-bold scale-0 group-hover:scale-100 transition-all duration-200">
            <div class="font-medium dark:text-white">
              <div class="text-sm text-gray-500 dark:text-gray-400">Welcome,</div>
              <div>Toggle Color Mode</div>
            </div>
          </div>

        </div>

      </BaseBox>
      
      <div class="absolute w-full h-full dark:bg-midnight-100 -z-50"> </div>

      <div class="w-full h-screen flex-grow">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useAnnotationInputStore } from "~/stores/annotationInput"
  import { useGeneralStore } from "~/stores/generalStore"

  const aInput = useAnnotationInputStore()
  const general_store = useGeneralStore()
</script>
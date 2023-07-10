<template>
  <div 
      :class="`flex gap-4 items-center max-w-xs p-4 mb-4 text-gray-500 bg-${toastBackgroundColor}-200 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`" 
      role="alert">
    <div v-if="toast.type=='success'" class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
    </div>
    <div v-else class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
      </svg>
      <span class="sr-only">Error icon</span>
    </div>
    <div class="text-sm font-normal">{{ toast.content }}</div>
    <button 
      type="button" 
      @click="generalStore.toast_list.splice(generalStore.toast_list.indexOf(props.toast), 1)"
      :class="`ml-auto -mx-1.5 -my-1.5 bg-${toastBackgroundColor}-100 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-${toastBackgroundColor}-200 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`" 
      data-dismiss-target="#toast-success" 
      aria-label="Close">
        <span class="sr-only select-none">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
  </div>
</template>

<script setup>
  import { useGeneralStore} from '~/stores/generalStore'
  const props = defineProps({
    toast: Object,
  })
  const generalStore = useGeneralStore()


  const style = {'success': {
      'background-color': 'green'
    },
    'error': {
      'background-color': 'red'
    }
  };

  const toastBackgroundColor = computed(() => {
    return style[props.toast.type]['background-color'] || 'white'
  })

  // Automatically Remove toast after a certain amount of time
  setTimeout(
    () => { 
      if (generalStore.toast_list.indexOf(props.toast) < 0) return
      generalStore.toast_list.splice(generalStore.toast_list.indexOf(props.toast), 1) 
    }
    , 30000);

</script>
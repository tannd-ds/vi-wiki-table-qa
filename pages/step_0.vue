<template>
    <div class="flex flex-row justify-center h-full">
      <div 
        class="flex items-center justify-center w-1/2"
      >
        <label 
          v-if="!upload_success"
          for="dropzone-file" 
          @dragenter.prevent="toggle_dropzone" 
          @dragleave.prevent="toggle_dropzone"
          @dragover.prevent
          @drop.prevent="read_dropped_file"
          class="
            w-full h-2/3
            flex flex-col items-center justify-center 
            border-2 border-gray-300 border-dashed
            rounded-lg 
            cursor-pointer 
            bg-gray-50 hover:bg-gray-100 
            dark:bg-midnight-100 dark:hover:bg-midnight-200
            dark:border-gray-600 dark:hover:border-gray-500 
          "
          :class="{'dark:bg-gray-950': dropzone_active, }"
        >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">.JSON Files that we gave you</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" accept="application/json" @change="read_selected_file"/>
        </label>
        <div 
          v-else
          class="
            w-full h-2/3
            flex flex-col items-center justify-center 
            border-2 border-gray-300 
            rounded-lg 
            cursor-pointer 
            bg-gray-50
            dark:text-gray-100
            dark:bg-midnight-100
            dark:border-gray-600
          "
        >
          <div class="flex flex-col gap-2 items-center justify-center pt-5 pb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
            </svg>
            <span>
              Your file is read successfully!
            </span>
            <BaseButton>
              <div class="group flex flex-row gap-2 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
                <span>
                  To Next Step!
                </span>
              </div>
            </BaseButton>
          </div>
        </div>
      </div>

    </div>
</template>

<script setup>
  import { useGeneralStore } from '~/stores/generalStore';
  import { useAnnotationInputStore } from '~/stores/annotationInput';

  const aInput = useAnnotationInputStore()

  definePageMeta({
    layout: 'custom',
  })

  const dropzone_active = ref(false)
  const upload_success  = ref(false)

  function toggle_dropzone() {
    dropzone_active.value = !dropzone_active.value
  }

  const read_dropped_file = (event) => {
    toggle_dropzone()
    const reader = new FileReader(); 
    reader.onload = (event) => {
      const contents = event.target.result; // Get the file contents
      try {
        const jsonData = JSON.parse(contents); // Parse the JSON data
        console.log(jsonData)
        return jsonData
      } catch (error) {
        console.log(error.message)
        useGeneralStore().show_toast('error', error.message)
        return
      }
    }
    const uploaded_file = event.dataTransfer.files[0]
    reader.readAsText(uploaded_file)
    upload_success.value = true
  }

  const read_selected_file = (event) => {
    toggle_dropzone()
    const reader = new FileReader(); 
    reader.onload = (event) => {
      const contents = event.target.result; // Get the file contents
      try {
        const jsonData = JSON.parse(contents); // Parse the JSON data
        console.log(jsonData)
        return jsonData
      } catch (error) {
        console.log(error.message)
        useGeneralStore().show_toast('error', error.message)
        return
      }
    }
    const uploaded_file = event.target.files[0]
    reader.readAsText(uploaded_file)
    upload_success.value = true
  }

</script>
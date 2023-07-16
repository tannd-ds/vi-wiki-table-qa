<template>
  <div
    v-html="processed_html" 
    :id="$style.wikitable"
    class="max-h-[80vh] max-w-[60vw] rounded-xl shadow-md overflow-auto dark:shadow-midnight-500"
  ></div>
</template>

<script setup>
  const props = defineProps({
    table_data: String,
  })
  const processed_html = ref(props.table_data)
  // Remove default styles
  processed_html.value = processed_html.value.replace(/style= ?"([\w-]+: ?[\w#]+;? ?)+"/g, '')
  processed_html.value = processed_html.value.replace(/class= ?"[\w- ]+"/g, '')
  // Remove 'href' attribute (prevents redirect to unwanted sites)
  processed_html.value = processed_html.value.replace(/href ?= ?/g, '')
  
  // Apply new styles
  processed_html.value = processed_html.value.replace(/<tr/g, '<tr class="bg-white border-b cursor-pointer dark:bg-midnight-100 dark:text-gray-100 dark:border-midnight-500"')
  processed_html.value = processed_html.value.replace(/<th/g, '<th class="px-6 py-4 text-gray-700 bg-gray-50 dark:bg-midnight-200 dark:text-gray-300"')
  processed_html.value = processed_html.value.replace(/<td/g, '<td class="px-6 py-4 hover:bg-gray-200 dark: dark:hover:bg-midnight-300"')

</script>

<style module>
  #wikitable {
    width: 100%;
    font-size: 0.875rem;
    line-height: 1.5rem;
  }
</style>
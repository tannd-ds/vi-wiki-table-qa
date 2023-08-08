<template>
  <div
    v-html="computed_html" 
    :id="$style.wikitable"
    class="max-h-[80vh] max-w-[90vw] lg:max-w-[60vw] rounded-xl shadow-md overflow-auto dark:shadow-midnight-500"
  ></div>
</template>

<script setup>
  const props = defineProps({
    table_data: String,
  })

  const process_html = (raw_html) => {
    let processed_html = raw_html
    // Remove default styles
    processed_html = processed_html.replace(/style ?= ?"([\w- ]+: ?[\w#% ]+;)+"/g, '')
    processed_html = processed_html.replace(/class= ?"[\w- ]+"/g, '')
    // Remove 'href' attribute (prevents redirect to unwanted sites)
    processed_html = processed_html.replace(/href ?= ?/g, '')
    
    // Apply new styles
    processed_html = processed_html.replace(/<tr/g, '<tr class="bg-white border-b cursor-pointer dark:bg-midnight-100 dark:text-gray-100 dark:border-midnight-500"')
    processed_html = processed_html.replace(/<th/g, '<th class="p-2 lg:px-6 lg:py-4 text-gray-700 bg-gray-50 dark:bg-midnight-200 dark:text-gray-300"')
    processed_html = processed_html.replace(/<td/g, '<td class="p-2 lg:px-6 lg:py-4 hover:bg-gray-200 dark:hover:bg-midnight-300"')
    return processed_html
  }

  const computed_html = computed(() => process_html(props.table_data))

</script>

<style module>
  #wikitable {
    width: 100%;
  }
  #wikitable *{
    @apply text-xs lg:text-base;
    font-size: 0.875rem;
    line-height: 1.5rem;
  }
</style>
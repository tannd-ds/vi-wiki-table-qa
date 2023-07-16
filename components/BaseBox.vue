<template>
  <div 
    class="max-h-[90vh] flex justify-center bg-white shadow-md rounded-2xl mb-4 dark:bg-midnight-100 dark:shadow-midnight-500" 
    :class="{'px-8 py-6': !override_bg}"
  >
    
    <slot></slot>
  </div>
</template>

<script setup>
  const props = defineProps({
    override_bg: Boolean,
  })
</script>
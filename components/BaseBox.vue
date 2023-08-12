<template>
  <div
    class="mb-4 flex max-h-[90vh] justify-center rounded-2xl bg-white shadow-md dark:bg-midnight-100 dark:shadow-midnight-500"
    :class="{ 'px-8 py-6': !override_bg }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  override_bg: Boolean,
});
</script>

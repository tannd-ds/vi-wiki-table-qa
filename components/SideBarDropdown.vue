<script setup>

const route = useRoute();
const items = ref([
  { label: 'Item 1', action: '' },
  { label: 'Item 2', action: '' },
]);

onBeforeMount(() => {
  console.log(route.name);

  if (route.name === "cross_validation")
    items.value = useCrossValidationStore().sidebar_dropdown_items;
})
</script>

<template>
  <UDropdown
      class="mb-4"
      :items="items"
      :popper="{ placement: 'right' }"
      mode="hover"
  >
    <UTooltip
        text="Reload File and Things"
        :popper="{ placement: 'right' }"
        :close-delay="500"
    >
      <UButton size="lg">
        <UIcon name="i-heroicons-adjustments-horizontal" />
      </UButton>
    </UTooltip>

    <template #account="{ item }">
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

  </UDropdown>
</template>

<style scoped>

</style>
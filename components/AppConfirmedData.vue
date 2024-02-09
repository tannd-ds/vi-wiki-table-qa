<script setup>
const route = useRoute();
</script>

<template>
  <CVConfirmedData v-if="route.name === 'cross_validation'" />
  <CreateConfirmedData v-else-if="route.name === 'step_0'" />
  <div v-else> Nothing </div>
</template>
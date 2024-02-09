<template>
  <div>
    <Head>
      <Title>ViWiki Table</Title>
    </Head>
    <div
      class="flex w-full flex-col items-center justify-center gap-8 lg:flex-row"
    >
      <UButton @click="router.push('/create')">Create QAs</UButton>
      <UButton @click="router.push('/cross_validation')">Answer Question</UButton>
      <UButton disabled @click="router.push('/validation')">Check QAs</UButton>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});

const general_store = useGeneralStore();

const route = useRoute();
const router = useRouter();
</script>

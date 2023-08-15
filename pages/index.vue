<template>
  <div>
    <Head>
      <Title>ViWiki Table</Title>
    </Head>
    <div
      class="flex w-full flex-col items-center justify-center gap-8 lg:flex-row"
    ></div>
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

import { useAnnotationInputStore } from "~/stores/annotationInput";
import { useGeneralStore } from "~/stores/generalStore";

const aInput = useAnnotationInputStore();
const general_store = useGeneralStore();

const route = useRoute();
const router = useRouter();
watchEffect(() => {
  router.push("/step_" + general_store.current_step);
  const redirect_to = general_store.check_step(route.name);
  if (redirect_to != route.name) router.push(redirect_to);
});
</script>

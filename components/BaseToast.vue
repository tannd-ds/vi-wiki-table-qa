<template>
  <div
    class="mx-auto flex w-full min-w-[20em] max-w-sm cursor-pointer overflow-hidden rounded-lg bg-white shadow-md dark:bg-zinc-800"
    @click="
      generalStore.toast_list.splice(
        generalStore.toast_list.indexOf(props.toast),
        1,
      )
    "
  >
    <div
      class="flex w-14 items-center justify-center"
      :class="{
        'bg-green-500': props.toast.type == 'success',
        'bg-red-500': props.toast.type == 'error',
      }"
    >
      <svg
        class="h-6 w-6 fill-current text-gray-200"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          v-if="props.toast.type == 'success'"
          d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
        />
        <path
          v-if="props.toast.type == 'error'"
          d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"
        />
      </svg>
    </div>

    <div class="-mx-3 px-4 py-2">
      <div class="mx-3">
        <span
          class="font-semibold"
          :class="{
            'text-green-500 dark:text-green-400': props.toast.type == 'success',
            'text-red-500 dark:text-red-400': props.toast.type == 'error',
          }"
        >
          {{
            props.toast.type.substring(0, 1).toUpperCase() +
            props.toast.type.substring(1, props.toast.type.length)
          }}
        </span>
        <p class="text-sm text-gray-600 dark:text-gray-200">
          {{ props.toast.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  toast: Object,
});
const generalStore = useGeneralStore();

// Automatically Remove toast after a certain amount of time
setTimeout(() => {
  if (generalStore.toast_list.indexOf(props.toast) < 0) return;
  generalStore.toast_list.splice(
    generalStore.toast_list.indexOf(props.toast),
    1,
  );
}, 3000);
</script>

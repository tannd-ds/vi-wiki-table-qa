<template>
  <label
    :for="id"
    @dragenter.prevent="toggle_dropzone"
    @dragleave.prevent="toggle_dropzone"
    @dragover.prevent
    @drop.prevent="read_dropped_file"
    class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-midnight-100 dark:text-gray-200"
    :class="[
      state
        ? 'border-solid'
        : 'border-dashed hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-midnight-200',
      { 'bg-gray-200 dark:bg-zinc-700': dropzone_active },
    ]"
  >
    <slot name="default" v-if="!state">Upload your file</slot>
    <slot name="uploaded" v-else>Finish!</slot>
    <input
      :id="id"
      type="file"
      class="hidden"
      accept="application/json"
      @change="read_selected_file"
    />
  </label>
</template>

<script setup>
const props = defineProps({
  id: {
    required: true,
  },
  initState: {
    required: true,
  },
});
const emit = defineEmits(["updateFile"]);
const dropzone_active = ref(false);
const upload_success = ref(false);
const state = computed(() => {
  return props.initState || upload_success.value;
});

function toggle_dropzone() {
  dropzone_active.value = !dropzone_active.value;
}

const read_file = (uploaded_file, sourceType) => {
  toggle_dropzone();
  const reader = new FileReader();
  reader.onload = (event) => {
    const contents = event.target.result; // Get the file contents
    try {
      const jsonData = JSON.parse(contents); // Parse the JSON data
      emit("updateFile", { name: uploaded_file.name, data: jsonData });
      return jsonData;
    } catch (error) {
      console.log(error.message);
      upload_success.value = false;
    }
  };
  reader.readAsText(uploaded_file);
  upload_success.value = true;
};

const read_dropped_file = (event) => {
  const uploaded_file = event.dataTransfer.files[0];
  read_file(uploaded_file, "dropped");
};

const read_selected_file = (event) => {
  const uploaded_file = event.target.files[0];
  read_file(uploaded_file, "selected");
};
</script>
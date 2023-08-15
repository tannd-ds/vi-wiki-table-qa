<template>
  <div>
    <div class="relative mb-6 mt-2">
      <component
        :is="is"
        class="peer w-full appearance-none rounded-lg bg-gray-100 px-3 pb-3 leading-tight text-midnight-200 outline-none placeholder:text-transparent focus:outline-green-400 dark:bg-midnight-200 dark:text-gray-200"
        :class="[has_label ? 'pt-5' : 'pt-3']"
        :id="id"
        :type="type"
        :value="modelValue"
        placeholder=" "
        :rows="is == `textarea` ? 10 : 1"
        @input="$emit('update:modelValue', $event.target.value)"
        spellcheck="false"
        autocomplete="off"
        aria-autocomplete="none"
      >
        <slot></slot>
      </component>
      <label
        v-if="has_label"
        class="absolute -top-3 left-2 mb-2 rounded bg-green-500 px-2 text-sm font-bold text-midnight-100 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:bg-green-500 peer-focus:text-sm peer-focus:font-bold peer-focus:text-midnight-100 dark:bg-green-400 dark:text-midnight-100 peer-focus:dark:bg-green-400 peer-focus:dark:text-midnight-100"
        :for="id"
      >
        {{ label_name }}
      </label>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  is: {
    type: String,
    default: "input",
  },
  type: String,
  id: String,
  placeholder: String,
  label_name: String,
});
defineEmits(["update:modelValue"]);

const has_label = computed(() => {
  return props.label_name != null;
});
</script>

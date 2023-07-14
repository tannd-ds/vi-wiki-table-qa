<template>
    <div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2 dark:text-white" for="password">
          {{ label_name }}
        </label>
        <component
          :is="is" 
          class="appearance-none border-b-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-midnight-100 dark:rounded-lg dark:border-gray-500 dark:text-gray-100" 
          :id="id" 
          :type="type" 
          :value="modelValue"
          :rows="is == `textarea` ? 10 : 1"
          @input="$emit('update:modelValue', $event.target.value)"
          :placeholder="placeholder"
          spellcheck="false" 
          autocomplete="off" 
          aria-autocomplete="none"
        />
      </div>
    </div>
</template>

<script setup>
    defineProps({
        modelValue: String,
        is: {
          type: String,
          default: 'input',
        },
        type: String,
        id: String,
        placeholder: String,
        label_name: String,
    })
    defineEmits(['update:modelValue'])

</script>
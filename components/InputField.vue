<template>
    <div>
      <div class="mt-2 mb-6 relative">
        <component
          :is="is" 
          class="
            appearance-none rounded-lg
            w-full p-3
            text-gray-700 leading-tight focus:outline-green-400 
            dark:bg-midnight-200 dark:border-gray-500 dark:text-gray-100
            peer
          " 
          :id="id" 
          :type="type" 
          :value="modelValue"
          :rows="is == `textarea` ? 10 : 1"
          @input="$emit('update:modelValue', $event.target.value)"
          spellcheck="false" 
          autocomplete="off" 
          aria-autocomplete="none"
        >
          <slot></slot>
        </component>
        <label 
          class="
            px-2
            absolute top-3 left-2 peer-focus:-top-3 peer-focus:bg-midnight-100
            block 
            text-gray-700 text-sm font-bold mb-2 dark:text-gray-400 peer-focus:text-gray-200
            transition-all
          " 
          :for="id"
        >
          {{ label_name }}
        </label>
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
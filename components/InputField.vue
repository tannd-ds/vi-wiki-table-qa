<template>
    <div>
      <div class="mt-2 mb-6 relative">
        <component
          :is="is" 
          class="
            appearance-none placeholder:text-transparent rounded-lg
            w-full px-3 pb-3
            text-gray-700 leading-tight outline-none focus:outline-green-400
            dark:bg-midnight-200 dark:border-gray-500 dark:text-gray-100
            peer
          " 
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
          class="
            px-2 mb-2
            absolute left-2 -top-3
            bg-green-500 dark:bg-green-400
            text-gray-700 text-sm font-bold dark:text-midnight-100
            rounded
            transition-all
            peer-placeholder-shown:font-normal
            peer-placeholder-shown:text-gray-500
            peer-placeholder-shown:bg-transparent
            peer-placeholder-shown:top-4
            peer-placeholder-shown:text-base
            peer-focus:-top-3
            peer-focus:bg-green-500 peer-focus:dark:bg-green-400
            peer-focus:text-gray-700 peer-focus:text-sm peer-focus:font-bold peer-focus:dark:text-midnight-100
          "
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
          default: 'input',
        },
        type: String,
        id: String,
        placeholder: String,
        label_name: String,
    })
    defineEmits(['update:modelValue'])

    const has_label = computed(() => {
      return props.label_name != null
    })
</script>
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
          " 
          :id="id" 
          :type="type" 
          :value="modelValue"
          :rows="is == `textarea` ? 10 : 1"
          @input="$emit('update:modelValue', $event.target.value)"
          @focus="is_input_focused = true"
          @blur="is_input_focused = false"
          spellcheck="false" 
          autocomplete="off" 
          aria-autocomplete="none"
        >
          <slot></slot>
        </component>
        <label 
          class="
            px-2
            absolute left-2
            text-gray-700 text-sm font-bold mb-2
            transition-all
          "
          :class="{
            '-top-3 rounded bg-green-500 dark:bg-green-400 text-white dark:text-midnight-100': is_label_slide_up,
            'top-3 dark:text-gray-400': !is_label_slide_up,
          }"
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

    const is_input_focused = ref(false)
    const is_label_slide_up = computed(() => {
      return is_input_focused.value | props.modelValue != ""
    })
</script>
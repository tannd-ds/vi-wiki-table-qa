<template>
  <div>
    <button 
      type="button"
      class="
        py-2.5 px-5
        inline-flex items-center justify-center
        overflow-hidden 
        text-sm font-medium text-midnight-100 hover:text-gray-200 
        bg-green-500 hover:bg-green-700
        rounded-xl 
        border--500
        focus:outline-1 focus:outline-offset-2 focus:outline-green-300
      " 
      >
        <slot>
            Button
        </slot>
    </button>
  </div>

</template>

<script setup>
</script>
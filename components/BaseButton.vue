<template>
  <div>
    <button 
      type="button"
      class="
        inline-flex items-center justify-center
        p-0.5 overflow-hidden 
        text-sm font-medium text-gray-900 hover:text-white 
        bg-gradient-to-br from-green-400 to-blue-600 group group-hover:from-green-400 group-hover:to-blue-600
        rounded-lg 
        border--500
        focus:outline-none
      " 
      >
      <span 
        class="
          flex items-center justify-center gap-2
          px-5 py-2.5 
          bg-white 
          group-hover:bg-opacity-0
          rounded-md 
          transition-all ease-in duration-75 
        ">
        <slot>
            Button
        </slot>
      </span>
    </button>
  </div>

</template>

<script setup>
</script>
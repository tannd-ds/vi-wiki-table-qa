<template>
  <BaseBox class="ml-4 w-20 flex-col gap-8 px-[1em]">
    <div class="inline-flex flex-col items-center gap-4 -space-y-px text-sm">
      <div class="font-bold dark:text-gray-400">Step</div>
      <ul class="flex flex-col">
        <li
          v-for="(step_info, step_index) in step_info"
          class="flex flex-col items-center"
          :class="{ 'opacity-30': step_index > current_step, }"
        >
          <div
            v-if="step_index > 0"
            class="my-1 font-bold leading-3 text-gray-200 dark:text-zinc-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-6 w-6">
              <line stroke-width="2" stroke-linecap="square" stroke-linejoin="undefined" y2="24" x2="12" y1="0" x1="12" fill="none" />
            </svg>
          </div>
          <UTooltip :text="step_info.description" :popper="{ placement: 'right' }">
            <button
              :disabled="step_index > current_step"
              @click="direct_step(step_index)"
              class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 font-mono text-lg font-bold leading-tight transition-all duration-200 dark:border-zinc-700"
              :class="{
                'bg-white text-gray-500 hover:bg-gray-100 hover:text-midnight-100 dark:bg-midnight-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200':
                  (current_step >= step_index) &
                  !index_is_current_step(step_index),
                'bg-green-500 text-midnight-100 hover:text-midnight-100 dark:text-midnight-200':
                  index_is_current_step(step_index),
                'cursor-not-allowed bg-white text-gray-500 dark:bg-midnight-100 dark:text-gray-400':
                  current_step < step_index,
              }"
            >
              {{ step_info.id }}
            </button>
          </UTooltip>
        </li>
      </ul>
    </div>
  </BaseBox>
</template>

<script setup>

const props = defineProps({
  step_info: {
    type: Array,
    required: true,
  },
  n_steps: {
    type: Number,
    required: false,
  },
  current_step: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const route = useRoute();

function direct_step(step_index) {
  if (index_is_current_step(step_index)) return;
  router.push("./step_" + step_index);
}

function get_index_from_route_name() {
  const ROUTE_PREFIX = "step_";
  return route.name.substring(ROUTE_PREFIX.length, route.name.length);
}

function index_is_current_step(index) {
  index = String(index);
  return index == get_index_from_route_name();
}
</script>

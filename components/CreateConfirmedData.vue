<script setup>
const aInput = useAnnotationInputStore();

const confirmed_table_is_show = ref([]);
for (let i = 0; i < aInput.anno_file_data.length; i++) {
  confirmed_table_is_show.value.push(true);
}
const filter_data = computed(() => {
  return aInput.confirmedData.filter(
      (confirmed) => confirmed_table_is_show.value[confirmed.table_id],
  );
});

function toggle_show_table(table_index) {
  confirmed_table_is_show.value[table_index] =
      !confirmed_table_is_show.value[table_index];
}
function toggle_show_table_only(table_index) {
  for (let i = 0; i < confirmed_table_is_show.value.length; i++)
    confirmed_table_is_show.value[i] = false;
  confirmed_table_is_show.value[table_index] = true;
}
</script>

<template>
  <BaseConfirmedData
    :qa_list="filter_data"
    :table_list="aInput.anno_file_data"
  >
    <template #filter>
      <ul class="my-3 flex gap-2 dark:text-gray-200">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
        </li>
        <li
          v-for="(show_table, show_table_index) in confirmed_table_is_show"
          :key="show_table_index"
          class="flex h-full min-h-[2em] min-w-[2em] cursor-pointer items-center justify-center rounded border border-gray-200 px-2 text-xs dark:border-zinc-700"
          :class="[
            confirmed_table_is_show[show_table_index]
              ? 'bg-green-300 hover:bg-green-200 dark:bg-green-600 dark:text-midnight-100 dark:hover:bg-green-500'
              : 'hover:bg-gray-100 dark:text-zinc-500 dark:hover:bg-zinc-700',
          ]"
          @click.exact="toggle_show_table(show_table_index)"
          @click.ctrl.exact="toggle_show_table_only(show_table_index)"
        >
          <UTooltip :text="`Table ${show_table_index}. Ctrl + Click to show this Table only`" :popper="{ arrow: false }">
            {{ show_table_index }}
          </UTooltip>
        </li>
      </ul>
    </template>

  </BaseConfirmedData>
</template>
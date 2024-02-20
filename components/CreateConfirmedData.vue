<script setup>
const aInput = useAnnotationInputStore();

const base_confirmed_state = ref(0);

const confirmed_table_is_show = ref([]);
for (let i = 0; i < aInput.anno_file_data.length; i++) {
  confirmed_table_is_show.value.push(true);
}
const filter_data = computed(() => {
  return aInput.confirmedData.filter(
      (confirmed) => confirmed_table_is_show.value[confirmed.table_id],
  );
});

function get_actual_data_index(index) {
  let real_index = 0;
  for (let i = 0; i < aInput.confirmedData.length; i++) {
    if (filter_data.value[index] === aInput.confirmedData[i]) {
      return i;
    }
  }
  useGeneralStore().show_toast('error', 'Cannot find the real index of the data.');
  return -1;
}

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
    @save:qa_list="() => aInput.update_confirmed(null)"
    @download:qa_list="() => aInput.download_confirmed()"
    @update:state="(new_state) => base_confirmed_state = new_state"
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
        >
          <UTooltip
              :popper="{ arrow: false, placement: 'bottom-start' }"
          >
            <template #text>
              <span class="font-mono">
                <span class="text-green-500">Table {{ show_table_index }}. </span>
                <UKbd>Ctrl</UKbd> + <UKbd>Click</UKbd> to show this Table only.
              </span>
            </template>
            <div
              class="flex h-full min-h-[2em] min-w-[2em] cursor-pointer items-center justify-center rounded border border-gray-200 px-2 text-xs dark:border-zinc-700"
              :class="[
                confirmed_table_is_show[show_table_index]
                  ? 'bg-green-300 hover:bg-green-200 dark:bg-green-600 dark:text-midnight-100 dark:hover:bg-green-500'
                  : 'hover:bg-gray-100 dark:text-zinc-500 dark:hover:bg-zinc-700',
              ]"
              @click.exact="toggle_show_table(show_table_index)"
              @click.ctrl.exact="toggle_show_table_only(show_table_index)"
            >
              {{ show_table_index }}
            </div>
          </UTooltip>
        </li>
      </ul>
    </template>

    <template #edit_functions>
      <div class="flex flex-col gap-2">
        <UTooltip text="Save" :popper="{ placement: 'right'}">
          <UButton
              icon="i-heroicons-check"
              size="2xs"
              @click="() => aInput.update_confirmed(null)"
              class="flex items-center gap-1" />
        </UTooltip>

        <UTooltip text="Remove This QAs" :popper="{ placement: 'right'}">
          <UButton
              icon="i-heroicons-trash"
              size="2xs"
              color="red"
              @click="() => aInput.removeConfirmedByIndex(get_actual_data_index(base_confirmed_state.current_qa_index))"
              class="flex items-center gap-1" />
        </UTooltip>

      </div>
    </template>

    <template #statistics>
      <PieChart />
      <div class="flex w-full justify-around px-4 dark:text-gray-200">
        <div>
          <div class="text-4xl">
            <span v-if="aInput.anno_file_data.length < 10">0</span>
            <span>{{ aInput.anno_file_data.length }}</span>
          </div>
          <div class="text-gray-500">Tables</div>
        </div>
        <div>
          <div class="text-4xl">
            <span v-if="aInput.confirmedData.length < 10">0</span>
            <span>{{ aInput.confirmedData.length }}</span>
          </div>
          <div class="text-gray-500">Pairs</div>
        </div>
      </div>
    </template>

  </BaseConfirmedData>
</template>
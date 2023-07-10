<template>
  <div class="max-h-[85vh] max-w-[70vw] rounded-lg shadow-md overflow-auto">
    <table class="w-full text-sm text-left rounded">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th v-for="col_name in table[0]" scope="col" class="px-6 py-3">{{ col_name }}</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="row in table.slice(1, table.length+1)" class="bg-white border-b hover:bg-gray-200 cursor-pointer">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ row[0] }}
              </th>
              <td v-for="cell in row.slice(1, row.length+1)" class="px-6 py-4">
                {{ cell }}
              </td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script setup>
  defineProps({
    table: {
      type: Array,
      default: [[1, 2], [2, 3]],
    }
  })
</script>

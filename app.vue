<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  import { useAnnotationInputStore } from "~/stores/annotationInput"
  const aInput = useAnnotationInputStore()

  onMounted(async () => {
    aInput.loadConfirmedData()

    // Load tables saved on Github :)
    let github_data = await $fetch('https://raw.githubusercontent.com/tannd-ds/vi-wiki-table-qa/main/test.json')
    github_data = JSON.parse(github_data)
    let new_table = []
    for (let row_id in github_data) {
      let new_row = []
      for (let cell_id in github_data[row_id]) {
        new_row.push(github_data[row_id][cell_id])
      }
      new_table.push(new_row)
    }
    aInput.tables.push({
      'id': '0003',
      'content': new_table
    })
  })
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

</style>
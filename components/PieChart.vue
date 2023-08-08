<template>
  <div
    class="mt-8 px-8 flex flex-col gap-4 justify-center items-center"
  >
    <div>
      <div 
        class="
          group my-8 w-48 h-48 lg:w-72 lg:h-72 rounded-full relative flex justify-center items-center
        "
        :style="pie_drawing"
      >
        <div
          class="
            w-4/5 h-4/5
            flex flex-col justify-center items-center
            rounded-full
          bg-white dark:bg-midnight-100"
        >
          <span class="dark:text-gray-200">Total of</span>
          <span class="text-6xl font-bold dark:text-gray-200">{{ aInput.confirmedData.length }}</span>
          <span class="dark:text-gray-200">Pairs</span>
        </div>
        <!-- Annots -->
        <span
          v-for="(table, table_index) in counted" :key="table"
          class="
            absolute z-[1]
            p-2
            opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center
            shadow-zinc-800 dark:shadow-midnight-100 shadow-lg
            rounded
            transition-all duration-200
          "
          :style="{
            translate: `${pie_annot_translate[table_index][1]} ${pie_annot_translate[table_index][0]}`,
            backgroundColor: color_set[table_index]
          }"
        >
          <span class="text-xs">Table {{ table_index }}</span>
          <span class="text-sm font-bold">
            {{ Math.round(counted[table_index] / aInput.confirmedData.length * 1000) / 10 }} %
          </span>
        </span>
        
        <!-- Rounded end -->
        <span
          v-for="(table, table_index) in counted" :key="table"
          class="
            absolute w-[10%] h-[100%]
            flex flex-col justify-start items-center
          "
          :style="{ rotate: `${rotation_rate[table_index]}deg`, }"
        >
          <div 
            class="
              absolute w-full aspect-square 
              flex justify-end
              rounded-full
            "
            :style="{
              backgroundColor: color_set[table_index]
            }"
          >
            <div
              class="
                absolute -top-[8px] aspect-[1/2] h-full
                rounded-r-full
                border-r-8 border-y-8 border-white dark:border-midnight-100 box-content
              "
            />
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useAnnotationInputStore } from '~/stores/annotationInput';
  const aInput = useAnnotationInputStore()

  const color_set = ['#DDFFBB', '#B5F1CC', '#C7E9B0', '#C9F4AA', '#B9F3E4', '#fb8b24']
  const counted = ref({})
  const rotation_rate = ref({})
  
  for (let i = 0; i < aInput.anno_file_data.length; i++)
    counted.value[i] = 0
  for (let confirmed of aInput.confirmedData)
    counted.value[confirmed.table_id] += 1
  for (let i = 0; i < aInput.anno_file_data.length; i++)
    // remove counted.value[i] if its value is 0
    if (counted.value[i] == 0)
      delete counted.value[i]

  const pie_drawing = computed(() => {
    let current_begin_degree = 0
    let pie_conic_gradient_value = 'conic-gradient('
    for (let table_id in counted.value) {
      if (counted.value[table_id] == 0) continue
      // turn counted into degree
      let degree = counted.value[table_id] / aInput.confirmedData.length * 360 
      rotation_rate.value[table_id] = current_begin_degree + degree
      pie_conic_gradient_value += color_set[table_id] + ' ' + String(current_begin_degree) + 'deg ' + String(current_begin_degree + degree) + 'deg, '
      current_begin_degree += degree
    }
    // Remove extra ',' and add ')'
    pie_conic_gradient_value = pie_conic_gradient_value.substring(0, pie_conic_gradient_value.length - 2) + ')'
    return { background: pie_conic_gradient_value }
  })

  const pie_annot_translate = computed(() => {
    let annot_translate = {}
    let current_begin_radian = -Math.PI / 2
    let radius = 8.1
    for (let table_id in counted.value) {
      // turn counted into radian
      let radian = counted.value[table_id] / aInput.confirmedData.length * 2*Math.PI
      // Calculate X and Y trasformation using mathemetics
      let x_translate = String(Math.sin(current_begin_radian + radian / 2) * radius) + 'rem'
      let y_translate = String(Math.cos(current_begin_radian + radian / 2) * radius) + 'rem'
      annot_translate[table_id] = [x_translate, y_translate]
      current_begin_radian += radian
    }
    return annot_translate
  })
</script>
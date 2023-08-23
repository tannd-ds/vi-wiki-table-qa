<template>
  <BaseBox class="w-screen flex-col lg:max-w-[50vw]">
    <!-- Header -->
    <div
      class="my-4 flex items-center justify-center gap-4 p-4 text-4xl font-bold text-yellow-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 48 48"
      >
        <g fill="none" stroke="currentColor" stroke-width="4">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13 42h22l6-21l-10 5l-7-14l-7 14l-10-5l6 21Z"
          />
          <circle cx="7" cy="18" r="3" />
          <circle cx="24" cy="9" r="3" />
          <circle cx="41" cy="18" r="3" />
        </g>
      </svg>
      <div>LEADERBOARD</div>
    </div>

    <!-- Columns' name -->
    <div
      class="flex justify-between rounded pl-4 pr-8 text-sm dark:text-gray-200"
    >
      <div class="flex">
        <div class="mr-8 flex aspect-square w-8 items-center justify-center">
          Rank
        </div>
        <div class="flex items-center">
          <div>Name</div>
        </div>
      </div>
      <div class="hidden items-center lg:flex">Point</div>
    </div>

    <!-- List -->
    <ul class="overflow-auto lg:max-h-[80vh]">
      <li
        :class="[{ 'opacity-75': anno.n_confirmed == 0 }, 'flex gap-2']"
        v-for="(anno, rank) in annotators"
        :key="anno.id"
      >
        <div
          :class="[
            rank == 0
              ? 'to-indigo-500-500 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 py-6 text-gray-200 dark:from-teal-500 dark:via-blue-500 dark:to-indigo-500'
              : rank < N_LEADERS
              ? 'mt-2 bg-blue-500 py-4 text-gray-200'
              : 'py-4',
            'flex flex-grow justify-between rounded pl-4 dark:text-gray-200 lg:pr-8',
          ]"
        >
          <div class="flex">
            <div
              :class="[
                rank == 0 ? 'text-2xl font-black' : 'text-lg',
                'mr-8 flex aspect-square w-8 items-center justify-center',
              ]"
            >
              {{ rank + 1 }}
            </div>
            <div class="relative flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="mr-4 h-8 w-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                v-if="rank == 0"
                class="absolute right-3 top-2 h-4 w-4 rotate-45 text-yellow-300 dark:text-yellow-500 lg:-top-1"
              >
                <path
                  fill="currentColor"
                  d="m247.37 89.15l-37 113.33a8 8 0 0 1-11.71 4.39c-.23-.14-25.8-14.87-70.68-14.87s-70.45 14.73-70.7 14.88a8 8 0 0 1-11.68-4.4L8.62 89.12a12.11 12.11 0 0 1 16.9-14.62l50.19 25l41.92-69.66a12.11 12.11 0 0 1 20.74 0l41.92 69.66l50.21-25a12.1 12.1 0 0 1 16.87 14.66Z"
                />
              </svg>
            </div>

            <div class="flex flex-col justify-center">
              <div
                :class="[
                  rank < N_LEADERS ? 'text-lg font-bold' : '',
                  anno.name == anno_name ? 'italic' : '',
                ]"
              >
                {{ anno.name }}
              </div>
              <div class="flex items-center lg:hidden">
                {{ anno.n_confirmed }} P
              </div>
            </div>
          </div>
          <div class="hidden items-center lg:flex">
            {{ anno.n_confirmed }} P
          </div>
        </div>
      </li>
    </ul>
  </BaseBox>
</template>

<script setup>
const anno_name = useAnnotationInputStore().anno_name;
const client = useSupabaseClient();
const { data: annotators, error } = await useAsyncData(
  "annotators",
  async () => {
    const { data } = await client
      .from("annotators")
      .select("*")
      .order("n_confirmed", { ascending: false });
    return data;
  },
);

// const annotators = [
//   {
//     id: "fcce0a3d-a60c-41d2-83f7-b8d5912ca6b8",
//     name: "Bùi Hồng Sơn",
//     n_confirmed: 0,
//   },
//   {
//     id: "dbb7f232-f126-4f58-ab9b-998e4b2a52fe",
//     name: "Đỗ Nhật Tân",
//     n_confirmed: 0,
//   },
//   {
//     id: "cbc89b5f-8e0e-4b91-a9ae-c94aa542e956",
//     name: "Dương Thị Hồng Nhung",
//     n_confirmed: 0,
//   },
//   {
//     id: "5c4b2406-9ee8-45a3-8000-1e7eb7b51896",
//     name: "Huỳnh Thị Kim Ngân",
//     n_confirmed: 0,
//   },
//   {
//     id: "01e2b6c2-8e42-41c5-b55d-765edaaa256f",
//     name: "Lê Vy",
//     n_confirmed: 0,
//   },
//   {
//     id: "b7a0b9e3-f651-4329-aa1c-cd058c1bce43",
//     name: "Lưu Bảo Uyên",
//     n_confirmed: 0,
//   },
//   {
//     id: "c0a8adbb-df3e-4f1f-87a5-2e778fb7e952",
//     name: "Nguyễn Hữu Tuấn Minh",
//     n_confirmed: 0,
//   },
//   {
//     id: "18f447a1-2ce6-4339-8c39-8c1de6a88108",
//     name: "Nguyễn Kiến Bảo Thắng",
//     n_confirmed: 0,
//   },
//   {
//     id: "fe35601a-c345-4318-8a78-623918c0b9e6",
//     name: "Nguyễn Việt Khoa",
//     n_confirmed: 0,
//   },
//   {
//     id: "f4620ab5-ce56-4e69-9929-a757340e10ce",
//     name: "Phạm Gia Bảo",
//     n_confirmed: 0,
//   },
//   {
//     id: "f0f5dec2-72b6-44d3-87d1-92a4ba970036",
//     name: "Phạm Quang Dinh",
//     n_confirmed: 0,
//   },
//   {
//     id: "4f5bda38-2a45-4274-a1f8-10ff67e4142a",
//     name: "Thái Ngọc Diễm Trinh",
//     n_confirmed: 0,
//   },
//   {
//     id: "4ebfe890-2f2e-4335-8cf9-fef82c60f883",
//     name: "Trần Khôi Nguyên",
//     n_confirmed: 0,
//   },
//   {
//     id: "aeb544f9-e1a2-42cd-9ff8-263f57212862",
//     name: "Trần Nguyên Mẫn",
//     n_confirmed: 0,
//   },
//   {
//     id: "9dd50015-5b28-42b5-a5c1-6fd18c43dfa6",
//     name: "Trần Quang Dân",
//     n_confirmed: 0,
//   },
//   {
//     id: "11d6cc92-8624-4986-8b97-ec9462e18331",
//     name: "Trần Thị Phương Thảo",
//     n_confirmed: 0,
//   },
// ];

const N_LEADERS = 3;
</script>

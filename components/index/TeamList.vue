<template>
    <div class="w-1/2 m-auto flex flex-col items-center">
      <div class=" font-black text-center text-2xl pb-3">
        My Team
      </div>
      <ul role="list" class="divide-y divide-gray-100">
        <li v-for="person in people" :key="person.email" class="flex justify-between gap-x-6 py-5">
          <div class="flex gap-x-4">
            <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="person.imageUrl" alt="" />
            <div class="min-w-0 flex-auto">
              <p class="text-sm font-semibold leading-6 text-gray-900">{{ person.name }}</p>
              <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ person.email }}</p>
            </div>
          </div>
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <p class="text-sm leading-6 text-gray-900">{{ person.role }}</p>
            <p v-if="person.lastSeen" class="mt-1 text-xs leading-5 text-gray-500">
              Last seen <time :datetime="person.lastSeenDateTime">{{ person.lastSeen }}</time>
            </p>
            <div v-else class="mt-1 flex items-center gap-x-1.5">
              <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p class="text-xs leading-5 text-gray-500">Online</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="relative mt-5 rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
        Look interesting? 
        <a href="#" class="font-semibold text-emerald-600">
          <span class="absolute inset-0" aria-hidden="true"></span>
          Join My Team 
          <span aria-hidden="true">
            &rarr;
          </span>
        </a>
      </div>
    </div>
</template>

<script setup>
  const people = [
    {
      name: 'Tan Nhat Do (Me)',
      email: 'donhattan1012dev@gmail.com',
      role: 'Leader',
      imageUrl:
        '../assets/images/team-avatar/tan.jpg',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Tracy Nguyen',
      email: 'donhattan1012@gmail.com',
      role: 'Member',
      imageUrl:
        '../assets/images/team-avatar/tracy.jpg',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
  ]
</script>
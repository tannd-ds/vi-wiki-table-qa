<template>
  <div
    class="relative flex h-fit max-h-screen flex-col rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-zinc-800 dark:bg-midnight-100 sm:p-8 lg:max-h-[80vh] lg:w-[35vw]"
  >
    <div class="absolute right-4 top-4 flex items-center">
      <Popover class="relative">
        <PopoverButton
          tabindex="-1"
          class="cursor-pointer rounded p-2 outline-none hover:bg-gray-200 focus:outline-none dark:text-gray-200 dark:hover:bg-zinc-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </PopoverButton>
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <PopoverPanel
            class="fixed right-0 z-10 mt-3 w-screen max-w-md transform px-4 outline-none focus:outline-none sm:px-0 lg:absolute lg:max-w-lg"
          >
            <div
              class="relative grid gap-4 rounded-lg border-2 border-yellow-500 bg-white p-7 text-sm transition-all dark:bg-zinc-800"
            >
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6 text-gray-900 dark:text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>

                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                  How does it work?
                </h2>
              </div>

              <ul
                class="w-full list-inside list-disc space-y-2 text-gray-500 dark:text-gray-400"
              >
                <li>
                  If a Hint has a <span class="text-green-500">Green Used</span>
                  it's free for your usage!
                </li>
                <li>
                  If a Hint has a
                  <span class="text-yellow-500">Yellow Used</span> it's about to
                  be disabled.
                </li>
                <li>
                  A
                  <span class="text-red-500">Red Hint</span> is disabled, and
                  you can't choose it now. Choose other hints to decrease this
                  proportion first (probably make it
                  <span class="text-red-500">lower than 25%</span>)
                </li>
              </ul>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
      <button
        type="button"
        class="cursor-pointer rounded p-2 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-zinc-700"
        @click="general_store.close_overlay()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <div class="flex items-center gap-4 p-4 text-2xl font-bold dark:text-white">
      <div
        class="rounded bg-yellow-300 p-2 text-yellow-600 dark:bg-yellow-500 dark:text-yellow-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-dasharray="46"
            stroke-dashoffset="46"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 17H9V14.1973C7.2066 13.1599 6 11.2208 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9C18 11.2208 16.7934 13.1599 15 14.1973V17z"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.4s"
              values="46;0"
            />
          </path>
          <rect width="6" height="0" x="9" y="20" fill="currentColor" rx="1">
            <animate
              fill="freeze"
              attributeName="height"
              begin="0.5s"
              dur="0.2s"
              values="0;2"
            />
          </rect>
        </svg>
      </div>
      <div>
        <div>All Hints</div>
        <div class="text-sm font-normal text-gray-700 dark:text-gray-500">
          Every Hints possible
        </div>
      </div>
    </div>

    <HintCheckboxList
      :n_displayed="aInput.hints.all_hints.length"
      :verbose="true"
    />
  </div>
</template>

<script setup>
const aInput = useAnnotationInputStore();
const general_store = useGeneralStore();
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
</script>

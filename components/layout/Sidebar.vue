<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-40 md:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-1 flex-col bg-purple"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div class="flex flex-shrink-0 items-center px-4">
                  <Logo class="h-8 w-auto" />
                </div>
                <nav class="mt-5 space-y-1 px-2">
                  <NuxtLink
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.to"
                    :class="[
                      item.current
                        ? 'bg-purple '
                        : ' hover:bg-purple hover:bg-opacity-75',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      class="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </NuxtLink>
                </nav>
              </div>
              <div class="flex flex-shrink-0 border-t border-indigo-800 p-4">
                <a href="#" class="group block flex-shrink-0">
                  <div class="flex items-center">
                    <div>
                      <img
                        class="inline-block h-10 w-10 rounded-full"
                        src=""
                        alt=""
                      />
                    </div>
                    <div class="ml-3">
                      <p class="text-base font-medium">Anon</p>
                      <p
                        class="text-sm font-medium text-indigo-200 group-hover:"
                      >
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0" aria-hidden="true">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex min-h-0 flex-1 flex-col bg-light-grey">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <Logo class="h-8 w-auto" />
          </div>
          <nav class="mt-5 flex-1 space-y-1 px-2">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              :class="[
                item.current
                  ? 'bg-salmon/40 text-purple '
                  : ' hover:bg-purple/10 hover:bg-opacity-75 transition-all text-purple/50',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              ]"
            >
              <component
                :is="item.icon"
                class="mr-3 h-6 w-6 flex-shrink-0"
                :class="[item.current ? 'text-purple' : 'text-purple/50']"
                aria-hidden="true"
              />
              {{ item.name }}
            </NuxtLink>
          </nav>
        </div>
        <div class="flex flex-shrink-0 border-t p-4">
          <div class="flex items-center">
            <div>
              <img
                class="inline-block h-9 w-9 rounded-full"
                src="https://picsum.photos/200/300"
                alt=""
              />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium">
                {{ user!.email ?? "John Doe" }}
              </p>
              <button @click="logout">
                <p class="text-xs font-medium text-indigo-200 group-hover:">
                  Logout
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-1 flex-col md:pl-64">
      <div
        class="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden"
      >
        <button
          type="button"
          class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <main class="flex-1">
        <div class="w-full h-screen bg-light-grey p-4">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { useModal } from "tailvue";

const user = useSupabaseUser();
const auth = useSupabaseAuthClient();
const { $modal } = useNuxtApp();

const sidebarOpen = ref(false);

const navigation = [
  { name: "Dashboard", to: "/dashboard", icon: HomeIcon, current: true },
  { name: "Shop", to: "/account-edit", icon: UsersIcon, current: false },
];

const logout = async () => {
  $modal.show({
    type: "danger",
    title: "Are you sure you want to log out?",
    body: " ",
    primary: {
      label: "Log Out",
      theme: "red",
      action: () => auth.auth.signOut(),
    },
    secondary: {
      label: "Return",
      theme: "white",
      action: () => {},
    },
  });
};
</script>

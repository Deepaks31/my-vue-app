<template>
  <v-app>
    <!-- Conditionally render layout components based on route -->
    <template v-if="!isAuthRoute">
      <Sidebar />
      <v-main class="bg-background">
        <TopHeader @toggle-notifications="isNotificationsOpen = true" />
        <router-view @open-add-drawer="isAddEditOpen = true" />

        <NotificationsDrawer v-model="isNotificationsOpen" />
        <AddEditDrawer v-model="isAddEditOpen" />
      </v-main>
    </template>

    <!-- For Auth Routes, just render the router-view -->
    <template v-else>
      <v-main class="bg-background pa-0">
        <router-view />
      </v-main>
    </template>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/authStore'
import Sidebar from './components/Sidebar.vue'
import TopHeader from './components/TopHeader.vue'

import NotificationsDrawer from './components/drawers/NotificationsDrawer.vue'
import AddEditDrawer from './components/drawers/AddEditDrawer.vue'

const route = useRoute()
const authStore = useAuthStore()

// Initialize auth store to decode JWT on startup
onMounted(() => {
  authStore.initialize()
})

const isAuthRoute = computed(() => {
  return route.path === '/' || route.path === '/signup'
})

const isNotificationsOpen = ref(false)
const isAddEditOpen = ref(false)
</script>

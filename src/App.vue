<template>
  <v-app>
    <Sidebar />

    <v-main class="bg-background">
      <TopHeader @toggle-notifications="isNotificationsOpen = true" />
      <!-- Main Dynamic Content Area via Vue Router -->
      <router-view @open-add-drawer="isAddEditOpen = true" />

      <NotificationsDrawer v-model="isNotificationsOpen" />
      <AddEditDrawer v-model="isAddEditOpen" />

    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import TopHeader from './components/TopHeader.vue'

import NotificationsDrawer from './components/drawers/NotificationsDrawer.vue'
import AddEditDrawer from './components/drawers/AddEditDrawer.vue'

const isNotificationsOpen = ref(false)
const isAddEditOpen = ref(false)
</script>

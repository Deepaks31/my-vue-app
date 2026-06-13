<template>
  <v-app-bar elevation="0" color="white" height="56" class="border-bottom">
    
    <!-- Left: EigenSecure Logo placeholder -->
    <div class="px-4 d-flex align-center border-right h-100">
      <v-icon icon="mdi-shield-star" color="red-darken-3" class="mr-2"></v-icon>
      <span class="text-caption font-weight-bold" style="color: #666;">EigenSecure. <span style="font-weight: 500; color: #999;">Enterprise TruRisk™ Platform</span></span>
    </div>

    <!-- Empty space where breadcrumbs were -->
    <div class="px-6 d-flex align-center h-100 flex-grow-1"></div>
    
    <v-spacer></v-spacer>
    
    <!-- Right Actions -->
    <div class="d-flex align-center h-100 pr-4">
      <v-btn icon="mdi-help-circle-outline" size="small" variant="text" color="blue-darken-2"></v-btn>
      <v-btn icon size="small" variant="text" color="blue-darken-2" class="position-relative" @click="$emit('toggle-notifications')">
        <v-icon icon="mdi-bell-outline"></v-icon>
        <v-badge content="2" color="red" dot class="position-absolute" style="top: 8px; right: 8px;"></v-badge>
      </v-btn>

      <!-- Toolkit Mega Menu -->
      <ToolkitMenu />
      
      <!-- User Dropdown Menu -->
      <v-menu location="bottom end">
        <template v-slot:activator="{ props }">
          <v-avatar v-bind="props" color="grey-lighten-2" size="28" class="mr-4 cursor-pointer">
            <span class="text-caption font-weight-bold text-grey-darken-2">ST</span>
          </v-avatar>
        </template>
        <v-card min-width="200">
          <v-list>
            <v-list-item>
              <v-list-item-title class="font-weight-bold">{{ authStore.user?.username || 'User' }}</v-list-item-title>
              <v-list-item-subtitle>{{ authStore.user?.role || 'Role' }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item @click="handleLogout" prepend-icon="mdi-logout" class="text-error">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>


    </div>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import ToolkitMenu from './ToolkitMenu.vue'

defineEmits(['toggle-notifications'])

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid #e2e8f0;
}
.border-right {
  border-right: 1px solid #e2e8f0;
}
</style>

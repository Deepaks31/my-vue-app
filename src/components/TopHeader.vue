<template>
  <v-app-bar elevation="0" color="white" height="56" class="border-bottom">
    
    <!-- Left: EigenSecure Logo placeholder -->
    <div class="px-4 d-flex align-center border-right h-100">
      <v-icon icon="mdi-shield-star" color="red-darken-3" class="mr-2"></v-icon>
      <span class="text-caption font-weight-bold" style="color: #666;">EigenSecure. <span style="font-weight: 500; color: #999;">Enterprise TruRisk™ Platform</span></span>
    </div>

    <!-- Breadcrumbs -->
    <div class="px-6 d-flex align-center h-100 flex-grow-1">
      <span class="text-caption text-blue-darken-2 cursor-pointer font-weight-medium">Applications</span>
      <v-icon icon="mdi-chevron-right" size="x-small" color="grey" class="mx-1"></v-icon>
      <span class="text-caption text-blue-darken-2 cursor-pointer font-weight-medium">My Applications</span>
      <v-icon icon="mdi-chevron-right" size="x-small" color="grey" class="mx-1"></v-icon>
      <span class="text-caption font-weight-bold text-grey-darken-3">Internet Banking</span>
    </div>
    
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
      
      <v-avatar color="grey-lighten-2" size="28" class="mr-4">
        <span class="text-caption font-weight-bold text-grey-darken-2">ST</span>
      </v-avatar>

      <v-divider vertical class="mx-2 my-auto" style="height: 32px;"></v-divider>

      <div class="d-flex align-center ml-2 cursor-pointer border rounded px-3 py-1 bg-grey-lighten-4" style="border-color: #e2e8f0 !important;">
        <v-icon icon="mdi-cube-outline" color="grey-darken-2" size="small" class="mr-2"></v-icon>
        <span class="text-caption font-weight-bold text-grey-darken-3">Client Logo</span>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup>
import ToolkitMenu from './ToolkitMenu.vue'

defineEmits(['toggle-notifications'])
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid #e2e8f0;
}
.border-right {
  border-right: 1px solid #e2e8f0;
}
</style>

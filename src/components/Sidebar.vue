<template>
  <v-navigation-drawer permanent elevation="0" class="qualys-sidebar" width="60">
    <!-- Top Branding -->
    <div class="d-flex justify-center align-center py-4 sidebar-header">
      <span class="font-weight-bold text-white text-caption">TAS</span>
    </div>

    <!-- Navigation Links -->
    <v-list density="compact" nav class="px-0 py-0 text-center">
      
      <v-list-item class="sidebar-item" :class="{ 'active-item': $route.path === '/' }" link @click="$router.push('/')">
        <div class="d-flex justify-center w-100">
          <v-icon icon="mdi-home-outline" :color="$route.path === '/' ? 'white' : 'light-blue-lighten-4'" size="small"></v-icon>
        </div>
      </v-list-item>
      
      <v-list-item class="sidebar-item" :class="{ 'active-item': $route.path === '/jobs' }" link @click="$router.push('/jobs')">
        <div class="d-flex justify-center w-100">
          <v-icon icon="mdi-briefcase-outline" :color="$route.path === '/jobs' ? 'white' : 'light-blue-lighten-4'" size="small"></v-icon>
        </div>
      </v-list-item>

      <v-list-item class="sidebar-item" :class="{ 'active-item': $route.path === '/orders' }" link @click="$router.push('/orders')">
        <div class="d-flex justify-center w-100">
          <v-icon icon="mdi-format-list-bulleted" :color="$route.path === '/orders' ? 'white' : 'light-blue-lighten-4'" size="small"></v-icon>
        </div>
      </v-list-item>

      <v-list-item class="sidebar-item" link>
        <div class="d-flex justify-center w-100">
          <v-icon icon="mdi-tune" color="light-blue-lighten-4" size="small"></v-icon>
        </div>
      </v-list-item>

      <v-list-item class="sidebar-item" link>
        <div class="d-flex justify-center w-100">
          <v-icon icon="mdi-earth" color="light-blue-lighten-4" size="small"></v-icon>
        </div>
      </v-list-item>

      <v-list-item class="sidebar-item" link>
        <div class="d-flex justify-center w-100">
          <v-icon icon="mdi-magnify" color="light-blue-lighten-4" size="small"></v-icon>
        </div>
      </v-list-item>

      <v-list-item class="sidebar-item" link>
        <div class="d-flex justify-center w-100">
          <v-icon icon="mdi-file-document-outline" color="light-blue-lighten-4" size="small"></v-icon>
        </div>
      </v-list-item>

      <v-list-item class="sidebar-item" link>
        <div class="d-flex justify-center w-100">
          <v-icon icon="mdi-sitemap" color="light-blue-lighten-4" size="small"></v-icon>
        </div>
      </v-list-item>

      <v-list-item class="sidebar-item" link>
        <div class="d-flex justify-center w-100">
          <v-icon icon="mdi-link-variant" color="light-blue-lighten-4" size="small"></v-icon>
        </div>
      </v-list-item>
      
    </v-list>
    
    <template v-slot:append>
      <div class="text-center py-4 text-white" style="font-size: 8px; opacity: 0.7;">
        © 2024
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.qualys-sidebar {
  background-color: #0f4f9a !important; /* Qualys Blue */
  border-right: none !important;
}
.sidebar-header {
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 8px;
  height: 56px;
}
.sidebar-item {
  padding: 12px 0 !important;
  margin-bottom: 4px !important;
  border-radius: 0 !important;
}
.sidebar-item:hover {
  background-color: rgba(255,255,255,0.1);
}
.active-item {
  background-color: rgba(255,255,255,0.15) !important;
  border-left: 3px solid white;
}
</style>

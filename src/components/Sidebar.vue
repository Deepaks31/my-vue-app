<template>
  <v-navigation-drawer
    :rail="isRail"
    permanent
    elevation="4"
    class="qualys-sidebar"
  >
    <!-- Hamburger and Branding -->
    <v-list>
      <v-list-item
        prepend-icon="mdi-menu"
        title="EigenSecure"
        class="text-white sidebar-header-item"
        @click.stop="toggleRail"
      ></v-list-item>
    </v-list>

    <v-divider color="rgba(255,255,255,0.1)"></v-divider>

    <!-- Navigation Items -->
    <v-list density="compact" nav>
      
      <!-- Dashboard (Single Item) -->
      <v-list-item
        prepend-icon="mdi-home-outline"
        title="Dashboards"
        value="dashboards"
        :class="{ 'active-item': $route.path === '/' }"
        @click="$router.push('/')"
      ></v-list-item>

      <!-- Operations (Flyout Menu) -->
      <v-menu location="end" open-on-hover transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-briefcase-outline"
            title="Operations"
            append-icon="mdi-chevron-right"
            :class="{ 'active-item': ['/jobs', '/orders'].includes($route.path) }"
          ></v-list-item>
        </template>
        <v-card class="flyout-menu" elevation="8" min-width="200">
          <v-list density="compact" class="flyout-list">
            <v-list-item
              title="Jobs"
              prepend-icon="mdi-briefcase"
              :class="{ 'active-subitem': $route.path === '/jobs' }"
              @click="$router.push('/jobs')"
            ></v-list-item>
            <v-list-item
              title="Orders"
              prepend-icon="mdi-format-list-bulleted"
              :class="{ 'active-subitem': $route.path === '/orders' }"
              @click="$router.push('/orders')"
            ></v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <!-- Administration (Flyout Menu) -->
      <v-menu location="end" open-on-hover transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-cog-outline"
            title="Administration"
            append-icon="mdi-chevron-right"
            :class="{ 'active-item': ['/employees', '/departments', '/projects'].includes($route.path) }"
          ></v-list-item>
        </template>
        <v-card class="flyout-menu" elevation="8" min-width="200">
          <v-list density="compact" class="flyout-list">
            <v-list-item
              title="Employees"
              prepend-icon="mdi-account-group"
              :class="{ 'active-subitem': $route.path === '/employees' }"
              @click="$router.push('/employees')"
            ></v-list-item>
            <v-list-item
              title="Departments"
              prepend-icon="mdi-domain"
              :class="{ 'active-subitem': $route.path === '/departments' }"
              @click="$router.push('/departments')"
            ></v-list-item>
            <v-list-item
              title="Projects"
              prepend-icon="mdi-projector"
              :class="{ 'active-subitem': $route.path === '/projects' }"
              @click="$router.push('/projects')"
            ></v-list-item>
          </v-list>
        </v-card>
      </v-menu>

    </v-list>

    <template v-slot:append>
      <div class="text-center py-4 text-white" style="font-size: 10px; opacity: 0.5;">
        <span v-if="!isRail">© 2026 EigenSecure</span>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';

const isRail = ref(true);

const toggleRail = () => {
  isRail.value = !isRail.value;
};
</script>

<style scoped>
/* Original Qualys Blue Theme */
.qualys-sidebar {
  background-color: #0f4f9a !important; 
  color: #FFFFFF !important;
  border-right: none !important;
  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Sidebar header text */
.sidebar-header-item {
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.sidebar-header-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* Standard Icon colors */
:deep(.v-list-item__prepend > .v-icon),
:deep(.v-list-item__append > .v-icon) {
  color: #bbdefb !important; /* light blue */
  opacity: 1 !important;
}

/* Hover effect for all items */
:deep(.v-list-item:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* Active Top-Level Item */
.active-item {
  background-color: rgba(255, 255, 255, 0.15) !important;
  border-left: 3px solid #ffffff !important;
}

/* Flyout Menu Styling - Professional & Interactive */
.flyout-menu {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-left: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
}
.flyout-list {
  background-color: #0d4282 !important; /* Slightly darker blue for flyout */
  color: white !important;
}

/* Flyout Subitems */
.active-subitem {
  background-color: rgba(255, 255, 255, 0.15) !important;
  font-weight: 600;
}
</style>

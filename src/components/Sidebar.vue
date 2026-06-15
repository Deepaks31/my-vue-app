<template>
  <v-navigation-drawer
    :rail="isRail"
    expand-on-hover
    permanent
    elevation="4"
    class="dark-sidebar"
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

      <!-- Operations (Nested Group) -->
      <v-list-group value="Operations">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-briefcase-outline"
            title="Operations"
          ></v-list-item>
        </template>

        <v-list-item
          title="Jobs"
          value="jobs"
          :class="{ 'active-subitem': $route.path === '/jobs' }"
          @click="$router.push('/jobs')"
        ></v-list-item>
        
        <v-list-item
          title="Orders"
          value="orders"
          :class="{ 'active-subitem': $route.path === '/orders' }"
          @click="$router.push('/orders')"
        ></v-list-item>
      </v-list-group>

      <!-- Administration (Nested Group) -->
      <v-list-group value="Administration">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-cog-outline"
            title="Administration"
          ></v-list-item>
        </template>

        <v-list-item
          title="Employees"
          value="employees"
          :class="{ 'active-subitem': $route.path === '/employees' }"
          @click="$router.push('/employees')"
        ></v-list-item>

        <v-list-item
          title="Departments"
          value="departments"
          :class="{ 'active-subitem': $route.path === '/departments' }"
          @click="$router.push('/departments')"
        ></v-list-item>

        <v-list-item
          title="Projects"
          value="projects"
          :class="{ 'active-subitem': $route.path === '/projects' }"
          @click="$router.push('/projects')"
        ></v-list-item>
      </v-list-group>

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

// Starts locked in 'rail' (compact) mode. 
// expand-on-hover temporarily opens it.
// Clicking the hamburger toggles the permanent lock.
const isRail = ref(true);

const toggleRail = () => {
  isRail.value = !isRail.value;
};
</script>

<style scoped>
/* Main Dark Theme Sidebar */
.dark-sidebar {
  background-color: #212121 !important; /* Very dark grey */
  color: #E0E0E0 !important;
  border-right: 1px solid #333 !important;
}

/* Sidebar header text */
.sidebar-header-item {
  font-weight: 700;
  letter-spacing: 1px;
}

/* Standard Icon colors */
:deep(.v-list-item__prepend > .v-icon) {
  color: #9E9E9E !important;
  opacity: 1 !important;
}

/* Hover effect */
:deep(.v-list-item:hover) {
  background-color: rgba(255, 255, 255, 0.08) !important;
}

/* Active Top-Level Item */
.active-item {
  background-color: rgba(255, 255, 255, 0.12) !important;
  border-left: 3px solid #64B5F6 !important;
}

/* Active Sub-Level Item */
.active-subitem {
  background-color: rgba(255, 255, 255, 0.05) !important;
  color: #64B5F6 !important;
  font-weight: 600;
}

/* Indent nested items inside v-list-group */
:deep(.v-list-group__items .v-list-item) {
  padding-left: 54px !important; 
}

/* Caret for nested groups */
:deep(.v-list-item__append > .v-icon) {
  font-size: 14px;
  color: #757575;
}
</style>

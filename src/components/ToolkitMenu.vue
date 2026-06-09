<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="bottom right" offset="10">
    <template v-slot:activator="{ props }">
      <v-btn icon size="small" variant="text" color="blue-darken-2" class="mr-2" v-bind="props">
        <v-icon icon="mdi-apps" size="large"></v-icon>
      </v-btn>
    </template>

    <v-card width="800" elevation="8" class="bg-white rounded-lg border">
      <div class="px-6 py-4 border-bottom">
        <h3 class="text-subtitle-1 font-weight-bold text-grey-darken-4">EigenSecure Cloud Products</h3>
      </div>
      
      <div class="d-flex p-0">
        <!-- Left Side: Main Apps Grid -->
        <div class="pa-6 border-right" style="width: 60%;">
          <v-row dense>
            <!-- Row 1 -->
            <v-col cols="4" class="text-center mb-4 cursor-pointer hover-bg rounded py-2">
              <v-icon icon="mdi-robot" color="purple-darken-1" size="32" class="mb-1"></v-icon>
              <div class="text-caption font-weight-medium" style="font-size: 11px !important;">AI Foundry</div>
            </v-col>
            <v-col cols="4" class="text-center mb-4 cursor-pointer hover-bg rounded py-2">
              <v-icon icon="mdi-azure" color="blue-darken-1" size="32" class="mb-1"></v-icon>
              <div class="text-caption font-weight-medium" style="font-size: 11px !important;">Azure</div>
            </v-col>
            <v-col cols="4" class="text-center mb-4 cursor-pointer hover-bg rounded py-2">
              <v-icon icon="mdi-microsoft-copilot" color="teal-darken-1" size="32" class="mb-1"></v-icon>
              <div class="text-caption font-weight-medium" style="font-size: 11px !important;">Copilot Studio</div>
            </v-col>

            <!-- Row 2 -->
            <v-col cols="4" class="text-center mb-4 cursor-pointer hover-bg rounded py-2">
              <v-icon icon="mdi-infinity" color="blue-darken-2" size="32" class="mb-1"></v-icon>
              <div class="text-caption font-weight-medium" style="font-size: 11px !important;">DevOps</div>
            </v-col>
            <v-col cols="4" class="text-center mb-4 cursor-pointer hover-bg rounded py-2">
              <v-icon icon="mdi-shield-account" color="blue-darken-3" size="32" class="mb-1"></v-icon>
              <div class="text-caption font-weight-medium" style="font-size: 11px !important;">Entra</div>
            </v-col>
            <v-col cols="4" class="text-center mb-4 cursor-pointer hover-bg rounded py-2">
              <v-icon icon="mdi-chart-scatter-plot-hexbin" color="teal-lighten-1" size="32" class="mb-1"></v-icon>
              <div class="text-caption font-weight-medium" style="font-size: 11px !important;">Fabric</div>
            </v-col>

            <!-- Row 3 -->
            <v-col cols="4" class="text-center mb-4 cursor-pointer hover-bg rounded py-2">
              <v-icon icon="mdi-github" color="black" size="32" class="mb-1"></v-icon>
              <div class="text-caption font-weight-medium" style="font-size: 11px !important;">GitHub</div>
            </v-col>
            <v-col cols="4" class="text-center mb-4 cursor-pointer hover-bg rounded py-2">
              <v-icon icon="mdi-microsoft-windows" color="blue-darken-2" size="32" class="mb-1"></v-icon>
              <div class="text-caption font-weight-medium" style="font-size: 11px !important;">Intune</div>
            </v-col>
            <v-col cols="4" class="text-center mb-4 cursor-pointer hover-bg rounded py-2">
              <v-icon icon="mdi-microsoft-visual-studio-code" color="blue-darken-3" size="32" class="mb-1"></v-icon>
              <div class="text-caption font-weight-medium" style="font-size: 11px !important;">VS Code</div>
            </v-col>
          </v-row>
        </div>

        <!-- Right Side: Services List -->
        <div class="pa-4 bg-grey-lighten-5" style="width: 40%;">
          <div class="text-caption font-weight-bold text-grey-darken-2 mb-3 px-2">RECENT SERVICES</div>
          <v-list density="compact" class="bg-transparent pa-0">
            <v-list-item link class="rounded mb-1">
              <template v-slot:prepend><v-icon icon="mdi-application-cog" color="blue-darken-1" size="small"></v-icon></template>
              <v-list-item-title class="text-caption font-weight-medium">App Services</v-list-item-title>
            </v-list-item>
            <v-list-item link class="rounded mb-1">
              <template v-slot:prepend><v-icon icon="mdi-currency-usd" color="green-darken-1" size="small"></v-icon></template>
              <v-list-item-title class="text-caption font-weight-medium">Cost Management</v-list-item-title>
            </v-list-item>
            <v-list-item link class="rounded mb-1">
              <template v-slot:prepend><v-icon icon="mdi-database" color="blue-grey-darken-1" size="small"></v-icon></template>
              <v-list-item-title class="text-caption font-weight-medium">Storage accounts</v-list-item-title>
            </v-list-item>
            <v-list-item link class="rounded mb-1">
              <template v-slot:prepend><v-icon icon="mdi-account-group" color="blue-darken-2" size="small"></v-icon></template>
              <v-list-item-title class="text-caption font-weight-medium">Users</v-list-item-title>
            </v-list-item>
            <v-list-item link class="rounded mb-1 mt-4">
              <v-list-item-title class="text-caption font-weight-bold text-blue-darken-2">More services &rarr;</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-card>
  </v-menu>
</template>

<script setup>
import { ref } from 'vue'

const menu = ref(false)
</script>

<style scoped>
.border-bottom { border-bottom: 1px solid #e2e8f0; }
.border-right { border-right: 1px solid #e2e8f0; }
.hover-bg:hover { background-color: #f1f5f9; }
</style>

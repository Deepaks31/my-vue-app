<template>
  <v-app>
    <Sidebar />

    <v-main class="bg-background">
      <TopHeader @toggle-notifications="isNotificationsOpen = true" />
      <PageHeader @open-add-drawer="isAddEditOpen = true" />

      <v-container fluid class="px-6 py-6" style="max-width: 1600px; margin: 0 auto;">
        
        <v-row class="mb-4">
          <!-- MAIN LEFT BLOCK (75% Width) -->
          <v-col cols="12" md="9" class="d-flex flex-column">
            <!-- Row 1 -->
            <v-row class="mb-4 flex-grow-0">
              <v-col cols="12" md="8">
                <TruRiskScoreWidget class="h-100" />
              </v-col>
              <v-col cols="12" md="4">
                <OwaspCategoriesWidget class="h-100" />
              </v-col>
            </v-row>

            <!-- Row 2 -->
            <v-row class="mb-4 flex-grow-1">
              <v-col cols="12" md="8">
                <ComponentTableWidget class="h-100" />
              </v-col>
              <v-col cols="12" md="4">
                <PiiDataTypesWidget />
              </v-col>
            </v-row>

            <!-- Row 3 -->
            <v-row class="mt-auto flex-grow-0">
              <v-col cols="12" md="4">
                <VulnerabilitiesStatusWidget class="h-100" />
              </v-col>
              <v-col cols="12" md="8">
                <DetectionsChartWidget class="h-100" />
              </v-col>
            </v-row>
          </v-col>

          <!-- MAIN RIGHT BLOCK (25% Width) -->
          <v-col cols="12" md="3" class="d-flex flex-column gap-4">
            <ScansReportsWidget class="mb-4" />
            <ConfirmedVulnerabilitiesWidget class="mb-4" />
            <VulnerabilitiesFixedWidget class="flex-grow-1" />
          </v-col>
        </v-row>

      </v-container>

      <NotificationsDrawer v-model="isNotificationsOpen" />
      <AddEditDrawer v-model="isAddEditOpen" />

    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import TopHeader from './components/TopHeader.vue'
import PageHeader from './components/PageHeader.vue'

import NotificationsDrawer from './components/drawers/NotificationsDrawer.vue'
import AddEditDrawer from './components/drawers/AddEditDrawer.vue'

import TruRiskScoreWidget from './components/widgets/TruRiskScoreWidget.vue'
import OwaspCategoriesWidget from './components/widgets/OwaspCategoriesWidget.vue'
import ScansReportsWidget from './components/widgets/ScansReportsWidget.vue'

import ComponentTableWidget from './components/widgets/ComponentTableWidget.vue'
import PiiDataTypesWidget from './components/widgets/PiiDataTypesWidget.vue'
import ConfirmedVulnerabilitiesWidget from './components/widgets/ConfirmedVulnerabilitiesWidget.vue'

import VulnerabilitiesStatusWidget from './components/widgets/VulnerabilitiesStatusWidget.vue'
import DetectionsChartWidget from './components/widgets/DetectionsChartWidget.vue'
import VulnerabilitiesFixedWidget from './components/widgets/VulnerabilitiesFixedWidget.vue'

const isNotificationsOpen = ref(false)
const isAddEditOpen = ref(false)
</script>

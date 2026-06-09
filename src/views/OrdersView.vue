<template>
  <div>
    <!-- Page Content -->
    <v-container fluid class="px-8 py-6 max-w-7xl mx-auto" style="max-width: 1440px;">
      
      <!-- Top Stats Row -->
      <StatsRow />

      <!-- Main Orders Card -->
      <v-card class="pa-0 bg-white" elevation="0">
        
        <!-- Tabs Navigation -->
        <v-tabs v-model="tab" color="primary" class="border-bottom px-4 pt-2">
          <v-tab value="all" class="text-none font-weight-bold">All</v-tab>
          <v-tab value="incomplete" class="text-none font-weight-bold">Incomplete</v-tab>
          <v-tab value="overdue" class="text-none font-weight-bold text-grey">Overdue</v-tab>
          <v-tab value="ongoing" class="text-none font-weight-bold text-grey">Ongoing</v-tab>
          <v-tab value="finished" class="text-none font-weight-bold">Finished</v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <!-- All Orders Tab (v-data-table) -->
          <v-window-item value="all">
            <OrdersTableAll />
          </v-window-item>

          <!-- Incomplete Tab (v-data-table-server) -->
          <v-window-item value="incomplete">
            <OrdersTableServer class="ma-4" />
          </v-window-item>

          <!-- Overdue/Ongoing Empty States -->
          <v-window-item value="overdue">
            <div class="pa-12 text-center text-grey">No overdue orders.</div>
          </v-window-item>
          <v-window-item value="ongoing">
            <div class="pa-12 text-center text-grey">Ongoing orders are tracked here.</div>
          </v-window-item>

          <!-- Finished Tab (v-data-table-virtual) -->
          <v-window-item value="finished">
            <OrdersTableVirtual class="ma-4" />
          </v-window-item>
        </v-window>

      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StatsRow from '../components/StatsRow.vue'
import OrdersTableAll from '../components/OrdersTableAll.vue'
import OrdersTableServer from '../components/OrdersTableServer.vue'
import OrdersTableVirtual from '../components/OrdersTableVirtual.vue'

const tab = ref('all')
</script>

<template>
  <div class="bg-white px-6 pt-6 pb-0 border-bottom">
    
    <div class="d-flex justify-space-between align-start mb-6">
      <div>
        <h2 class="text-h5 font-weight-bold mb-1 text-grey-darken-4">Internet Banking</h2>
        <div class="text-caption text-grey-darken-1 d-flex align-center">
          <span>Owner: <span class="font-weight-bold text-grey-darken-3">John Doe</span></span>
          <v-divider vertical class="mx-3 my-1" style="height: 12px;"></v-divider>
          <span>Environment: <span class="text-grey-darken-3">Production</span></span>
          <v-divider vertical class="mx-3 my-1" style="height: 12px;"></v-divider>
          <span>Business Criticality: <span class="text-red-darken-1 font-weight-bold border rounded px-1 ml-1" style="border-color: #ef4444 !important;">5</span></span>
        </div>
      </div>
      <div class="d-flex align-center">
        <v-btn class="bg-white border text-blue-darken-2 px-4 text-caption font-weight-bold mr-3" height="32" elevation="0" prepend-icon="mdi-plus" @click="$emit('open-add-drawer')" style="border-color: #1976D2 !important;">Add Data</v-btn>
        <v-btn class="qualys-btn px-6 text-caption font-weight-bold" height="32" elevation="0">View Risk Reduction Plan</v-btn>
      </div>
    </div>

    <!-- Stat Cards Row -->
    <v-row class="mb-6">
      <!-- Card 1 -->
      <v-col cols="12" sm="6" md="2" class="flex-grow-1">
        <v-card class="stat-card pa-4 d-flex align-center h-100" elevation="0">
          <v-avatar color="blue-lighten-5" size="48" class="mr-4">
            <v-icon icon="mdi-cube-outline" color="blue-darken-2" size="x-large"></v-icon>
          </v-avatar>
          <div>
            <div class="text-caption font-weight-bold text-grey-darken-2 text-uppercase mb-1" style="font-size: 10px !important;">Total Components</div>
            <div class="text-h4 font-weight-bold text-grey-darken-4">8</div>
          </div>
        </v-card>
      </v-col>

      <!-- Card 2 -->
      <v-col cols="12" sm="6" md="2" class="flex-grow-1">
        <v-card class="stat-card pa-4 d-flex align-center h-100" elevation="0">
          <v-avatar color="red-lighten-5" size="48" class="mr-4">
            <v-icon icon="mdi-earth" color="red-darken-1" size="x-large"></v-icon>
          </v-avatar>
          <div>
            <div class="text-caption font-weight-bold text-grey-darken-2 text-uppercase mb-1" style="font-size: 10px !important;">OWASP TOP 10 FINDINGS</div>
            <div class="text-h4 font-weight-bold text-grey-darken-4">89</div>
          </div>
        </v-card>
      </v-col>

      <!-- Card 3 -->
      <v-col cols="12" sm="6" md="2" class="flex-grow-1">
        <v-card class="stat-card pa-4 d-flex align-center h-100" elevation="0">
          <v-avatar color="red-lighten-5" size="48" class="mr-4 border" style="border-color: #ef4444 !important; border-style: dashed !important;">
            <span class="text-red-darken-1 font-weight-bold" style="font-size: 14px;">API</span>
          </v-avatar>
          <div>
            <div class="text-caption font-weight-bold text-grey-darken-2 text-uppercase mb-1" style="font-size: 10px !important;">APIs EXPOSING PII</div>
            <div class="text-h4 font-weight-bold text-grey-darken-4">74</div>
          </div>
        </v-card>
      </v-col>

      <!-- Card 4 -->
      <v-col cols="12" sm="6" md="2" class="flex-grow-1">
        <v-card class="stat-card pa-4 d-flex align-center h-100" elevation="0">
          <v-avatar color="orange-lighten-5" size="48" class="mr-4">
            <v-icon icon="mdi-bug-outline" color="orange-darken-2" size="x-large"></v-icon>
          </v-avatar>
          <div>
            <div class="text-caption font-weight-bold text-grey-darken-2 text-uppercase mb-1" style="font-size: 10px !important;">Potential Malware</div>
            <div class="text-h4 font-weight-bold text-grey-darken-4">2</div>
          </div>
        </v-card>
      </v-col>

      <!-- Card 5 -->
      <v-col cols="12" sm="6" md="2" class="flex-grow-1">
        <v-card class="stat-card pa-4 d-flex align-center h-100" elevation="0">
          <v-avatar color="red-lighten-5" size="48" class="mr-4">
            <v-icon icon="mdi-magnify-scan" color="red-darken-2" size="x-large"></v-icon>
          </v-avatar>
          <div>
            <div class="text-caption font-weight-bold text-grey-darken-2 text-uppercase mb-1" style="font-size: 10px !important;">Critical Detections</div>
            <div class="text-h4 font-weight-bold text-grey-darken-4">52</div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tabs -->
    <v-tabs v-model="tab" color="primary" class="font-weight-bold text-caption">
      <v-tab value="overview" class="text-none font-weight-bold">Overview</v-tab>
      <v-tab value="components" class="text-none font-weight-bold text-grey">Components</v-tab>
      <v-tab value="detections" class="text-none font-weight-bold text-grey">Detections</v-tab>
      <v-tab value="risk" class="text-none font-weight-bold text-grey">Risk Reduction</v-tab>
    </v-tabs>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('overview')

defineEmits(['open-add-drawer'])
</script>

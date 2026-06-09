<template>
  <v-card class="widget-card d-flex flex-column h-100" elevation="0">
    <div class="px-2 py-2 d-flex align-center">
      <div class="d-flex align-center bg-grey-lighten-4 rounded px-2 py-1 mr-2 border">
        <span class="text-caption text-grey-darken-2 mr-1">Action (0)</span>
        <v-icon icon="mdi-chevron-down" size="small" color="grey-darken-1"></v-icon>
      </div>
      <div class="d-flex align-center bg-white rounded px-2 py-1 border">
        <span class="text-caption text-grey-darken-2 mr-1">Group By</span>
        <v-icon icon="mdi-chevron-down" size="small" color="grey-darken-1"></v-icon>
      </div>

      <v-spacer></v-spacer>

      <v-icon icon="mdi-chevron-left" size="small" color="grey-lighten-1" class="mr-1"></v-icon>
      <span class="text-caption font-weight-medium text-blue-darken-2 border px-2 py-1 rounded bg-white mr-1">1</span>
      <span class="text-caption text-grey-darken-1 mr-2">/ 1 pages</span>
      <v-icon icon="mdi-chevron-right" size="small" color="blue-darken-2" class="mr-3"></v-icon>
      
      <span class="text-caption text-grey-darken-1 mr-4">Total 7 items</span>
      
      <v-icon icon="mdi-refresh" size="small" color="blue-darken-2" class="mr-2"></v-icon>
      <v-icon icon="mdi-download-outline" size="small" color="blue-darken-2" class="mr-2"></v-icon>
      <v-icon icon="mdi-dots-vertical" size="small" color="blue-darken-2"></v-icon>
    </div>
    
    <div class="flex-grow-1">
      <v-table density="compact" class="qualys-table w-100" hover>
        <thead>
          <tr>
            <th class="px-2" style="width: 40px;"><v-checkbox-btn density="compact" color="primary"></v-checkbox-btn></th>
            <th class="text-left text-grey-darken-1 font-weight-bold" style="font-size: 10px !important;">COMPONENT NAME</th>
            <th class="text-left text-grey-darken-1 font-weight-bold" style="font-size: 10px !important;">TYPE</th>
            <th class="text-left text-grey-darken-1 font-weight-bold" style="font-size: 10px !important;">
              TruRisk™ <v-icon icon="mdi-information-outline" size="x-small" color="blue-lighten-2"></v-icon>
            </th>
            <th class="text-left text-grey-darken-1 font-weight-bold" style="font-size: 10px !important;">VULNS COUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.name">
            <td class="px-2 py-1"><v-checkbox-btn density="compact" color="primary"></v-checkbox-btn></td>
            <td class="py-1">
              <a href="#" class="text-decoration-none text-blue-darken-2 font-weight-medium" style="font-size: 12px;">{{ item.name }}</a>
            </td>
            <td class="text-grey-darken-3 py-1" style="font-size: 12px;">{{ item.type }}</td>
            <td class="py-1">
              <div class="d-flex align-center">
                <span class="border rounded px-1 text-red-darken-1 font-weight-medium mr-2" style="font-size: 11px; border-color: #fca5a5 !important;">{{ item.score }}</span>
                <!-- SVG Sparkline trick -->
                <svg width="40" height="14" viewBox="0 0 40 14" class="ml-1">
                  <path d="M0,12 L10,8 L20,10 L30,4 L40,6 L40,14 L0,14 Z" fill="rgba(239,68,68,0.15)" />
                  <path d="M0,12 L10,8 L20,10 L30,4 L40,6" fill="none" stroke="#ef4444" stroke-width="1.5" />
                </svg>
              </div>
            </td>
            <td class="py-1" style="width: 120px;">
              <div class="d-flex flex-column justify-center" style="height: 100%;">
                <div class="d-flex align-center text-caption text-grey-darken-3 mb-1" style="font-size: 11px !important;">
                  Total: {{ item.vulns }}
                  <v-icon icon="mdi-information-outline" size="x-small" color="blue-lighten-2" class="ml-1"></v-icon>
                </div>
                <div class="w-100 d-flex rounded overflow-hidden" style="height: 4px; gap: 1px;">
                  <div style="background-color: #ef4444; height: 100%;" :style="{ width: item.stats[0] + '%' }"></div>
                  <div style="background-color: #f59e0b; height: 100%;" :style="{ width: item.stats[1] + '%' }"></div>
                  <div style="background-color: #eab308; height: 100%;" :style="{ width: item.stats[2] + '%' }"></div>
                  <div style="background-color: #10b981; height: 100%;" :style="{ width: item.stats[3] + '%' }"></div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-card>
</template>

<script setup>
const items = [
  { name: 'netbanking.acme.com', type: 'Web App', score: '750', vulns: 25, stats: [40, 30, 20, 10] },
  { name: 'netbanking.jar', type: 'Code', score: '719', vulns: 23, stats: [35, 35, 20, 10] },
  { name: 'api.netbanking.acme.com', type: 'API', score: '702', vulns: 15, stats: [20, 40, 30, 10] },
  { name: 'netbanking-loan.jar', type: 'Code', score: '650', vulns: 26, stats: [15, 35, 40, 10] },
  { name: 'netbanking-spdx.json', type: 'SBOM', score: '600', vulns: 13, stats: [10, 30, 40, 20] },
  { name: 'netbanking-deployment.y...', type: 'IaC', score: '712', vulns: 21, stats: [30, 30, 30, 10] },
  { name: 'elasticsearch 8.4', type: 'Tech', score: '620', vulns: 85, stats: [50, 20, 20, 10] }
]
</script>

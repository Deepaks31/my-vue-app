<template>
  <v-card class="widget-card d-flex flex-column" elevation="0">
    <div class="px-4 py-4 font-weight-bold text-subtitle-2">
      Scans & Reports
    </div>
    
    <div class="flex-grow-1 px-4 py-4">
      
      <!-- Tags -->
      <div class="text-caption font-weight-bold text-grey-darken-2 mb-1" style="font-size: 11px !important;">Tags</div>
      <div class="d-flex flex-wrap mb-2" style="gap: 4px;">
        <v-chip closable size="x-small" variant="outlined" style="border-color: #e2e8f0; font-size: 10px;">
          <v-icon icon="mdi-square" color="green-accent-3" size="x-small" class="mr-1"></v-icon>
          ScanTime...
        </v-chip>
        <v-chip closable size="small" variant="outlined" class="mb-2 mr-2" style="border-color: #e2e8f0;">
          <v-icon icon="mdi-square" color="blue-accent-3" size="x-small" class="mr-1"></v-icon>
          Reporting Ser...
        </v-chip>
        <v-chip closable size="small" variant="outlined" class="mb-2 mr-2" style="border-color: #e2e8f0;">
          <v-icon icon="mdi-square" color="red-accent-3" size="x-small" class="mr-1"></v-icon>
          Critical Assets
        </v-chip>
        <v-chip closable size="small" variant="outlined" class="mb-2 mr-2" style="border-color: #e2e8f0;">
          <v-icon icon="mdi-square" color="purple-accent-3" size="x-small" class="mr-1"></v-icon>
          Manifest
        </v-chip>
        <v-chip closable size="x-small" variant="outlined" style="border-color: #e2e8f0; font-size: 10px;">
          <v-icon icon="mdi-square" color="yellow-darken-2" size="x-small" class="mr-1"></v-icon>
          Source Symte...
        </v-chip>
        <v-chip closable size="x-small" variant="outlined" style="border-color: #e2e8f0; font-size: 10px;">
          Configurations
        </v-chip>
      </div>

      <!-- Scans Table -->
      <div class="text-caption font-weight-bold text-grey-darken-2 mt-2 mb-0" style="font-size: 11px !important;">Scans</div>
      <v-table density="compact" class="qualys-table w-100 mb-2" hover>
        <thead>
          <tr>
            <th class="text-left text-grey-darken-1 font-weight-bold" style="font-size: 10px !important;">NAME</th>
            <th class="text-left text-grey-darken-1 font-weight-bold" style="font-size: 10px !important;">STATUS</th>
            <th class="text-right text-grey-darken-1 font-weight-bold" style="font-size: 10px !important;">DATE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="scan in scans" :key="scan.name">
            <td class="text-grey-darken-3 py-2" style="font-size: 11px !important;">{{ scan.name }}</td>
            <td class="font-weight-bold py-2" :style="`color: ${getStatusColor(scan.status)} !important; font-size: 11px !important;`">{{ scan.status }}</td>
            <td class="text-right text-grey-darken-1 py-2" style="font-size: 11px !important;">{{ scan.date }}</td>
          </tr>
        </tbody>
      </v-table>

      <!-- Reports Table -->
      <div class="text-caption font-weight-bold text-grey-darken-2 mt-2 mb-0" style="font-size: 11px !important;">Reports</div>
      <v-table density="compact" class="qualys-table w-100" hover>
        <thead>
          <tr>
            <th class="text-left text-grey-darken-1 font-weight-bold" style="font-size: 10px !important;">NAME</th>
            <th class="text-left text-grey-darken-1 font-weight-bold" style="font-size: 10px !important;">STATUS</th>
            <th class="text-right text-grey-darken-1 font-weight-bold" style="font-size: 10px !important;">DATE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.name">
            <td class="text-grey-darken-3 py-2" style="font-size: 11px !important;">{{ report.name }}</td>
            <td class="font-weight-bold py-2" :style="`color: ${getStatusColor(report.status)} !important; font-size: 11px !important;`">{{ report.status }}</td>
            <td class="text-right text-grey-darken-1 py-2" style="font-size: 11px !important;">{{ report.date }}</td>
          </tr>
        </tbody>
      </v-table>

    </div>
  </v-card>
</template>

<script setup>
const scans = [
  { name: 'Daily External scan-DVWA', status: 'Complete', date: 'Jan 15, 2025\n11:02 PM' },
  { name: 'System Scan Verify', status: 'In Progress', date: 'Jan 12, 2025\n2:34 PM' },
  { name: 'Sofit Scan', status: 'Limit Reached', date: 'Dec 23, 2024\n5:02 AM' }
]

const reports = [
  { name: 'System Report', status: 'In Progress', date: 'Jan 30, 2025\n5:02 AM' },
  { name: 'MyReport', status: 'Complete', date: 'Jan 12, 2025\n6:38 PM' },
  { name: 'Report Schent', status: 'Complete', date: 'Dec 30, 2025\n5:02 AM' }
]

const getStatusColor = (status) => {
  if (status === 'Complete') return '#22c55e'
  if (status === 'In Progress') return '#d97706'
  if (status === 'Limit Reached') return '#ef4444'
  return '#666666'
}
</script>

<style scoped>
td {
  white-space: pre-line;
  line-height: 1.2 !important;
}
</style>

<template>
  <v-card class="widget-card d-flex flex-column h-100" elevation="0">
    <div class="px-4 py-4 font-weight-bold text-subtitle-2">
      Top 10 Observed PII Data Types
    </div>
    
    <div class="flex-grow-1 px-4 py-4 d-flex align-center">
      <!-- Chart Area -->
      <div style="width: 160px; height: 160px; position: relative;">
        <Doughnut :data="chartData" :options="chartOptions" />
        <!-- Center Text -->
        <div class="position-absolute d-flex flex-column align-center justify-center" style="top: 0; left: 0; right: 0; bottom: 0;">
          <div class="text-h4 font-weight-bold text-blue-darken-3">73</div>
          <div class="text-caption text-grey-darken-2" style="font-size: 10px !important;">Total Count</div>
        </div>
      </div>

      <!-- Custom Legend -->
      <div class="ml-4 flex-grow-1">
        <div v-for="(item, index) in legendData" :key="index" class="d-flex align-center justify-space-between mb-0">
          <div class="d-flex align-center">
            <v-icon icon="mdi-square" :color="item.color" size="x-small" class="mr-1"></v-icon>
            <span class="text-grey-darken-2" style="font-size: 11px !important;">{{ item.label }}</span>
          </div>
          <span class="font-weight-bold text-blue-darken-2" style="font-size: 11px !important;">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const legendData = [
  { label: 'Mobile Number', value: 25, color: 'blue-darken-2' },
  { label: 'Email ID', value: 24, color: 'blue-lighten-1' },
  { label: 'Bank Account No.', value: 7, color: 'red-darken-4' },
  { label: 'Auth Token', value: 5, color: 'purple-lighten-2' },
  { label: 'API Key', value: 4, color: 'purple-darken-2' },
  { label: 'Contact No.', value: 3, color: 'blue-darken-4' },
  { label: 'IP Address', value: 2, color: 'yellow-darken-2' },
  { label: 'PCI DSS (Open)', value: 2, color: 'orange-darken-1' },
  { label: 'Personal Info North...', value: 1, color: 'red-darken-1' },
  { label: 'Banking Info', value: 0, color: 'blue-lighten-2' }
]

const chartData = {
  labels: legendData.map(d => d.label),
  datasets: [
    {
      data: legendData.map(d => d.value),
      backgroundColor: [
        '#1976D2', '#42A5F5', '#B71C1C', '#BA68C8', '#7B1FA2', 
        '#0D47A1', '#FBC02D', '#FB8C00', '#E53935', '#64B5F6'
      ],
      borderWidth: 0,
      cutout: '80%'
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true }
  }
}
</script>

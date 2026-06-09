<template>
  <v-card class="widget-card d-flex flex-column" elevation="0">
    <div class="px-4 py-4 font-weight-bold text-subtitle-2">
      Confirmed Vulnerabilities By QDS Range
    </div>
    
    <div class="flex-grow-1 px-4 py-4 d-flex flex-column align-center justify-center">
      
      <div class="d-flex w-100 align-center justify-center">
        <!-- Chart Area -->
        <div style="width: 140px; height: 140px;">
          <Pie :data="chartData" :options="chartOptions" />
        </div>

        <!-- Custom Legend -->
        <div class="ml-6 flex-grow-1" style="max-width: 160px;">
          <div class="text-caption font-weight-bold text-grey-darken-3 mb-1" style="font-size: 11px !important;">Total Vulnerabilities</div>
          <div class="text-h4 font-weight-bold text-blue-darken-3 mb-3">240</div>
          
          <div v-for="(item, index) in legendData" :key="index" class="d-flex align-center justify-space-between mb-1">
            <div class="d-flex align-center">
              <v-icon icon="mdi-square" :color="item.color" size="x-small" class="mr-2"></v-icon>
              <span class="text-caption text-grey-darken-2" style="font-size: 10px !important;">{{ item.label }}</span>
            </div>
            <span class="text-caption font-weight-bold text-blue-darken-2" style="font-size: 11px !important;">{{ item.value }}</span>
          </div>
        </div>
      </div>
      
    </div>
  </v-card>
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const legendData = [
  { label: 'Critical (90-100)', value: 52, color: 'red-darken-1' },
  { label: 'High (70-89)', value: 20, color: 'orange-darken-1' },
  { label: 'Medium (40-69)', value: 60, color: 'purple-lighten-2' },
  { label: 'Low (1-39)', value: 110, color: 'yellow-darken-2' }
]

const chartData = {
  labels: legendData.map(d => d.label),
  datasets: [
    {
      data: legendData.map(d => d.value),
      backgroundColor: ['#E53935', '#FB8C00', '#BA68C8', '#FBC02D'],
      borderWidth: 1,
      borderColor: '#ffffff'
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

<template>
  <v-card class="widget-card d-flex flex-column h-100" elevation="0">
    <div class="px-4 py-4 font-weight-bold text-subtitle-2">
      Detections In The Last 12 Months
    </div>
    
    <div class="flex-grow-1 px-4 py-4 d-flex">
      
      <!-- Chart Area -->
      <div class="flex-grow-1" style="height: 180px; position: relative; min-width: 0;">
        <Line :data="chartData" :options="chartOptions" />
      </div>

      <!-- Right Side Stats -->
      <div class="d-flex flex-column justify-end align-start ml-4 mb-4 flex-shrink-0">
        <div class="d-flex align-end">
          <span class="text-h4 font-weight-bold text-blue-darken-2" style="letter-spacing: -1px;">4100</span>
          <span class="text-caption text-grey-darken-2 font-weight-bold mb-1 ml-1">(+28%)</span>
          <v-icon icon="mdi-arrow-up" color="red" size="small" class="mb-1"></v-icon>
        </div>
        <div class="text-caption text-blue-darken-2 cursor-pointer mt-1" style="font-size: 11px !important;">
          Showing last Year <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
        </div>
      </div>
      
    </div>
  </v-card>
</template>

<script setup>
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

const chartData = {
  labels: ['Jan 24', 'Feb 24', 'Mar 24', 'Apr 24', 'May 24', 'Jun 24', 'Jul 24', 'Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24'],
  datasets: [
    {
      data: [850, 870, 900, 950, 920, 1000, 1150, 1000, 950, 920, 880, 890],
      borderColor: '#1976D2',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
      borderWidth: 2,
      pointBackgroundColor: '#1976D2',
      pointRadius: 3,
      fill: true,
      tension: 0.1
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true }
  },
  scales: {
    y: {
      min: 800,
      max: 1200,
      ticks: {
        stepSize: 100,
        font: { size: 9 },
        color: '#999'
      },
      border: { display: false },
      grid: {
        color: '#f0f0f0',
        drawBorder: false,
        borderDash: [5, 5]
      }
    },
    x: {
      ticks: {
        font: { size: 9 },
        color: '#999'
      },
      grid: { display: false }
    }
  }
}
</script>

<template>
  <v-card class="widget-card d-flex flex-column" elevation="0">
    <div class="px-4 py-4 font-weight-bold text-subtitle-2">
      Vulnerabilities Fixed In The Last 30 Days
    </div>
    
    <div class="flex-grow-1 px-4 py-4 d-flex align-center justify-center">
      <div class="w-100" style="height: 140px; max-width: 300px; position: relative;">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
      
    </div>
  </v-card>
</template>

<script setup>
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const chartData = {
  labels: ['Critical', 'High', 'Medium'],
  datasets: [
    {
      data: [1300, 1100, 600],
      backgroundColor: ['#E53935', '#FB8C00', '#BA68C8'],
      borderRadius: 2,
      barThickness: 15
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
      min: 0,
      max: 1400,
      ticks: {
        stepSize: 200,
        font: { size: 9 },
        color: '#999',
        callback: function(value) {
          if (value === 0) return '0';
          return (value / 1000) + 'K';
        }
      },
      border: { display: false },
      grid: {
        color: '#f0f0f0',
        drawBorder: false
      }
    },
    x: {
      ticks: {
        font: { size: 9 },
        color: '#666'
      },
      grid: { display: false },
      border: { display: false }
    }
  }
}
</script>

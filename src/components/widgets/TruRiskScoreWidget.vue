<template>
  <v-card class="widget-card d-flex flex-column" elevation="0">
    <div class="px-4 py-4 d-flex align-center justify-space-between">
      <div>
        <div class="font-weight-bold text-subtitle-2">2025 EigenSecure Research Report TruRisk™ Score</div>
        <div class="text-caption text-grey-darken-1" style="font-size: 10px !important;">Last Calculated On: 1 Jan 2025, 10:20AM</div>
      </div>
    </div>
    
    <div class="flex-grow-1 px-4 py-4 d-flex flex-column">
      
      <div class="d-flex mb-4">
        <!-- Custom SVG 270-Degree Gauge with Perfect Fidelity & Interactivity -->
        <div style="width: 220px; height: 180px; position: relative;" class="mt-2 ml-4">
          <svg width="220" height="180" viewBox="0 0 220 180" style="overflow: visible;">
            <defs>
              <filter id="inner-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.15" />
              </filter>
              <!-- Text path extended to sweep further down to provide more room -->
              <path id="text-arc" d="M 85 178 A 82 82 0 1 1 135 178" fill="none" />
            </defs>

            <!-- Background Grey Track (160 Remaining) -->
            <g style="cursor: pointer;">
              <path d="M 64 146 A 65 65 0 1 1 156 146" fill="none" stroke="#e2e8f0" stroke-width="18" stroke-linecap="butt" />
              <v-tooltip activator="parent" location="top">Remaining Score: 160</v-tooltip>
            </g>

            <!-- Foreground Orange Track (840 Score) -->
            <g style="cursor: pointer;">
              <!-- Sweep 226.8 degrees -->
              <path d="M 64 146 A 65 65 0 1 1 175 102" fill="none" stroke="#c2410c" stroke-width="18" stroke-linecap="butt" />
              <v-tooltip activator="parent" location="top">TruRisk Score: 840</v-tooltip>
            </g>

            <!-- Inner White Circle casting shadow onto the track -->
            <circle cx="110" cy="100" r="56" fill="#ffffff" filter="url(#inner-shadow)" />

            <!-- Center Text with perfect spacing -->
            <text x="110" y="94" text-anchor="middle" font-size="22" font-weight="bold" fill="#c2410c">High</text>
            <text x="110" y="124" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">840</text>

            <!-- Perfectly Curved Labels with Fixed Spacing to Prevent Overlap -->
            <text font-size="7.5" fill="#64748b" font-weight="500">
              <textPath href="#text-arc" xlink:href="#text-arc" startOffset="14%" text-anchor="middle">Low (0-499)</textPath>
              <textPath href="#text-arc" xlink:href="#text-arc" startOffset="40%" text-anchor="middle">Medium (500-699)</textPath>
              <textPath href="#text-arc" xlink:href="#text-arc" startOffset="65%" text-anchor="middle" font-weight="bold" fill="#334155">High (700-849)</textPath>
              <textPath href="#text-arc" xlink:href="#text-arc" startOffset="83%" text-anchor="middle">Critical (850-1000)</textPath>
            </text>

            <!-- Min/Max Markers -->
            <text x="56" y="162" font-size="9" fill="#94a3b8" font-weight="bold" text-anchor="middle">0</text>
            <text x="164" y="162" font-size="9" fill="#94a3b8" font-weight="bold" text-anchor="middle">1000</text>
          </svg>
        </div>

        <v-divider vertical class="mx-6"></v-divider>

        <!-- Risk Factors -->
        <div class="flex-grow-1 pt-2">
          <div class="font-weight-bold text-subtitle-2 text-grey-darken-3">Total Components</div>
          <div class="text-h5 text-blue-darken-2 mb-1" style="color: #1976D2 !important;">8</div>
          
          <v-divider class="my-4"></v-divider>

          <div class="font-weight-bold text-subtitle-2 text-grey-darken-3 mb-2">Top Risk Factors</div>
          <div class="d-flex flex-wrap text-caption" style="gap: 16px; row-gap: 8px;">
            <div class="d-flex align-center">
              <span class="text-blue-darken-2 font-weight-bold mr-1" style="font-size: 13px;">02</span>
              <span class="text-grey-darken-1">Runtime</span>
            </div>
            <div class="d-flex align-center">
              <span class="text-blue-darken-2 font-weight-bold mr-1" style="font-size: 13px;">4</span>
              <span class="text-grey-darken-1">Network Misconfigurations</span>
            </div>
            <div class="d-flex align-center">
              <span class="text-blue-darken-2 font-weight-bold mr-1" style="font-size: 13px;">2</span>
              <span class="text-grey-darken-1">Malware</span>
            </div>
            <div class="w-100 m-0 p-0" style="height: 0;"></div> <!-- Force line break -->
            <div class="d-flex align-center">
              <span class="text-blue-darken-2 font-weight-bold mr-1" style="font-size: 13px;">15</span>
              <span class="text-grey-darken-1">Technology</span>
            </div>
            <div class="d-flex align-center">
              <span class="text-blue-darken-2 font-weight-bold mr-1" style="font-size: 13px;">8</span>
              <span class="text-grey-darken-1">Third-party Library</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sparkline Area -->
      <div class="mt-auto position-relative">
        <div class="d-flex justify-end mb-1">
          <span class="text-caption text-grey-darken-2" style="font-size: 10px !important;">
            Showing Last <span class="font-weight-bold text-grey-darken-4">90 Days</span> <v-icon icon="mdi-calendar-blank" size="x-small" color="blue-darken-2"></v-icon>
          </span>
        </div>
        
        <div style="height: 60px;">
          <Line :data="sparklineData" :options="sparklineOptions" />
        </div>
      </div>

    </div>
  </v-card>
</template>

<script setup>
import { Chart as ChartJS, Tooltip, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(Tooltip, CategoryScale, LinearScale, PointElement, LineElement, Filler)

// Sparkline Data
const sparklineData = {
  labels: ['11/19', '', '', '', '', '', '', 'Today'],
  datasets: [
    {
      data: [850, 855, 845, 870, 890, 860, 870, 850],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 1.5,
      pointRadius: 3,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#3b82f6',
      pointBorderWidth: 1,
      fill: true,
      tension: 0.1
    }
  ]
}

const sparklineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  scales: {
    y: {
      min: 750, max: 950,
      ticks: { font: { size: 9 }, color: '#999', stepSize: 100 },
      border: { display: false },
      grid: { display: true, color: '#e2e8f0', borderDash: [4, 4], drawBorder: false }
    },
    x: {
      ticks: { font: { size: 9 }, color: '#999', maxRotation: 0 },
      grid: { display: false },
      border: { display: false }
    }
  }
}
</script>

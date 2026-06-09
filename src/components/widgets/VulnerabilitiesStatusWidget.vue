<template>
  <v-card class="widget-card d-flex flex-column h-100" elevation="0">
    <div class="px-4 py-4 font-weight-bold text-subtitle-2 text-uppercase">
      Vulnerabilities By Status
    </div>
    
    <div class="flex-grow-1 px-4 py-2">
      <v-table density="compact" class="qualys-table w-100" hover>
        <thead>
          <tr>
            <th class="text-left text-grey-darken-1 font-weight-bold" style="font-size: 10px !important;">STATUS</th>
            <th class="text-right text-grey-darken-1 font-weight-bold" style="font-size: 10px !important;">COUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.status">
            <td class="text-grey-darken-3 font-weight-medium py-2 text-uppercase" style="font-size: 11px !important;">{{ item.status }}</td>
            <td class="text-right text-blue-darken-2 font-weight-bold">{{ item.count }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-card>
</template>

<script setup>
const items = [
  { status: 'New', count: 300 },
  { status: 'Active', count: 340 },
  { status: 'Fixed', count: 120 },
  { status: 'Reopened', count: 70 }
]
</script>

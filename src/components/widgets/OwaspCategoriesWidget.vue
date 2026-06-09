<template>
  <v-card class="widget-card d-flex flex-column" elevation="0">
    <div class="px-4 py-4 font-weight-bold text-subtitle-2">
      OWASP API TOP 10 Categories
    </div>
    
    <div class="flex-grow-1 px-4 py-2">
      <v-table density="compact" class="qualys-table w-100" hover>
        <thead>
          <tr>
            <th class="text-left text-grey-darken-1 font-weight-bold" style="font-size: 10px !important;">CATEGORIES</th>
            <th class="text-right text-grey-darken-1 font-weight-bold" style="font-size: 10px !important;">COUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.category">
            <td class="text-grey-darken-3 font-weight-medium py-2">{{ item.category }}</td>
            <td class="text-right text-blue-darken-2 font-weight-bold">{{ item.count }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-card>
</template>

<script setup>
const items = [
  { category: 'Broken Object Level Authorization', count: 30 },
  { category: 'Broken Authentication', count: 24 },
  { category: 'Broken Object Property Level Authorization', count: 21 },
  { category: 'Unrestricted Resource Consumption', count: 8 },
  { category: 'Broken Function Level Authorization', count: 3 },
  { category: 'Unrestricted Access to Sensitive Business Flows', count: 3 }
]
</script>

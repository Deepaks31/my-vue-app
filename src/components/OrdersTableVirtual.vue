<template>
  <div class="pa-4 bg-white rounded-xl border mt-4">
    <div class="mb-4">
      <h3 class="font-weight-bold text-h6">Finished Orders (Virtual Scroll)</h3>
      <p class="text-caption text-grey">Rendering 10,000 items instantly using v-data-table-virtual with a fixed header.</p>
    </div>

    <v-data-table-virtual
      :headers="headers"
      :items="virtualItems"
      item-value="id"
      height="400"
      fixed-header
      class="border rounded-lg"
      density="compact"
      hover
    >
      <template v-slot:item.status="{ item }">
        <v-chip color="success" size="x-small" variant="flat">Finished</v-chip>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const headers = [
  { title: 'Historical ID', align: 'start', key: 'id' },
  { title: 'Date Closed', key: 'date' },
  { title: 'Status', key: 'status' },
  { title: 'Final Amount', key: 'amount' },
]

// Generate 10k items instantly
const virtualItems = computed(() => {
  return Array.from({ length: 10000 }, (v, k) => ({
    id: `#HIST-${99999 - k}`,
    date: `2023-${String((k % 12) + 1).padStart(2, '0')}-${String((k % 28) + 1).padStart(2, '0')}`,
    status: 'Finished',
    amount: `$${((k % 100) + 10.5).toFixed(2)}`
  }))
})
</script>

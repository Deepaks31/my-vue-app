<template>
  <div class="pa-4 bg-white rounded-xl border mt-4">
    <div class="mb-4 d-flex align-center justify-space-between">
      <div>
        <h3 class="font-weight-bold text-h6">Incomplete Orders (Server Side)</h3>
        <p class="text-caption text-grey">Simulating a slow API to demonstrate loading states and server-side events.</p>
      </div>
      <v-btn prepend-icon="mdi-refresh" variant="outlined" size="small" @click="loadItems({ page, itemsPerPage, sortBy })">Reload</v-btn>
    </div>

    <!-- Server Table -->
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      v-model:page="page"
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      item-value="id"
      @update:options="loadItems"
      class="border rounded-lg"
    >
      <!-- Loading Slot Override -->
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
      </template>

      <!-- Custom Badge -->
      <template v-slot:item.status="{ item }">
        <v-chip color="warning" size="small" variant="flat" class="font-weight-bold">{{ item.status }}</v-chip>
      </template>

    </v-data-table-server>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const itemsPerPage = ref(5)
const page = ref(1)
const sortBy = ref([])
const serverItems = ref([])
const totalItems = ref(0)
const loading = ref(true)

const headers = [
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Customer', key: 'customer' },
  { title: 'Status', key: 'status' },
  { title: 'Amount', key: 'amount' },
]

// Mock API Call
const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise(resolve => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = []
        for (let i = start; i < end; i++) {
          if (i >= 42) break // Max 42 items
          items.push({
            id: `#INC${2000 + i}`,
            customer: `User ${i}`,
            status: 'Incomplete',
            amount: `$${(Math.random() * 100 + 20).toFixed(2)}`
          })
        }
        
        // Mock sorting
        if (sortBy.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aVal = a[sortKey]
            const bVal = b[sortKey]
            let res = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
            if (sortOrder === 'desc') res = res * -1
            return res
          })
        }

        resolve({ items, total: 42 })
      }, 800) // Simulate network delay
    })
  }
}

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true
  const { items, total } = await FakeAPI.fetch({ page, itemsPerPage, sortBy })
  serverItems.value = items
  totalItems.value = total
  loading.value = false
}
</script>

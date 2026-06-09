<template>
  <div>
    <!-- Bulk Action Floating Bar (when items selected) -->
    <v-scale-transition>
      <v-card 
        v-if="selected.length > 0" 
        class="position-absolute bg-white px-4 py-2 d-flex align-center shadow-lg rounded-pill"
        style="z-index: 10; bottom: 80px; left: 50%; transform: translateX(-50%); box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important; border: 1px solid #e2e8f0;"
        elevation="0"
      >
        <span class="font-weight-bold text-body-2 mr-4">{{ selected.length }} Selected</span>
        <v-divider vertical class="my-2 mr-4"></v-divider>
        <v-btn variant="text" size="small" class="text-none font-weight-medium text-grey-darken-3 mr-2" prepend-icon="mdi-content-copy">Duplicate</v-btn>
        <v-btn variant="text" size="small" class="text-none font-weight-medium text-grey-darken-3 mr-2" prepend-icon="mdi-printer-outline">Print</v-btn>
        <v-btn variant="text" size="small" class="text-none font-weight-medium text-red-darken-1" prepend-icon="mdi-delete-outline" :loading="deleting" @click="bulkDelete">Delete</v-btn>
        <v-btn icon="mdi-close" variant="text" size="small" class="ml-2" color="grey" @click="selected = []"></v-btn>
      </v-card>
    </v-scale-transition>

    <v-data-table
      v-model="selected"
      v-model:expanded="expanded"
      :headers="headers"
      :items="processedOrders"
      :search="search"
      :items-per-page="itemsPerPage"
      v-model:page="page"
      show-select
      show-expand
      hover
      striped
      density="comfortable"
      class="orders-table"
      @click:row="handleRowClick"
    >
      <!-- TOP SLOT: Toolbar & Search -->
      <template v-slot:top>
        <div class="d-flex align-center justify-space-between py-4 px-2">
          <h2 class="text-h6 font-weight-bold text-grey-darken-4">All Orders</h2>
          
          <div class="d-flex" style="gap: 12px;">
            <v-text-field
              v-model="search"
              density="compact"
              variant="outlined"
              placeholder="Search table..."
              prepend-inner-icon="mdi-magnify"
              hide-details
              style="width: 250px;"
              bg-color="white"
            ></v-text-field>

            <!-- Filter & Sort -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn class="light-outlined-btn" height="40" prepend-icon="mdi-filter-variant" v-bind="props">
                  {{ statusFilter === 'All' ? 'Filter' : statusFilter }}
                </v-btn>
              </template>
              <v-list density="compact" width="150">
                <v-list-item link title="All Statuses" @click="statusFilter = 'All'"></v-list-item>
                <v-list-item link title="Pending" @click="statusFilter = 'Pending'"></v-list-item>
                <v-list-item link title="Completed" @click="statusFilter = 'Completed'"></v-list-item>
                <v-list-item link title="Refunded" @click="statusFilter = 'Refunded'"></v-list-item>
              </v-list>
            </v-menu>
            
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn class="light-outlined-btn" height="40" prepend-icon="mdi-sort" v-bind="props">
                  {{ sortOption === 'default' ? 'Sort' : sortLabels[sortOption] }}
                </v-btn>
              </template>
              <v-list density="compact" width="180">
                <v-list-item link title="Default" @click="sortOption = 'default'"></v-list-item>
                <v-list-item link title="Date: Newest" @click="sortOption = 'newest'"></v-list-item>
                <v-list-item link title="Date: Oldest" @click="sortOption = 'oldest'"></v-list-item>
                <v-list-item link title="Amount: High to Low" @click="sortOption = 'amountDesc'"></v-list-item>
                <v-list-item link title="Amount: Low to High" @click="sortOption = 'amountAsc'"></v-list-item>
              </v-list>
            </v-menu>

            <v-btn class="light-outlined-btn" height="40" prepend-icon="mdi-file-export-outline">Export Orders</v-btn>
            <v-btn class="dark-pill-btn" height="40" prepend-icon="mdi-plus">Add Orders</v-btn>
          </div>
        </div>
      </template>

      <!-- ITEM.CUSTOMER SLOT: Avatar + Name -->
      <template v-slot:item.customer="{ item }">
        <div class="d-flex align-center py-2">
          <v-avatar size="28" class="mr-3">
            <v-img :src="item.avatar"></v-img>
          </v-avatar>
          <span class="font-weight-medium text-grey-darken-3">{{ item.customer }}</span>
        </div>
      </template>

      <!-- ITEM.STATUS SLOT: Badges -->
      <template v-slot:item.status="{ item }">
        <v-chip 
          :color="item.statusColor" 
          variant="tonal" 
          size="small" 
          class="status-chip px-3 font-weight-bold rounded-pill"
        >
          {{ item.status }}
        </v-chip>
      </template>

      <!-- ITEM.ACTIONS SLOT -->
      <template v-slot:item.actions="{ item }">
        <div class="d-flex align-center">
          <v-tooltip text="Edit Order" location="top">
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-pencil-outline" size="small" variant="text" color="grey-darken-2" v-bind="props"></v-btn>
            </template>
          </v-tooltip>
          
          <v-tooltip text="Delete" location="top">
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-trash-can-outline" size="small" variant="text" color="red-lighten-1" v-bind="props"></v-btn>
            </template>
          </v-tooltip>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-horizontal" size="small" variant="text" color="grey-darken-2" v-bind="props"></v-btn>
            </template>
            <v-list density="compact" elevation="2" rounded="lg">
              <v-list-item link title="View Invoice"></v-list-item>
              <v-list-item link title="Send Email"></v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>

      <!-- EXPANDED ROW SLOT: Native v-table -->
      <template v-slot:expanded-row="{ columns, item }">
        <tr class="bg-grey-lighten-5">
          <td :colspan="columns.length" class="pa-4">
            <v-card variant="outlined" class="bg-white">
              <v-table density="compact">
                <thead>
                  <tr>
                    <th class="text-left">Product Name</th>
                    <th class="text-center">Qty</th>
                    <th class="text-right">Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(prod, i) in item.items" :key="i">
                    <td>{{ prod.product }}</td>
                    <td class="text-center">{{ prod.qty }}</td>
                    <td class="text-right">{{ prod.price }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </td>
        </tr>
      </template>

      <!-- BOTTOM SLOT: Custom Pagination -->
      <template v-slot:bottom>
        <div class="d-flex align-center justify-space-between py-4 px-2 border-top mt-2">
          <span class="text-body-2 text-grey-darken-1">
            Showing <span class="font-weight-bold text-grey-darken-4">{{ processedOrders.length === 0 ? 0 : startRange }}</span>-<span class="font-weight-bold text-grey-darken-4">{{ endRange }}</span> of <span class="font-weight-bold text-grey-darken-4">{{ processedOrders.length }}</span> entries
          </span>
          
          <div class="d-flex align-center">
            <v-select
              v-model="itemsPerPage"
              :items="[5, 10, 15, 25]"
              variant="outlined"
              density="compact"
              hide-details
              style="width: 80px;"
              class="mr-4"
            ></v-select>
            
            <v-pagination
              v-model="page"
              :length="pageCount"
              total-visible="5"
              density="comfortable"
              active-color="primary"
            ></v-pagination>
          </div>
        </div>
      </template>

    </v-data-table>

    <!-- Dialog for Row Click Demo -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card class="rounded-xl pa-4">
        <v-card-title class="font-weight-bold text-h6">Order Summary</v-card-title>
        <v-card-text>
          You clicked on order <strong>{{ clickedOrder?.id }}</strong> from {{ clickedOrder?.customer }}.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { allOrders } from '../mockData'

const search = ref('')
const selected = ref([])
const expanded = ref([])
const page = ref(1)
const itemsPerPage = ref(10)
const deleting = ref(false)
const dialog = ref(false)
const clickedOrder = ref(null)

const statusFilter = ref('All')
const sortOption = ref('default')

const sortLabels = {
  newest: 'Newest',
  oldest: 'Oldest',
  amountDesc: 'Highest Amount',
  amountAsc: 'Lowest Amount'
}

const headers = [
  { title: 'Order Number', key: 'id', align: 'start' },
  { title: 'Customer Name', key: 'customer' },
  { title: 'Order Date', key: 'date' },
  { title: 'Status', key: 'status' },
  { title: 'Total Amount', key: 'amount' },
  { title: 'Payment Status', key: 'payment' },
  { title: 'Action', key: 'actions', sortable: false, align: 'center' },
]

const processedOrders = computed(() => {
  let result = [...allOrders]
  
  // Apply Filter
  if (statusFilter.value !== 'All') {
    result = result.filter(o => o.status === statusFilter.value)
  }
  
  // Apply Sort
  if (sortOption.value === 'newest') {
    result.sort((a, b) => {
      const idA = parseInt(a.id.replace('#ORD', ''))
      const idB = parseInt(b.id.replace('#ORD', ''))
      return idB - idA
    })
  } else if (sortOption.value === 'oldest') {
    result.sort((a, b) => {
      const idA = parseInt(a.id.replace('#ORD', ''))
      const idB = parseInt(b.id.replace('#ORD', ''))
      return idA - idB
    })
  } else if (sortOption.value === 'amountDesc') {
    result.sort((a, b) => {
      const amtA = parseFloat(a.amount.replace('$', ''))
      const amtB = parseFloat(b.amount.replace('$', ''))
      return amtB - amtA
    })
  } else if (sortOption.value === 'amountAsc') {
    result.sort((a, b) => {
      const amtA = parseFloat(a.amount.replace('$', ''))
      const amtB = parseFloat(b.amount.replace('$', ''))
      return amtA - amtB
    })
  }
  
  return result
})

const pageCount = computed(() => Math.ceil(processedOrders.value.length / itemsPerPage.value))
const startRange = computed(() => (page.value - 1) * itemsPerPage.value + 1)
const endRange = computed(() => Math.min(page.value * itemsPerPage.value, processedOrders.value.length))

const handleRowClick = (event, { item }) => {
  clickedOrder.value = item
  dialog.value = true
}

const bulkDelete = () => {
  deleting.value = true
  setTimeout(() => {
    deleting.value = false
    selected.value = []
  }, 1000)
}
</script>

<style scoped>
.orders-table :deep(.v-data-table__th) {
  text-transform: uppercase;
  font-size: 11px !important;
  letter-spacing: 0.5px;
}
.border-top {
  border-top: 1px solid #f1f5f9;
}
</style>

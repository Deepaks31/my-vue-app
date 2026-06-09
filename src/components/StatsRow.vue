<template>
  <v-row class="mb-6">
    <v-col cols="12" sm="6" md="3">
      <v-card class="pa-5 d-flex flex-column" elevation="0">
        <div class="d-flex align-center mb-4">
          <div style="width: 8px; height: 8px; background-color: #6366f1; border-radius: 50%;" class="mr-2"></div>
          <span class="text-caption font-weight-medium text-grey-darken-2">Total Orders This Month</span>
        </div>
        <div class="text-h4 font-weight-bold text-grey-darken-4">200</div>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="3">
      <v-card class="pa-5 d-flex flex-column" elevation="0">
        <div class="d-flex align-center mb-4">
          <div style="width: 8px; height: 8px; background-color: #f59e0b; border-radius: 50%;" class="mr-2"></div>
          <span class="text-caption font-weight-medium text-grey-darken-2">Pending Orders</span>
        </div>
        <div class="text-h4 font-weight-bold text-grey-darken-4">20</div>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="3">
      <v-card class="pa-5 d-flex flex-column" elevation="0">
        <div class="d-flex align-center mb-4">
          <div style="width: 8px; height: 8px; background-color: #10b981; border-radius: 50%;" class="mr-2"></div>
          <span class="text-caption font-weight-medium text-grey-darken-2">Shipped Orders</span>
        </div>
        <div class="text-h4 font-weight-bold text-grey-darken-4">180</div>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="3">
      <v-card class="pa-5 d-flex flex-column" elevation="0">
        <div class="d-flex align-center mb-4">
          <div style="width: 8px; height: 8px; background-color: #ef4444; border-radius: 50%;" class="mr-2"></div>
          <span class="text-caption font-weight-medium text-grey-darken-2">Refunded Orders</span>
        </div>
        <div class="text-h4 font-weight-bold text-grey-darken-4">10</div>
      </v-card>
    </v-col>
  </v-row>
</template>

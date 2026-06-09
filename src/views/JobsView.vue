<template>
  <div class="bg-white min-vh-100">
    <!-- Page Content -->
    <v-container fluid class="pa-8" style="max-width: 1280px; margin: 0 auto;">
      <v-row>
        <!-- Left Column: Form Configuration -->
        <v-col cols="12" md="7" lg="8" class="pr-md-8">
          <JobFormLeft />
        </v-col>
        
        <!-- Right Column: Employer Details -->
        <v-col cols="12" md="5" lg="4">
          <EmployerDetailsRight />
        </v-col>
      </v-row>
    </v-container>
    
    <!-- Snackbar for notifications (optional, if we want to keep it locally in this view) -->
    <v-snackbar v-model="snackbar" :timeout="3000" color="success" location="top">
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import JobFormLeft from '../components/JobFormLeft.vue'
import EmployerDetailsRight from '../components/EmployerDetailsRight.vue'

const snackbar = ref(false)
const snackbarText = ref('')

// These functions could be exposed via provide/inject or emit, but since TopHeader from Jobs is not here,
// we might need to rely on the global header or keep it simple for now.
</script>

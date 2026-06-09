<template>
  <div class="d-flex flex-column" style="gap: 24px;">
    
    <!-- Employer Details Card -->
    <v-card class="pa-6" elevation="0">
      <h3 class="text-subtitle-1 font-weight-bold mb-6 text-grey-darken-4">Employer Details</h3>
      
      <!-- Company Autocomplete -->
      <div class="mb-4">
        <label class="text-label">Company</label>
        <v-autocomplete
          v-model="company"
          :items="companies"
          variant="outlined"
          density="compact"
          hide-details
        >
          <template v-slot:selection="{ item }">
            <div class="d-flex align-center py-1">
              <v-avatar rounded="lg" size="32" color="teal-darken-3" class="mr-3">
                <v-icon icon="mdi-shield-sun" color="white" size="small"></v-icon>
              </v-avatar>
              <div>
                <div class="text-caption text-grey-darken-1" style="font-size: 10px !important;">Company</div>
                <div class="text-body-2 font-weight-medium" style="line-height: 1;">{{ item.title }}</div>
              </div>
            </div>
          </template>
        </v-autocomplete>
      </div>
      
      <!-- Branch Select -->
      <div class="mb-4">
        <label class="text-label">Branch</label>
        <v-select
          v-model="branch"
          :items="branches"
          variant="outlined"
          density="compact"
          hide-details
        ></v-select>
      </div>
      
      <!-- Contact Person -->
      <div class="mb-4">
        <label class="text-label">Contact Person</label>
        <v-text-field
          v-model="contact"
          variant="outlined"
          density="compact"
          hide-details
        ></v-text-field>
      </div>
      
      <!-- Phone Number -->
      <div class="mb-4">
        <label class="text-label">Phone Number</label>
        <div class="d-flex">
          <v-select
            v-model="countryCode"
            :items="['+66', '+1', '+44']"
            variant="outlined"
            density="compact"
            hide-details
            style="max-width: 90px;"
            class="mr-2"
          ></v-select>
          <v-text-field
            v-model="phone"
            variant="outlined"
            density="compact"
            hide-details
            class="flex-grow-1"
          ></v-text-field>
        </div>
      </div>
      
      <!-- Phone Verification (v-otp-input demo) -->
      <div>
        <label class="text-label">Verify Phone (OTP)</label>
        <v-otp-input
          v-model="otp"
          length="4"
          variant="outlined"
          density="compact"
          class="px-0"
        ></v-otp-input>
      </div>

    </v-card>

    <!-- Address Location Card -->
    <v-card class="pa-6" elevation="0">
      <div class="d-flex justify-space-between align-center mb-4">
        <h3 class="text-subtitle-1 font-weight-bold text-grey-darken-4">Address Location</h3>
        
        <!-- v-dialog demo for editing address -->
        <v-dialog v-model="addressDialog" max-width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="text" size="small" color="#ea580c" class="text-none">Edit</v-btn>
          </template>
          <v-card>
            <v-card-title>Edit Address</v-card-title>
            <v-card-text>
              <v-textarea label="Full Address" variant="outlined" rows="3"></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" variant="text" @click="addressDialog = false">Close</v-btn>
              <v-btn color="#ea580c" variant="text" @click="addressDialog = false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      
      <div class="d-flex align-start mb-4">
        <v-icon icon="mdi-map-marker" color="grey-darken-2" class="mr-2 mt-1" size="small"></v-icon>
        <div class="text-body-2 text-grey-darken-2">
          41, 30 Soi Aonui, Wichit, Mueang Phuket District, Phuket 83000, Thailand
        </div>
      </div>
      
      <!-- Mock Map Area -->
      <div class="map-placeholder rounded-lg bg-teal-lighten-5 position-relative overflow-hidden" style="height: 180px;">
        <div class="position-absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
          <v-icon icon="mdi-map" size="large" color="teal-lighten-2"></v-icon>
          <div class="text-caption text-teal-darken-1 mt-2">Map Preview</div>
        </div>
        <div class="position-absolute bg-white px-2 py-1 rounded shadow-sm text-caption text-red-darken-1 font-weight-bold" style="bottom: 20%; right: 20%;">
          <v-icon icon="mdi-map-marker" size="x-small" color="red"></v-icon> Cape Panwa
        </div>
      </div>
      
    </v-card>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'

const companies = ref(['Royal Thai Retreats', 'Ocean View Hotels', 'City Center Spa'])
const company = ref('Royal Thai Retreats')
const branches = ref(['Phuket', 'Bangkok', 'Chiang Mai'])
const branch = ref('Phuket')
const contact = ref('Maria Tan')
const countryCode = ref('+66')
const phone = ref('8895-93899')
const otp = ref('')
const addressDialog = ref(false)
</script>

<style scoped>
.map-placeholder {
  border: 1px solid rgba(0,0,0,0.05);
}
:deep(.v-otp-input__field) {
  border-radius: 8px;
}
</style>

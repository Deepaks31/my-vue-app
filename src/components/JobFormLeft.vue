<template>
  <v-form ref="form" class="pb-16 relative">
    <div class="d-flex align-center justify-space-between mb-6">
      <h2 class="text-h5 font-weight-bold text-grey-darken-4">Create Job</h2>
      <!-- Help FAB -->
      <v-fab
        icon="mdi-help"
        color="info"
        size="small"
        location="top end"
        absolute
        style="z-index: 10;"
      >
        <v-tooltip activator="parent" location="left">Need help with job posting?</v-tooltip>
      </v-fab>
    </div>

    <!-- Alert Feedback Demo -->
    <v-alert
      type="info"
      variant="tonal"
      class="mb-6"
      closable
      text="This form auto-saves as a draft every 5 minutes."
    ></v-alert>
    
    <!-- Title -->
    <div class="mb-4">
      <label class="text-label">Job Title</label>
      <v-text-field
        v-model="jobTitle"
        variant="outlined"
        density="comfortable"
        placeholder="e.g. Housekeeping Attendant"
        hide-details
      ></v-text-field>
    </div>
    
    <!-- Category (Autocomplete) -->
    <div class="mb-6">
      <label class="text-label">Job Category</label>
      <v-autocomplete
        v-model="category"
        :items="['Housekeeping', 'Management', 'Engineering', 'Food & Beverage']"
        variant="outlined"
        density="comfortable"
        hide-details
      ></v-autocomplete>
    </div>
    
    <!-- Employment Type -->
    <div class="mb-6">
      <label class="text-label">Employment Type</label>
      <v-radio-group v-model="employmentType" inline hide-details>
        <v-radio label="Part-time" value="part" color="#ea580c"></v-radio>
        <v-radio label="Full-time" value="full" color="#ea580c" class="ml-4"></v-radio>
        <v-radio label="Internship" value="intern" color="#ea580c" class="ml-4"></v-radio>
        <v-radio label="Contract" value="contract" color="#ea580c" class="ml-4"></v-radio>
      </v-radio-group>
    </div>

    <!-- Switch for Remote -->
    <div class="mb-6">
      <v-switch
        v-model="isRemote"
        label="Remote Work Allowed"
        color="#ea580c"
        hide-details
        inset
        density="compact"
      ></v-switch>
    </div>
    
    <!-- Dates and Numbers -->
    <v-row class="mb-2">
      <v-col cols="12" sm="6">
        <label class="text-label">Deadline</label>
        <v-text-field
          type="date"
          v-model="deadline"
          variant="outlined"
          density="comfortable"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <label class="text-label">Number of Openings</label>
        <!-- Emulating v-number-input -->
        <v-text-field
          type="number"
          v-model="openings"
          variant="outlined"
          density="comfortable"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    
    <v-row class="mb-4">
      <v-col cols="12" sm="6">
        <label class="text-label">Start Date</label>
        <v-text-field
          type="date"
          v-model="startDate"
          variant="outlined"
          density="comfortable"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <label class="text-label">End Date</label>
        <v-text-field
          type="date"
          v-model="endDate"
          variant="outlined"
          density="comfortable"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Compensation Section -->
    <v-divider class="my-6"></v-divider>
    <h3 class="text-subtitle-1 font-weight-bold mb-4 text-grey-darken-4">Compensation</h3>
    
    <div class="mb-2">
      <v-checkbox
        v-model="usePriceRange"
        label="Use price range"
        color="#ea580c"
        hide-details
        density="compact"
      ></v-checkbox>
    </div>

    <v-row class="mb-4 align-end">
      <v-col cols="12" sm="4">
        <label class="text-label">Rate Amount</label>
        <v-text-field
          v-model="rateMin"
          prefix="THB"
          variant="outlined"
          density="comfortable"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1" class="text-center pb-3">
        <span>-</span>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="rateMax"
          prefix="THB"
          suffix="/Hour"
          variant="outlined"
          density="comfortable"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <!-- Btn Toggle Demo -->
        <v-btn-toggle v-model="currency" variant="outlined" density="comfortable" divided>
          <v-btn value="THB">THB</v-btn>
          <v-btn value="USD">USD</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <!-- Range Slider Demo -->
    <div class="mb-6 px-2">
      <label class="text-label mb-8">Expected Salary Range Overview</label>
      <v-range-slider
        v-model="salaryRange"
        step="100"
        min="0"
        max="2000"
        thumb-label="always"
        color="#ea580c"
        track-color="grey-lighten-2"
      ></v-range-slider>
    </div>

    <!-- Requirements & Advanced Settings via Tabs -->
    <v-divider class="my-6"></v-divider>
    <v-tabs v-model="tab" color="#ea580c" class="mb-4">
      <v-tab value="desc">Job Description</v-tab>
      <v-tab value="req">Requirements</v-tab>
      <v-tab value="adv">Advanced</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      
      <!-- Tab 1: Description -->
      <v-window-item value="desc">
        <div class="mb-4">
          <!-- Textarea -->
          <v-textarea
            v-model="description"
            variant="outlined"
            auto-grow
            rows="5"
            hide-details
            placeholder="Describe the responsibilities..."
          >
            <template v-slot:prepend-inner>
              <div class="d-flex w-100 border-bottom pb-2 mb-2 px-1 text-grey-darken-1" style="gap: 16px;">
                <v-icon icon="mdi-format-bold" size="small"></v-icon>
                <v-icon icon="mdi-format-italic" size="small"></v-icon>
                <v-icon icon="mdi-format-underline" size="small"></v-icon>
                <v-icon icon="mdi-format-list-bulleted" size="small"></v-icon>
              </div>
            </template>
          </v-textarea>
        </div>

        <div class="mb-4">
          <label class="text-label">Additional Notes</label>
          <v-textarea
            v-model="notes"
            variant="outlined"
            rows="3"
            hide-details
            placeholder="Uniforms provided..."
          ></v-textarea>
        </div>
        
        <!-- File Input -->
        <div class="mb-4">
          <label class="text-label">Attach Job Document (Optional)</label>
          <v-file-input
            variant="outlined"
            density="compact"
            prepend-icon=""
            prepend-inner-icon="mdi-paperclip"
            placeholder="Upload PDF"
          ></v-file-input>
        </div>
      </v-window-item>

      <!-- Tab 2: Requirements -->
      <v-window-item value="req">
        <!-- Combobox -->
        <div class="mb-6 mt-2">
          <label class="text-label">Required Skills (Combobox)</label>
          <v-combobox
            v-model="skills"
            :items="['Cleaning', 'Customer Service', 'Time Management', 'Physical Stamina']"
            multiple
            chips
            variant="outlined"
            density="comfortable"
          ></v-combobox>
        </div>

        <!-- Rating -->
        <div class="mb-6">
          <label class="text-label">Minimum Candidate Rating Required</label>
          <v-rating
            v-model="minRating"
            active-color="#ea580c"
            color="grey-lighten-1"
            half-increments
            hover
          ></v-rating>
        </div>

        <!-- Chip Group -->
        <div class="mb-6">
          <label class="text-label">Perks Offered</label>
          <v-chip-group
            v-model="perks"
            column
            multiple
            selected-class="bg-orange-lighten-4 text-orange-darken-4"
          >
            <v-chip variant="outlined">Health Insurance</v-chip>
            <v-chip variant="outlined">Free Meals</v-chip>
            <v-chip variant="outlined">Housing Allowance</v-chip>
            <v-chip variant="outlined">Transport</v-chip>
          </v-chip-group>
        </div>
      </v-window-item>

      <!-- Tab 3: Advanced -->
      <v-window-item value="adv">
        <!-- Slider -->
        <div class="mb-8 mt-4 px-2">
          <label class="text-label mb-2">Probation Period (Months)</label>
          <v-slider
            v-model="probation"
            step="1"
            max="12"
            min="0"
            thumb-label="always"
            color="#ea580c"
          ></v-slider>
        </div>

        <!-- Color Picker -->
        <div class="mb-6">
          <label class="text-label mb-2">Job Tag Color</label>
          <v-color-picker
            v-model="tagColor"
            hide-canvas
            hide-inputs
            hide-sliders
            show-swatches
            elevation="0"
            class="border"
          ></v-color-picker>
        </div>
      </v-window-item>

    </v-window>

    <!-- Expansion Panels: Working Shift -->
    <v-expansion-panels v-model="panel" class="mt-6" variant="accordion">
      <v-expansion-panel elevation="0" class="border">
        <v-expansion-panel-title class="font-weight-bold text-subtitle-1">
          Working Shift Schedule
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          
          <v-table class="text-caption shift-table border rounded mt-2">
            <thead>
              <tr class="bg-grey-lighten-4">
                <th class="text-left font-weight-bold">Shift</th>
                <th class="text-center font-weight-bold">Mon</th>
                <th class="text-center font-weight-bold">Tue</th>
                <th class="text-center font-weight-bold">Wed</th>
                <th class="text-center font-weight-bold">Thu</th>
                <th class="text-center font-weight-bold">Fri</th>
                <th class="text-center font-weight-bold">Sat</th>
                <th class="text-center font-weight-bold">Sun</th>
              </tr>
            </thead>
            <tbody>
              <!-- Morning -->
              <tr>
                <td class="py-2">
                  <div class="font-weight-medium text-grey-darken-3">Morning</div>
                  <div class="text-grey-lighten-1" style="font-size: 10px;">08:00 - 12:00</div>
                </td>
                <td class="text-center px-0"><v-checkbox-btn color="#ea580c" model-value="true" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0"><v-checkbox-btn color="#ea580c" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0"><v-checkbox-btn color="#ea580c" model-value="true" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0"><v-checkbox-btn color="#ea580c" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0"><v-checkbox-btn color="#ea580c" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0"><v-checkbox-btn color="#ea580c" model-value="true" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0"><v-checkbox-btn color="#ea580c" model-value="true" class="mx-auto"></v-checkbox-btn></td>
              </tr>
              <!-- Afternoon -->
              <tr>
                <td class="py-2">
                  <div class="font-weight-medium text-grey-darken-3">Afternoon</div>
                  <div class="text-grey-lighten-1" style="font-size: 10px;">12:00 - 18:00</div>
                </td>
                <td class="text-center px-0"><v-checkbox-btn color="#ea580c" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0"><v-checkbox-btn color="#ea580c" model-value="true" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0"><v-checkbox-btn color="#ea580c" model-value="true" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0"><v-checkbox-btn color="#ea580c" model-value="true" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0"><v-checkbox-btn color="#ea580c" model-value="true" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0"><v-checkbox-btn color="#ea580c" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0"><v-checkbox-btn color="#ea580c" class="mx-auto"></v-checkbox-btn></td>
              </tr>
              <!-- Night -->
              <tr>
                <td class="py-2 border-bottom-0">
                  <div class="font-weight-medium text-grey-darken-3">Night</div>
                  <div class="text-grey-lighten-1" style="font-size: 10px;">18:00 - 24:00</div>
                </td>
                <td class="text-center px-0 border-bottom-0"><v-checkbox-btn color="#ea580c" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0 border-bottom-0"><v-checkbox-btn color="#ea580c" model-value="true" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0 border-bottom-0"><v-checkbox-btn color="#ea580c" model-value="true" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0 border-bottom-0"><v-checkbox-btn color="#ea580c" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0 border-bottom-0"><v-checkbox-btn color="#ea580c" model-value="true" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0 border-bottom-0"><v-checkbox-btn color="#ea580c" model-value="true" class="mx-auto"></v-checkbox-btn></td>
                <td class="text-center px-0 border-bottom-0"><v-checkbox-btn color="#ea580c" model-value="true" class="mx-auto"></v-checkbox-btn></td>
              </tr>
            </tbody>
          </v-table>

        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Stepper Demo at bottom -->
    <div class="mt-6">
      <h3 class="text-subtitle-1 font-weight-bold mb-4 text-grey-darken-4">Onboarding Checklist</h3>
      <v-stepper :items="['Review App', 'Background Check', 'Offer']" elevation="0" class="border"></v-stepper>
    </div>

  </v-form>
</template>

<script setup>
import { ref } from 'vue'

const jobTitle = ref('Housekeeping Attendant')
const category = ref('Housekeeping')
const employmentType = ref('part')
const isRemote = ref(false)
const deadline = ref('2021-04-10')
const openings = ref(15)
const startDate = ref('2021-04-14')
const endDate = ref('2021-05-14')

const usePriceRange = ref(true)
const rateMin = ref('200')
const rateMax = ref('600')
const currency = ref('THB')
const salaryRange = ref([200, 600])

const tab = ref('desc')
const description = ref('Royal Thai Retreats is seeking reliable and hardworking Housekeeping Attendants to join our team. Responsibilities include cleaning guest rooms, public areas, and ensuring a high level of cleanliness and guest satisfaction.')
const notes = ref('- Uniforms provided\n- Employee discounts on hotel services')

const skills = ref(['Cleaning', 'Time Management'])
const minRating = ref(3.5)
const perks = ref([])
const probation = ref(3)
const tagColor = ref('#ea580c')

const panel = ref([0]) // Open first panel by default
</script>

<style scoped>
.shift-table :deep(.v-selection-control) {
  justify-content: center;
}
.shift-table th, .shift-table td {
  border-bottom: 1px solid rgba(0,0,0,0.05);
}
.border-bottom-0 {
  border-bottom: none !important;
}
</style>

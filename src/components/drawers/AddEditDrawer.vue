<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    location="right"
    temporary
    width="450"
    elevation="4"
    class="bg-white"
  >
    <div class="d-flex align-center justify-space-between px-6 py-4 border-bottom">
      <div>
        <h3 class="text-h5 font-weight-bold text-grey-darken-4 mb-1">Add Data</h3>
        <div class="text-caption text-grey-darken-1">Internet Banking Component</div>
      </div>
      <v-btn icon="mdi-close" variant="text" color="grey-darken-1" @click="$emit('update:modelValue', false)"></v-btn>
    </div>

    <div class="px-6 py-6">
      <v-form>
        <div class="mb-4">
          <label class="text-caption font-weight-bold text-grey-darken-3 d-block mb-1">Name <span class="text-red">*</span></label>
          <v-text-field
            density="compact"
            variant="outlined"
            placeholder="Enter component name"
            hide-details
            class="bg-white"
          ></v-text-field>
        </div>

        <div class="mb-4">
          <label class="text-caption font-weight-bold text-grey-darken-3 d-block mb-1">File Upload <span class="text-red">*</span></label>
          <div class="d-flex align-center">
            <v-text-field
              density="compact"
              variant="outlined"
              placeholder="Select file"
              hide-details
              class="bg-white mr-2 flex-grow-1"
              readonly
            ></v-text-field>
            <v-btn class="bg-grey-lighten-3 text-grey-darken-3 border" height="40" elevation="0" style="border-color: #ccc !important;">Browse</v-btn>
          </div>
        </div>

        <div class="mb-4">
          <label class="text-caption font-weight-bold text-grey-darken-3 d-block mb-1">Type <span class="text-red">*</span></label>
          <v-select
            density="compact"
            variant="outlined"
            :items="['Web App', 'API', 'Code', 'SBOM', 'IaC', 'Tech']"
            placeholder="Select type"
            hide-details
            class="bg-white"
          ></v-select>
        </div>

        <div class="mb-6">
          <label class="text-caption font-weight-bold text-grey-darken-3 d-block mb-1">Scale <span class="text-red">*</span></label>
          <v-select
            density="compact"
            variant="outlined"
            :items="['Single Instance', 'Multi Instance']"
            placeholder="Select scale"
            hide-details
            class="bg-white"
          ></v-select>
        </div>
      </v-form>
    </div>
    
    <template v-slot:append>
      <div class="pa-4 border-top bg-grey-lighten-4">
        <v-btn color="primary" block height="40" elevation="0" disabled>Add Component</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid #e2e8f0;
}
.border-top {
  border-top: 1px solid #e2e8f0;
}
</style>

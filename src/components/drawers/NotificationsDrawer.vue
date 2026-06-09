<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    location="right"
    temporary
    width="380"
    elevation="4"
    class="bg-white"
  >
    <div class="d-flex align-center justify-space-between px-4 py-3 border-bottom">
      <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-0">Notifications</h3>
      <v-btn icon="mdi-close" variant="text" size="small" color="grey-darken-1" @click="$emit('update:modelValue', false)"></v-btn>
    </div>

    <div class="px-4 py-3 d-flex justify-space-between align-center border-bottom bg-grey-lighten-4">
      <a href="#" class="text-caption text-blue-darken-2 text-decoration-none font-weight-medium">More events in the activity log &rarr;</a>
      <a href="#" class="text-caption text-grey-darken-2 text-decoration-none">Dismiss all</a>
    </div>

    <v-list class="pa-0">
      <template v-for="(item, index) in notifications" :key="index">
        <v-list-item class="px-4 py-3 border-bottom">
          <template v-slot:prepend>
            <v-icon icon="mdi-check-circle" color="green-darken-1" size="small" class="mt-1 mr-3 align-self-start"></v-icon>
          </template>
          
          <div class="d-flex justify-space-between align-start w-100 mb-1">
            <span class="text-subtitle-2 font-weight-bold text-grey-darken-4">{{ item.title }}</span>
            <v-btn icon="mdi-close" variant="text" size="x-small" color="grey-lighten-1" class="ml-2" style="margin-top: -4px; margin-right: -8px;"></v-btn>
          </div>
          
          <div class="text-caption text-grey-darken-2 mb-2">{{ item.description }}</div>
          <div class="text-caption text-grey-lighten-1 text-right">{{ item.time }}</div>
        </v-list-item>
      </template>
    </v-list>
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

const notifications = [
  { title: 'WebJob is now running', description: 'Successfully running falcon-usb-sendemail-5.', time: '20 minutes ago' },
  { title: 'WebJob is now running', description: 'Successfully running falcon-usb-api-7.', time: '20 minutes ago' },
  { title: 'WebJob is now running', description: 'Successfully running advanced-ai-Sendemail.', time: '21 minutes ago' },
  { title: 'WebJob is now running', description: 'Successfully running Advanced-Ai-Add-User2Entra.', time: '21 minutes ago' }
]
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid #e2e8f0;
}
</style>

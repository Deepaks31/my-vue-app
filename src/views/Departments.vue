<template>
  <v-container fluid class="pa-6">
    <div class="d-flex justify-space-between align-center mb-6 slide-down">
      <h2 class="text-h5 font-weight-bold mb-0 text-primary">Departments</h2>
    </div>

    <!-- Add/Edit Department Form -->
    <v-card class="mb-6 animated-card shadow-premium rounded-lg" v-if="authStore.user?.role === 'Admin'">
      <v-card-title class="bg-primary text-white py-3 font-weight-medium">
        {{ isEditing ? 'Edit Department' : 'Add New Department' }}
      </v-card-title>
      <v-card-text class="pt-6 pb-2">
        <v-form @submit.prevent="saveDepartment">
          <v-row>
            <v-col cols="12" md="9">
              <v-text-field
                v-model="department.name"
                label="Department Name"
                placeholder="e.g. Engineering"
                variant="outlined"
                density="compact"
                required
                class="interactive-input"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-center gap-2 pb-6">
              <v-btn
                type="submit"
                color="primary"
                class="flex-grow-1 interactive-btn"
                :loading="submitting"
              >
                {{ isEditing ? 'Update' : 'Add' }}
              </v-btn>
              <v-btn
                v-if="isEditing"
                color="secondary"
                variant="outlined"
                @click="cancelEdit"
                :disabled="submitting"
                class="interactive-btn"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Departments Table -->
    <v-card class="animated-card shadow-premium rounded-lg" style="animation-delay: 0.1s;">
      <v-card-title class="py-4 font-weight-medium">
        Department List
      </v-card-title>
      
      <v-divider></v-divider>

      <v-card-text v-if="loading" class="text-center py-10">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-card-text>

      <v-table v-else class="interactive-table">
        <thead class="bg-grey-lighten-4">
          <tr>
            <th class="text-left font-weight-bold" style="width: 20%">ID</th>
            <th class="text-left font-weight-bold">Department Name</th>
            <th class="text-right font-weight-bold" v-if="authStore.user?.role === 'Admin'">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dep in departments" :key="dep.id" class="table-row">
            <td class="font-weight-bold text-primary">#{{ dep.id }}</td>
            <td class="text-body-1">{{ dep.name }}</td>
            <td class="text-right" v-if="authStore.user?.role === 'Admin'">
              <v-btn
                size="small"
                color="info"
                variant="tonal"
                class="mr-2 action-btn"
                @click="editDepartment(dep)"
              >
                Edit
              </v-btn>
              <v-btn
                size="small"
                color="error"
                variant="tonal"
                class="action-btn"
                @click="removeDepartment(dep.id)"
              >
                Delete
              </v-btn>
            </td>
          </tr>
          <tr v-if="departments.length === 0">
            <td colspan="3" class="text-center py-8 text-medium-emphasis">No departments found.</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from '../services/departmentService';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

const departments = ref([]);
const loading = ref(true);
const submitting = ref(false);

const isEditing = ref(false);
const editId = ref(null);

const department = ref({
  name: ''
});

const loadDepartments = async () => {
  loading.value = true;
  try {
    const response = await getDepartments();
    departments.value = response.data;
  } catch (error) {
    toast.error('Failed to load departments');
  } finally {
    loading.value = false;
  }
};

const saveDepartment = async () => {
  if (!department.value.name.trim()) return;
  submitting.value = true;
  try {
    if (isEditing.value) {
      await updateDepartment(editId.value, department.value);
      toast.success('Department Updated Successfully');
    } else {
      await createDepartment(department.value);
      toast.success('Department Added Successfully');
    }
    cancelEdit();
    await loadDepartments();
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to save department');
  } finally {
    submitting.value = false;
  }
};

const editDepartment = (dep) => {
  isEditing.value = true;
  editId.value = dep.id;
  department.value = { name: dep.name };
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const cancelEdit = () => {
  isEditing.value = false;
  editId.value = null;
  department.value = { name: '' };
};

const removeDepartment = async (id) => {
  if (!confirm('Are you sure you want to delete this department?')) return;
  
  try {
    await deleteDepartment(id);
    toast.success('Department Deleted');
    await loadDepartments();
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete department');
  }
};

onMounted(() => {
  loadDepartments();
});
</script>

<style scoped>
.gap-2 { gap: 8px; }

/* Entry Animations */
.slide-down {
  animation: slideDown 0.5s ease-out;
}
.animated-card {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Premium Shadows */
.shadow-premium {
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1) !important;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.shadow-premium:hover {
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15) !important;
  transform: translateY(-2px);
}

/* Interactive Inputs */
:deep(.interactive-input .v-field) {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
:deep(.interactive-input .v-field--focused) {
  box-shadow: 0 4px 12px -4px rgba(15, 79, 154, 0.15);
  transform: translateY(-1px);
}

/* Buttons */
.interactive-btn {
  transition: all 0.2s ease;
}
.interactive-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 79, 154, 0.3) !important;
}
.interactive-btn:active {
  transform: translateY(0);
}

/* Table Hover */
.interactive-table .table-row {
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.interactive-table .table-row:hover {
  background-color: #f8fafc !important;
  transform: scale(1.002);
}

/* Action Buttons */
.action-btn {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.action-btn:hover {
  transform: scale(1.1);
}
</style>

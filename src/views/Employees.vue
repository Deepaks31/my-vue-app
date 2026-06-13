<template>
  <v-container fluid class="pa-6">
    <div class="d-flex justify-space-between align-center mb-6 slide-down">
      <h2 class="text-h5 font-weight-bold mb-0 text-primary">Employee Directory</h2>
    </div>

    <!-- Add/Edit Employee Form -->
    <v-card class="mb-6 animated-card shadow-premium rounded-lg" v-if="authStore.user?.role === 'Admin'">
      <v-card-title class="bg-primary text-white py-3 font-weight-medium">
        {{ isEditing ? 'Edit Employee / Allot Projects' : 'Add New Employee' }}
      </v-card-title>
      <v-card-text class="pt-6 pb-2">
        <v-form @submit.prevent="saveEmployee">
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="employee.name"
                label="Full Name"
                placeholder="John Doe"
                variant="outlined"
                density="compact"
                required
                class="interactive-input"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" md="3">
              <v-text-field
                v-model="employee.email"
                label="Email"
                type="email"
                placeholder="john@example.com"
                variant="outlined"
                density="compact"
                required
                class="interactive-input"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" md="2">
              <v-text-field
                v-model="employee.salary"
                label="Salary"
                type="number"
                placeholder="60000"
                variant="outlined"
                density="compact"
                required
                class="interactive-input"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" md="2">
              <v-select
                v-model="employee.departmentId"
                :items="departments"
                item-title="name"
                item-value="id"
                label="Department"
                variant="outlined"
                density="compact"
                required
                class="interactive-input"
              ></v-select>
            </v-col>

            <v-col cols="12" md="2">
              <v-select
                v-model="employee.projectIds"
                :items="allProjects"
                item-title="projectName"
                item-value="id"
                label="Projects"
                multiple
                chips
                variant="outlined"
                density="compact"
                class="interactive-input"
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 1" size="small">
                    <span>{{ item.title }}</span>
                  </v-chip>
                  <span
                    v-if="index === 1"
                    class="text-caption align-self-center mx-2"
                  >
                    (+{{ employee.projectIds.length - 1 }} others)
                  </span>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="d-flex justify-center gap-4 mb-2">
              <v-btn
                type="submit"
                color="primary"
                class="interactive-btn px-8"
                :loading="submitting"
              >
                {{ isEditing ? 'Update Employee' : 'Add Employee' }}
              </v-btn>
              <v-btn
                v-if="isEditing"
                color="secondary"
                variant="outlined"
                @click="cancelEdit"
                :disabled="submitting"
                class="interactive-btn px-8"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Employees Table -->
    <v-card class="animated-card shadow-premium rounded-lg" style="animation-delay: 0.1s;">
      <v-card-title class="py-4 font-weight-medium">
        All Employees
      </v-card-title>
      
      <v-divider></v-divider>

      <v-card-text v-if="loading" class="text-center py-10">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-card-text>

      <v-table v-else class="interactive-table">
        <thead class="bg-grey-lighten-4">
          <tr>
            <th class="text-left font-weight-bold">Name</th>
            <th class="text-left font-weight-bold">Email</th>
            <th class="text-left font-weight-bold">Salary</th>
            <th class="text-left font-weight-bold">Department</th>
            <th class="text-left font-weight-bold">Projects</th>
            <th class="text-right font-weight-bold" v-if="authStore.user?.role === 'Admin'">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.id" class="table-row">
            <td class="font-weight-bold text-primary">{{ emp.name }}</td>
            <td class="text-body-1">{{ emp.email }}</td>
            <td class="text-body-1">${{ emp.salary.toLocaleString() }}</td>
            <td>
              <v-chip
                :color="emp.departmentName === 'Unassigned' ? 'error' : 'grey-darken-3'"
                size="small"
                variant="tonal"
                class="font-weight-medium"
              >
                {{ emp.departmentName }}
              </v-chip>
            </td>
            <td>
              <v-chip
                v-for="p in emp.projects"
                :key="p"
                color="info"
                size="small"
                variant="tonal"
                class="mr-1 mb-1 text-black font-weight-medium"
              >
                {{ p }}
              </v-chip>
              <span v-if="!emp.projects || emp.projects.length === 0" class="text-caption text-medium-emphasis">
                None
              </span>
            </td>
            <td class="text-right" v-if="authStore.user?.role === 'Admin'">
              <v-btn
                size="small"
                color="info"
                variant="tonal"
                class="mr-2 mb-1 action-btn"
                @click="editEmployee(emp)"
              >
                Edit
              </v-btn>
              <v-btn
                size="small"
                color="error"
                variant="tonal"
                class="mb-1 action-btn"
                @click="removeEmployee(emp.id)"
              >
                Delete
              </v-btn>
            </td>
          </tr>
          <tr v-if="employees.length === 0">
            <td colspan="6" class="text-center py-8 text-medium-emphasis">No employees found.</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employeeService';
import { getDepartments } from '../services/departmentService';
import { getProjects } from '../services/projectService';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

const employees = ref([]);
const departments = ref([]);
const allProjects = ref([]);
const loading = ref(true);
const submitting = ref(false);

const isEditing = ref(false);
const editId = ref(null);

const employee = ref({
  name: '',
  email: '',
  salary: '',
  departmentId: null,
  projectIds: []
});

const loadData = async () => {
  loading.value = true;
  try {
    const [empRes, deptRes, projRes] = await Promise.all([
      getEmployees(),
      getDepartments(),
      getProjects()
    ]);
    employees.value = empRes.data;
    departments.value = deptRes.data;
    allProjects.value = projRes.data;
  } catch (error) {
    toast.error('Failed to load data');
  } finally {
    loading.value = false;
  }
};

const saveEmployee = async () => {
  if (!employee.value.name || !employee.value.email || !employee.value.salary) return;
  submitting.value = true;
  try {
    const payload = { ...employee.value };
    if (!payload.departmentId) {
      payload.departmentId = null;
    }

    if (isEditing.value) {
      await updateEmployee(editId.value, payload);
      toast.success('Employee Updated Successfully');
    } else {
      await createEmployee(payload);
      toast.success('Employee Added Successfully');
    }
    cancelEdit();
    await loadData();
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to save employee');
  } finally {
    submitting.value = false;
  }
};

const editEmployee = (emp) => {
  isEditing.value = true;
  editId.value = emp.id;
  
  // Find project IDs by mapping the names returned from API to the actual objects
  const selectedProjIds = allProjects.value
    .filter(p => emp.projects && emp.projects.includes(p.projectName))
    .map(p => p.id);

  let deptId = null;
  if (emp.departmentName !== 'Unassigned') {
    const dept = departments.value.find(d => d.name === emp.departmentName);
    if (dept) deptId = dept.id;
  }

  employee.value = {
    name: emp.name,
    email: emp.email,
    salary: emp.salary,
    departmentId: deptId,
    projectIds: selectedProjIds
  };
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const cancelEdit = () => {
  isEditing.value = false;
  editId.value = null;
  employee.value = { name: '', email: '', salary: '', departmentId: null, projectIds: [] };
};

const removeEmployee = async (id) => {
  if (!confirm('Are you sure you want to delete this employee?')) return;
  
  try {
    await deleteEmployee(id);
    toast.success('Employee Deleted');
    await loadData();
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete employee');
  }
};

onMounted(() => {
  loadData();
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

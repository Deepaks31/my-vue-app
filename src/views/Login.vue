<template>
  <div class="auth-wrapper fill-height d-flex justify-center align-center">
    <v-card class="auth-card pa-8" width="100%" max-width="420">
      <div class="text-center mb-6">
        <v-icon icon="mdi-shield-star" color="red-darken-3" size="x-large" class="mb-2"></v-icon>
        <h2 class="text-h4 font-weight-bold text-primary mb-1">
          EigenSecure
        </h2>
        <p class="text-subtitle-1 text-medium-emphasis">
          Sign in to your account
        </p>
      </div>
      
      <v-card-text class="pa-0">
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="username"
            label="Username"
            variant="outlined"
            prepend-inner-icon="mdi-account-outline"
            required
            class="mb-4 interactive-input"
            bg-color="white"
          ></v-text-field>
          
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            variant="outlined"
            prepend-inner-icon="mdi-lock-outline"
            required
            class="mb-6 interactive-input"
            bg-color="white"
          ></v-text-field>

          <v-btn
            type="submit"
            color="primary"
            block
            size="large"
            :loading="loading"
            class="mb-4 interactive-btn font-weight-bold"
            elevation="0"
          >
            Sign In
          </v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-center pt-0 pb-2">
        <span class="text-medium-emphasis me-2 text-body-2">Don't have an account?</span>
        <router-link to="/signup" class="text-primary font-weight-bold text-body-2 text-decoration-none hover-link">Create Account</router-link>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/authService';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'vue3-toastify';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const loading = ref(false);

const handleLogin = async () => {
  if (!username.value || !password.value) return;
  loading.value = true;
  try {
    const response = await login({
      username: username.value,
      password: password.value
    });
    
    authStore.setToken(response.data.token);
    toast.success("Welcome back!");
    router.push('/dashboard');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Invalid Credentials');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Simple light background */
.auth-wrapper {
  background-color: #f4f7fa;
  min-height: 100vh;
}

/* Clean, modern card */
.auth-card {
  background: #ffffff !important;
  border-radius: 16px !important;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08) !important;
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(15px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Interactive Inputs */
:deep(.interactive-input .v-field) {
  transition: all 0.2s ease;
  border-radius: 8px;
}
:deep(.interactive-input .v-field--focused) {
  border-color: #0f4f9a !important;
  box-shadow: 0 0 0 4px rgba(15, 79, 154, 0.1);
}

/* Interactive Button */
.interactive-btn {
  border-radius: 8px;
  transition: all 0.2s ease;
}
.interactive-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(15, 79, 154, 0.2) !important;
}

/* Hover Link */
.hover-link {
  transition: color 0.2s ease;
}
.hover-link:hover {
  color: #0b3d7a !important;
  text-decoration: underline !important;
}
</style>

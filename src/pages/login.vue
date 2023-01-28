<script setup lang="ts">
import logo from '@/assets/logo.svg?raw';
import { useTheme } from 'vuetify';

import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png';
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png';
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png';
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png';

const form = ref({
  email: '',
  password: '',
  remember: false,
});

const vuetifyTheme = useTheme();
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark;
});

const isPasswordVisible = ref(false);
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <!-- eslint-disable vue/no-v-html -->
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase"> Materio </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">Welcome to Materio! 👋🏻</h5>
        <p class="mb-0">Please sign-in to your account and start the adventure</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <VCol cols="12">
              <!-- Google -->
            <VBtn
              block
              href="/login/federated/google"
              color="#dd4b39"
              class="text-white"
              prepend-icon="mdi-google"
            >
              Sign in with Google
            </VBtn>
            </VCol>

          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';
</style>

<route lang="yaml">
meta:
  layout: blank
</route>

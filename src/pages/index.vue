<script setup lang="ts">
import misc404 from '@/assets/images/pages/404.png';
import miscMaskDark from '@/assets/images/pages/misc-mask-dark.png';
import miscMaskLight from '@/assets/images/pages/misc-mask-light.png';
import tree from '@/assets/images/pages/tree.png';
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme();
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? miscMaskLight : miscMaskDark;
});
</script>

<template>
  <div class="misc-wrapper">
    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg
        :src="misc404"
        alt="Coming Soon"
        :max-width="800"
        class="mx-auto"
      />
      <VRow
        justify="center"
        class="d-flex gap-4"
      >
        <VBtn
          href="dashboard"
          class="mt-10"
        >
          Go to Dashboard
        </VBtn>
        <VBtn
          to="login"
          class="mt-10"
        >
          Login
        </VBtn>
      </VRow>
    </div>

    <!-- 👉 Footer -->
    <VImg
      :src="tree"
      class="misc-footer-tree d-none d-md-block"
    />

    <VImg
      :src="authThemeMask"
      class="misc-footer-img d-none d-md-block"
    />
  </div>
</template>

<style lang="scss">
@use '@core/scss/pages/misc.scss';

.misc-footer-tree {
  inline-size: 15.625rem;
  inset-block-end: 3.5rem;
  inset-inline-start: 0.375rem;
}
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
</route>

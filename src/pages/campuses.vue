<script setup lang="ts">
import Organization from '@/models/organization';
const props = defineProps<{ organizations: Organization[] }>();
</script>

<template>
  <div>In campuses page {{ organizations.length }}</div>
</template>

<route lang="yaml">
meta:
  requiresOrganization: true
</route>

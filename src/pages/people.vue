<script setup lang="ts">
import Organization from '@/models/organization';
const props = defineProps<{ organizations: Organization[] }>();
</script>

<template>
  <div>In people page {{ organizations.length }}</div>
</template>


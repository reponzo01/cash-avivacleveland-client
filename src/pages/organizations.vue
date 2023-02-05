<script setup lang="ts">
import CardNoOrganizationsFound from '@/components/CardNoOrganizationsFound.vue';
import CardOrganization from '@/components/CardOrganization.vue';
import FormCreateNewOrganization from '@/components/FormCreateNewOrganization.vue';
import Organization from '@/models/organization';
const props = defineProps<{ organizations: Organization[] }>();
</script>

<template>
  <!-- <CardNoOrganizationsFound v-if="organizations.length === 0"> -->
  <CardNoOrganizationsFound>
    <VCardText>
      <p>Create your first organization below.</p>
    </VCardText>

    <VCardText>
      <FormCreateNewOrganization />
    </VCardText>
  </CardNoOrganizationsFound>

  <VRow>
    <VCol
      v-for="organization in props.organizations"
      :key="organization.id"
      cols="12"
      md="6"
      lg="4"
    >
      <CardOrganization :id="organization.id" :name="organization.name" :description="organization.description"/>
    </VCol>
  </VRow>
</template>

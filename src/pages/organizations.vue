<script setup lang="ts">
import CardCreateNewOrganization from '@/components/CardCreateNewOrganization.vue';
import CardOrganization from '@/components/CardOrganization.vue';
import FormCreateNewOrganization from '@/components/FormCreateNewOrganization.vue';
import Organization from '@/models/organization';

const props = defineProps<{ organizations: Organization[] }>();

const createNewOrganizationDialog = ref(false);

const showCreateNewOrganizationDialog = () => {
  createNewOrganizationDialog.value = true;
};

const closeCreateNewOrganizationDialog = () => {
  createNewOrganizationDialog.value = false;
};
</script>

<template>
  <CardCreateNewOrganization
    title="No organizations found!"
    v-if="organizations.length === 0"
  >
    <VCardText>
      <p>Create your first organization below.</p>
    </VCardText>

    <VCardText>
      <FormCreateNewOrganization :showCancelButton="false" :closeDialog="null" />
    </VCardText>
  </CardCreateNewOrganization>

  <VRow v-if="organizations.length > 0">
    <VCol>
      <VBtn
        color="primary"
        @click="showCreateNewOrganizationDialog"
      >
        <VIcon
          start
          icon="mdi-home-plus"
        />Create new organization
      </VBtn>
    </VCol>
  </VRow>
  <VRow>
    <VCol
      v-for="organization in props.organizations"
      :key="organization.id"
      cols="12"
      md="6"
      lg="4"
    >
      <CardOrganization
        :id="organization.id"
        :name="organization.name"
        :description="organization.description"
      />
    </VCol>
  </VRow>

  <VDialog
    v-model="createNewOrganizationDialog"
    width="1000"
  >
    <CardCreateNewOrganization title="Create new organization">
      <VCardText>
        <p>Create a new organization below.</p>
      </VCardText>

      <VCardText>
        <FormCreateNewOrganization :showCancelButton="true" :closeDialog="closeCreateNewOrganizationDialog" />
      </VCardText>
    </CardCreateNewOrganization>
  </VDialog>
</template>

<script lang="ts" setup>
import { useOrganizationStore } from '@/stores/OrganizationStore';
import DialogConfirm from './DialogConfirm.vue';
import DialogError from './DialogError.vue';

const props = defineProps<{ id: number; name: string; description: string }>();

const organizationStore = useOrganizationStore();

const errorDialog = ref(false);
const errorMessage = ref('');

const confirmDialog = ref(false);
const confirmMessage = ref('');

const deleteOrganization = async () => {
  await organizationStore.deleteOrganization(props.id);
  errorMessage.value = organizationStore.errorMessage;
  if (errorMessage.value.length) {
    showErrorDialog();
  }
};

const showErrorDialog = () => {
  errorDialog.value = true;
};
const closeErrorDialog = () => {
  errorDialog.value = false;
};

const showConfirmDialog = () => {
  confirmMessage.value = `Are you sure you want to delete organization ${props.name}? This cannot be undone.`;
  confirmDialog.value = true;
};
const closeConfirmDialog = () => {
  confirmDialog.value = false;
};
</script>

<template>
  <VCard>
    <VCardText class="d-flex flex-column">
      <VAvatar
        color="primary"
        variant="tonal"
        size="50"
        class="mb-4"
      >
        <VIcon
          size="2rem"
          icon="mdi-home-city-outline"
        />
      </VAvatar>

      <h6 class="text-h6">{{ props.name }}</h6>
    </VCardText>

    <VCardText>
      <p>{{ props.description }}</p>
    </VCardText>

    <VCardActions>
      <VRow>
        <VCol
          cols="auto"
          class="mr-auto"
        >
          <VBtn @click="() => {}">
            <VIcon
              start
              icon="mdi-home-edit"
            />Edit
          </VBtn>
        </VCol>
        <VCol cols="auto">
          <VBtn
            @click="showConfirmDialog"
            color="error"
          >
            <VIcon
              start
              icon="mdi-trash"
            />Delete
          </VBtn>
        </VCol>
      </VRow>
    </VCardActions>
  </VCard>
  <DialogError
    :errorDialog="errorDialog"
    :errorMessage="errorMessage"
    :closeErrorDialog="closeErrorDialog"
  />
  <DialogConfirm
    :confirmDialog="confirmDialog"
    :confirmMessage="confirmMessage"
    actionButtonText="Delete"
    closeButtonText="Cancel"
    :closeConfirmDialog="closeConfirmDialog"
    :actionConfirm="deleteOrganization"
  />
</template>

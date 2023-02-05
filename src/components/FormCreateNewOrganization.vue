<script lang="ts" setup>
import { useOrganizationStore } from '@/stores/OrganizationStore';
import { VForm } from 'vuetify/components';

const organizationStore = useOrganizationStore();

const valid = ref(false);
const name = ref('');
const description = ref('');
const errorDialog = ref(false);
const errorMessage = ref('');
const form = ref<VForm | null>(null);

const validateNameField = [
  (v: string) => (v && v.length > 0 && v.length < 255) || 'Please enter an organization name less than 255 characters',
  (v: string) => (!nameExistsInStore(v)) || 'This organization name already exists',
];
const validateDescriptionField = [
  (v: string) => !!v || v.length < 255 || 'Please enter a description less than 255 characters',
];

const nameExistsInStore = (name: string): boolean => {
  for (const org of organizationStore.organizations) {
    if (org.name === name) {
      return true;
    }
  }
  return false;
};

onMounted(() => {
  valid.value = false;
});

const submitForm = async () => {
  await form.value?.validate();
  if (valid.value) {
    await organizationStore.addNewOrganization(name.value, description.value);
    errorMessage.value = organizationStore.errorMessage;
    if (errorMessage.value.length) {
      showErrorDialog();
    }
    form.value?.reset();
  }
};

const showErrorDialog = () => {
  errorDialog.value = true;
};
const closeErrorDialog = () => {
  errorDialog.value = false;
};
</script>

<template>
  <VForm
    @submit.prevent="submitForm"
    v-model="valid"
    ref="form"
  >
    <VRow>
      <VCol cols="12">
        <VTextField
          v-model="name"
          :rules="validateNameField"
          label="Organization Name"
          placeholder="Organization Name"
        />
      </VCol>

      <VCol cols="12">
        <VTextField
          v-model="description"
          :rules="validateDescriptionField"
          label="Description"
          placeholder="Description"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn type="submit"> Create </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
        >
          Reset
        </VBtn>

        <VBtn
          @click="showErrorDialog"
          color="secondary"
          variant="tonal"
        >
          Modal
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
  <!-- TODO: Make this a reusable component -->
  <VDialog
    v-model="errorDialog"
    width="500"
  >
    <VCard color="#F44336">
      <VCardItem>
        <template #prepend>
          <VIcon
            size="1.9rem"
            color="white"
            icon="mdi-alert"
          />
        </template>
        <VCardTitle class="text-white"> Error! </VCardTitle>
      </VCardItem>

      <VCardText class="text-white"> {{ errorMessage }} </VCardText>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn
          color="white"
          @click="closeErrorDialog"
        >
          Close
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

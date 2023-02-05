<script lang="ts" setup>
import { useOrganizationStore } from '@/stores/OrganizationStore';
import { VForm } from 'vuetify/components';
import DialogError from './DialogError.vue';

const organizationStore = useOrganizationStore();

const props = defineProps<{ showCancelButton: boolean; closeDialog: Function | null }>();

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
  (v: string) => !v || (v && v.length < 255) || 'Please enter a description less than 255 characters',
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
    } else if (props.showCancelButton && props.closeDialog) {
      props.closeDialog();
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
        cols="6"
        class="d-flex gap-4 justify-start"
      >
        <VBtn type="submit" color="primary"> Create </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>

      <VCol
        cols="6"
        class="d-flex gap-4 justify-end"
        v-if="props.showCancelButton"
      >

        <VBtn
          color="secondary"
          variant="tonal"
          @click="props.closeDialog"
        >
          Cancel
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
  <DialogError
    :errorDialog="errorDialog"
    :errorMessage="errorMessage"
    :closeErrorDialog="closeErrorDialog"
  />
</template>

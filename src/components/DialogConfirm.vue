<script lang="ts" setup>
const props = defineProps<{
  confirmDialog: boolean;
  confirmMessage: string;
  actionButtonText: string;
  closeButtonText: string;
  closeConfirmDialog: Function;
  actionConfirm: Function;
}>();
</script>

<template>
  <VDialog
    v-model="props.confirmDialog"
    width="500"
  >
    <VCard>
      <VCardItem>
        <template #prepend>
          <VIcon
            size="1.9rem"
            icon="mdi-alert"
          />
        </template>
        <VCardTitle> Are you sure? </VCardTitle>
      </VCardItem>

      <VCardText> {{ props.confirmMessage }} </VCardText>
      <VCardActions>
        <VSpacer></VSpacer>
        <VCol
          cols="12"
          class="d-flex gap-4"
        >
          <VBtn
            color="error"
            @click="props.actionConfirm"
            variant="elevated"
          >
            {{ props.actionButtonText }}
          </VBtn>
          <VBtn
            @click="props.closeConfirmDialog"
            variant="elevated"
            color="secondary"
          >
            {{ props.closeButtonText }}
          </VBtn>
        </VCol>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

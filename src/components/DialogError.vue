<script lang="ts" setup>
const props = defineProps<{ errorDialog: boolean; errorMessage: string; closeErrorDialog: Function }>();
</script>

<template>
  <VDialog
    v-model="props.errorDialog"
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

      <VCardText class="text-white"> {{ props.errorMessage }} </VCardText>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn
          color="white"
          @click="props.closeErrorDialog"
        >
          Close
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

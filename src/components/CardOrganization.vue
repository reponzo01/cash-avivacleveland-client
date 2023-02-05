<script lang="ts" setup>
const props = defineProps<{ id: number; name: string; description: string }>();

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

    <slot>
      <VCardText>
        <p>{{ props.description }}</p>
      </VCardText>

      <VCardActions>
        <VBtn
          variant="elevated"
          to="organizations"
        >
          Get Started {{ props.id }}
        </VBtn>
      </VCardActions>
    </slot>
  </VCard>
</template>

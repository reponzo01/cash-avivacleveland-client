<script lang="ts" setup>
</script>

<template>
  <VRow>
    <VCol
      md="6"
      offset-md="3"
    >
      <VCard class="text-center">
        <VCardText class="d-flex flex-column justify-center align-center">
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

          <h6 class="text-h6">No Organizations Found!</h6>
        </VCardText>

        <slot>
          <VCardText>
            <p>To get started, click the button below to create your first organization.</p>
          </VCardText>

          <VCardActions class="justify-center">
            <VBtn
              variant="elevated"
              to="organizations"
            >
              Get Started
            </VBtn>
          </VCardActions>
        </slot>
      </VCard>
    </VCol>
  </VRow>
</template>

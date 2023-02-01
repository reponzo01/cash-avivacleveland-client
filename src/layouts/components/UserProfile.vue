<script setup lang="ts">
import User from '@/models/user';
import axios from 'axios';
import type { Anchor } from 'vuetify/lib/components';

const avatarBadgeProps = {
  dot: true,
  location: 'bottom right' as Anchor,
  offsetX: 3,
  offsetY: 3,
  color: 'success',
  bordered: true,
};

const user = ref<User>({ avatarUrl: '', email: '', id: -1, name: '', username: '' });

onBeforeMount(() => {
  let userString = localStorage.getItem('user');
  if (userString == null) {
    // TODO: Consider making a REST util for the user interface and its methods
    axios
      .get('users/me')
      .then(response => {
        if (response.status == 200) {
          user.value = <User>response.data;
          localStorage.setItem('user', JSON.stringify(user.value));
        }
      })
      .catch(err => {});
  } else {
    user.value = <User>JSON.parse(userString);
  }
});

const handleLogout = () => {
  localStorage.removeItem('user');
  window.location.replace('logout');
};
</script>

<template>
  <VBadge v-bind="avatarBadgeProps">
    <VAvatar
      style="cursor: pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="user.avatarUrl" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge v-bind="avatarBadgeProps">
                  <VAvatar
                    color="primary"
                    size="40"
                    variant="tonal"
                  >
                    <VImg :src="user.avatarUrl" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold"> {{ user?.name }} </VListItemTitle>
            <VListItemSubtitle class="text-disabled"> Admin </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Settings -->
          <VListItem to="/settings">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-cog-outline"
                size="22"
              />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="handleLogout">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-logout-variant"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>

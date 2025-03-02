<template>
  <v-snackbar
    v-model="visible"
    :color="snackbarColor"
    top
    :timeout="5000"
    multi-line
  >
    {{ message }}
  </v-snackbar>
</template>

<script>
import { computed } from 'vue';
import { useNotificationStore } from '@/stores/notificationStore';

export default {
  setup() {
    const notificationStore = useNotificationStore();

    const visible = computed(() => notificationStore.visible);
    const message = computed(() => notificationStore.message);
    const snackbarColor = computed(() => {
      switch (notificationStore.type) {
        case 'success':
          return 'success';
        case 'error':
          return 'error';
        case 'info':
          return 'info';
        default:
          return 'info';
      }
    });

    return { visible, message, snackbarColor };
  },
};
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>
        <div class="d-flex justify-space-between">
          <img
            style="cursor: pointer"
            src="@/assets/boat_co.webp"
            alt="Boat Co Logo"
            height="50"
            @click="$router.push('/')"
          >
          <ThemeChangerButton />
        </div>
      </v-toolbar-title>
    </v-app-bar>


    <v-main>
      <router-view />
      <Notification />
    </v-main>
  </v-app>
</template>
<script>
import ThemeChangerButton from "@/components/ThemeChangerButton.vue";
import Notification from "@/components/Notification.vue";
import { useNotificationStore } from './stores/notificationStore';

export default {
  components: {Notification, ThemeChangerButton},
  setup() {
    const notificationStore = useNotificationStore();

    const triggerSuccess = () => {
      notificationStore.showNotification('This is a success message!', 'success');
    };

    const triggerError = () => {
      notificationStore.showNotification('Something went wrong!', 'error');
    };

    const triggerInfo = () => {
      notificationStore.showNotification('Here is some information.', 'info');
    };

    return {
      triggerSuccess,
      triggerError,
      triggerInfo
    };
  },
};
</script>
<style>

</style>

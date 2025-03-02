import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
  const message = ref('');
  const type = ref('info');
  const visible = ref(false);
  let timeoutId = null;

  const showNotification = (msg, messageType = 'info') => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    message.value = msg;
    type.value = messageType;
    visible.value = true;

    timeoutId = setTimeout(() => {
      visible.value = false;
    }, 5000);
  };

  return { message, type, visible, showNotification };
});

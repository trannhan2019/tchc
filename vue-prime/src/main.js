import "@/assets/styles.scss";
import "@/assets/tailwind.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import ToastService from "primevue/toastservice";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
pinia.use(piniaPluginPersistedstate);
app.use(router);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".app-dark",
    },
  },
});

app.use(ToastService);

app.mount("#app");

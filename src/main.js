import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js"; // Import the router
import store from './store.js';

createApp(App)
.use(router)  // Register the router
.use(store)
.mount('#app');
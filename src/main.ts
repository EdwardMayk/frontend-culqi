import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import LoginCard from "./components/LoginCard.vue";
import ViewToken from "./components/ViewToken.vue";
import DetailsCard from "./components/DetailsCard.vue";

const routes = [
  { path: "/", component: LoginCard },
  { path: "/about", component: ViewToken },
  { path: "/details", component: DetailsCard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.mount("#app");

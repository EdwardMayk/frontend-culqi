<template>
  <div id="app">
    <nav class="bg-white text-black p-4">
      <div class="container mx-auto flex justify-between items-center">
        <img class="w-32" src="./assets/culqi.png" />
        <div>
          <a href="http://localhost:8080/" class="ml-4 hover:underline"
            >Inicio</a
          >
          <a href="http://localhost:8080/details" class="ml-4 hover:underline"
            >Detalles</a
          >
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginCard from "./components/LoginCard.vue";
import "./assets/tailwind.css";

@Options({
  components: {
    LoginCard,
  },
})
export default class App extends Vue {}
</script>

<style></style>

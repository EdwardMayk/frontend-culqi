<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <img alt="Vue logo" src="../assets/culqi.png" class="mb-8" />

    <div class="w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center text-secondary">Login</h1>
      <form
        @submit.prevent="login"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <div>
            <label
              for="username"
              class="block text-sm font-semibold text-secondary"
              >Usuario:</label
            >
          </div>
          <div>
            <input
              v-model="username"
              type="text"
              id="username"
              required
              class="w-full border border-primary rounded-lg px-4 py-3 mt-1 focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div class="mb-4">
          <div>
            <label
              for="password"
              class="block text-sm font-semibold text-secondary"
              >Contraseña:</label
            >
          </div>
          <div>
            <input
              v-model="password"
              type="password"
              id="password"
              required
              class="w-full border border-primary rounded-lg px-4 py-3 mt-1 focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div class="text-center">
          <button
            class="mt-4 bg-tertiary hover:bg-tertiary text-white font-bold py-4 px-10 rounded-full"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      username: "" as string,
      password: "" as string,
    };
  },
  methods: {
    login(this: { username: string; password: string }) {
      if (this.username === "usuario" && this.password === "contraseña") {
        console.log("Credenciales válidas");
        const pkComercio = "123456";
        localStorage.setItem("pkComercio", pkComercio);

        window.location.href = "/about";
      } else {
        alert("Credenciales incorrectas. Intenta de nuevo.");
      }
    },
  },
};
</script>

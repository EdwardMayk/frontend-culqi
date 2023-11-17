<template>
  <div class="bg-gray-100 min-h-screen flex justify-center items-center">
    <div class="flex-grow flex justify-center items-center">
      <div class="space-y-8">
        <div
          class="w-96 h-56 m-auto bg-primary rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110"
        >
          <div class="w-full px-8 absolute top-8">
            <div class="flex justify-between">
              <div>
                <p class="font-light">Nombre</p>
                <p class="font-medium tracking-widest">{{ cardHolderName }}</p>
              </div>
              <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
            </div>
            <div class="pt-2">
              <p class="font-light">Número de Tarjeta</p>
              <p class="font-medium tracking-more-wider">
                {{ formattedCardNumber }}
              </p>
            </div>
            <div class="pt-4 pr-6">
              <div class="flex justify-between">
                <div>
                  <p class="font-light text-xs">Valido hasta</p>
                  <p class="font-medium tracking-wider text-sm">
                    {{ formattedExpiryDate }}
                  </p>
                </div>
                <div>
                  <p class="font-light text-xs">CVV</p>
                  <p class="font-bold tracking-more-wider text-sm">{{ cvv }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form
          @submit.prevent="submitForm"
          class="bg-white p-6 rounded-md shadow-md"
        >
          <div class="mb-4">
            <label
              for="cardHolderName"
              class="block text-sm font-semibold text-secondary"
              >Email del Titular:</label
            >
            <input
              type="text"
              id="cardHolderName"
              v-model="cardHolderName"
              placeholder="Ingrese el email"
              class="w-full border border-primary rounded-lg px-4 py-3 mt-1 focus:outline-none focus:border-primary"
            />
          </div>

          <div class="mb-4">
            <label
              for="cardNumber"
              class="block text-sm font-semibold text-secondary"
            >
              Número de Tarjeta:</label
            >
            <input
              type="text"
              id="cardNumber"
              v-model="cardNumber"
              placeholder="Ingrese el número de tarjeta"
              class="w-full border border-primary rounded-lg px-4 py-3 mt-1 focus:outline-none focus:border-primary"
            />
          </div>

          <div class="mb-4">
            <label for="cvv" class="block text-sm font-semibold text-secondary"
              >CVV:</label
            >
            <input
              type="text"
              id="cvv"
              v-model="cvv"
              placeholder="Ingrese el CVV"
              class="w-full border border-primary rounded-lg px-4 py-3 mt-1 focus:outline-none focus:border-primary"
            />
          </div>

          <div class="flex space-x-4">
            <div class="w-1/2 mr-2">
              <label
                for="expirationMonth"
                class="block text-sm font-semibold text-secondary"
                >Mes de Expiración:</label
              >
              <input
                type="text"
                id="expirationMonth"
                v-model="expirationMonth"
                placeholder="MM"
                class="w-full border border-primary rounded-lg px-4 py-3 mt-1 focus:outline-none focus:border-primary"
              />
            </div>

            <div class="w-1/2 ml-2">
              <label
                for="expirationYear"
                class="block text-sm font-semibold text-secondary"
                >Año de Expiración:</label
              >
              <input
                type="text"
                id="expirationYear"
                v-model="expirationYear"
                placeholder="YYYY"
                class="w-full border border-primary rounded-lg px-4 py-3 mt-1 focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div class="text-center">
            <button
              type="submit"
              class="mt-4 bg-tertiary hover:bg-tertiary text-white font-bold py-4 px-10 rounded-full"
            >
              Generar Token
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-8 rounded-md max-w-md relative">
      <span
        class="absolute top-0 right-0 cursor-pointer text-xl p-4"
        @click="closeModal"
        >&times;</span
      >
      <p class="text-lg font-semibold mb-4 text-secondary">Token generado:</p>
      <p class="text-gray-700 select-all">{{ generatedToken }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const showModal = ref(false);
const generatedToken = ref("");

const cardHolderName = ref("");
const cardNumber = ref("");
const cvv = ref("");
const expirationMonth = ref("");
const expirationYear = ref("");

const formattedCardNumber = computed(() => cardNumber.value);
const formattedExpiryDate = computed(
  () => `${expirationMonth.value}/${expirationYear.value.slice(-2)}`
);
const createToken = async () => {
  try {
    const response = await fetch("http://localhost:3000/generate-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardNumber: Number(cardNumber.value),
        cvv: Number(cvv.value),
        expirationMonth: expirationMonth.value,
        expirationYear: expirationYear.value,
        email: cardHolderName.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud al servidor");
    }

    const result = await response.json();
    const token = result.token;

    showModal.value = true;
    generatedToken.value = token;
    console.log("Token generado:", token);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";

    console.error("Error al crear el token:", errorMessage);
  }
};

const closeModal = () => {
  showModal.value = false;
};

const submitForm = () => {
  createToken();
};
</script>

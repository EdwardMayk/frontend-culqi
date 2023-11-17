<template>
  <div class="bg-gray-100 min-h-screen flex justify-center items-center">
    <form
      @submit.prevent="submitForm"
      class="bg-white p-6 rounded-md shadow-md max-w-md mr-10"
    >
      <div class="mb-4">
        <label for="token" class="block text-xl font-bold pb-3 text-secondary">
          Token:
        </label>

        <input
          type="text"
          id="token"
          v-model="token"
          placeholder="Ingrese el token"
          class="w-full border border-primary rounded-lg px-4 py-3 mt-1 focus:outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        class="mt-1 bg-tertiary hover:bg-tertiary text-white font-bold py-2 px-4 rounded-full"
      >
        Obtener Datos de Tarjeta
      </button>
    </form>

    <div class="bg-gray-100 min-h-screen flex justify-center items-center">
      <div class="space-y-8">
        <div
          v-if="showCard"
          class="w-96 h-56 rounded-xl relative text-white shadow-lg transition-transform transform hover:scale-110 bg-primary"
        >
          <div class="w-full px-8 absolute top-8">
            <div class="flex justify-between">
              <div>
                <p class="font-light">Nombre</p>
                <p class="font-medium tracking-widest">{{ cardData.email }}</p>
              </div>
              <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
            </div>
            <div class="pt-2">
              <p class="font-light">Número de Tarjeta</p>
              <p class="font-medium tracking-more-wider">
                {{ cardData.cardNumber }}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="showErrorModal"
    class="fixed inset-0 z-10 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-md shadow-md max-w-md">
      <p class="text-black-500 font-semibold">
        Los datos de la tarjeta ya no están presentes o han expirado.
      </p>
      <button
        @click="closeErrorModal"
        class="mt-4 text-white font-bold py-2 px-4 rounded-full bg-primary hover:bg-primary-dark"
      >
        Cerrar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { CardData } from "../interface/cardData";

const showCard = ref(false);
const token = ref("");
const cardData = ref<CardData>({
  email: "",
  cardNumber: "",
  expirationMonth: "",
  expirationYear: "",
});

const showErrorModal = ref(false);

const openErrorModal = () => {
  showErrorModal.value = true;
};

const closeErrorModal = () => {
  showErrorModal.value = false;
};

const formattedExpiryDate = computed(() =>
  cardData.value.expirationYear
    ? `${cardData.value.expirationMonth}/${cardData.value.expirationYear.slice(
        -2
      )}`
    : ""
);

const submitForm = async () => {
  try {
    const response = await fetch("http://localhost:3000/card-data", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud al servidor");
    }

    const result = await response.json();

    if (
      result.cardData ===
      "Los datos de la tarjeta ya no están presentes o han expirado"
    ) {
      openErrorModal();
    } else {
      cardData.value = result.cardData;
      showCard.value = true;
    }
  } catch (error: any) {
    const errorMessage = error.message || "Error desconocido";
    console.error("Error al obtener datos de la tarjeta:", errorMessage);
  }
};
</script>

<template>
  <section class="w-full max-w-md">
    <h1
      class="font-semibold text-2xl dark:text-zinc-100 text-zinc-900 w-full mb-1"
    >
      Sign In
    </h1>
    <p class="text-zinc-500 dark:text-zinc-400 text-sm mb-8 w-full">
      Employee Login
    </p>
    <form @submit.prevent="Login" class="grid grid-cols-1 gap-3 w-full">
      <label class="font-medium dark:text-zinc-300 text-zinc-900 text-sm"
        >Employee ID</label
      >
      <input
        v-model="employeeId"
        class="rounded-md py-1 px-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60"
      />

      <label class="font-medium dark:text-zinc-300 text-zinc-900 text-sm"
        >Password</label
      >
      <input
        v-model="password"
        type="password"
        class="rounded-md py-1 p x-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60"
      />
      <button
        type="submit"
        class="dark:bg-zinc-100 bg-zinc-900 border-zinc-900 py-1.5 border dark:border-zinc-100 rounded-md mt-2 dark:text-zinc-900 text-zinc-100 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sign In
      </button>
    </form>
    <hr class="h-0 border-t mt-8 dark:border-zinc-600 border-zinc-300" />
  </section>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const employeeId = ref("");
const password = ref("");
const Login = async () => {
  const account = { id: employeeId.value, password: password.value };
  const res = await axios.post("http://127.0.0.1:3000/api/login", account);
  if (res.data.status === 200) {
    window.location.href = "/orders";
  } else {
    window.location.href = "/page-not-found";
  }
};
</script>

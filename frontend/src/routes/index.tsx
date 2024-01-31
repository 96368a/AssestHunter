import { A } from "@solidjs/router";
import Counter from "~/components/Counter";

export default function Home() {
  return (
<main class="bg-gray-100 dark:bg-gray-900">

<div class="min-h-screen flex items-center justify-center">
  <div class="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-96">
    <h1 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Login</h1>
    <form>
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Username</label>
        <input type="text" id="username" name="username" class="mt-1 p-2 w-full border rounded-md dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-300" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Password</label>
        <input type="password" id="password" name="password" class="mt-1 p-2 w-full border rounded-md dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-300" />
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Login</button>
    </form>
  </div>
</div>

</main>
  );
}

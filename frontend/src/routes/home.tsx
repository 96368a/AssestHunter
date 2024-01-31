import { useLocation, type RouteSectionProps, redirect } from "@solidjs/router";
import { onMount } from "solid-js";
import { checkLogin } from "~/api/login";

export default function UsersLayout(props: RouteSectionProps) {
  onMount(() => {
    checkLogin().then((res) => {
      console.log(res);
      if (res.data.code && res.data.code != 200) {
        location.href = "/"
      }
    })
  })
  return (
    <div>
      <header class="bg-white dark:bg-gray-800 shadow px-10 py-2">
        <div class="flex">
          <div class="flex-1 flex items-center container">
            <div class="i-line-md:emoji-smile-wink-twotone text-4xl"></div>
            <div class="ml-4 w-full">
              <input type="text" placeholder="Type here" class="input input-bordered w-full input-md max-w-6xl" />
            </div>
          </div>
          <div class="flex items-center justify-end">
            <button class="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none">
              <div class="i-mdi-person"></div>
              <i>管理员</i>
            </button>
            <button class="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none ml-4">
              <div><div class="icon i-mdi:exit-to-app inline-block"></div>注销登录</div>
            </button>
          </div>
        </div>

      </header>

      <div class="container mx-auto mt-4 px-4">
        <div class="flex">
          <div class="w-1/4">
            <nav class="bg-white dark:bg-gray-800 shadow">
              <div class="p-4">
                <ul class="space-y-2">
                  <li>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 block">
                      <i class="material-icons">dashboard</i>
                      <span class="ml-2">Dashboard</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 block">
                      <i class="material-icons">settings</i>
                      <span class="ml-2">Settings</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 block">
                      <i class="material-icons">person</i>
                      <span class="ml-2">Profile</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div class="w-3/4 ml-4">
            <div class="bg-white dark:bg-gray-800 shadow p-4">
              <h2 class="text-xl font-semibold">Welcome, John Doe</h2>
              <p class="text-gray-600 dark:text-gray-400 mt-2">You have 5 new notifications.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
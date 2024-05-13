import { A } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { checkLogin, login } from "~/api/login";
import { User } from "~/api/model/user";
import Counter from "~/components/Counter";

export default function Home() {
  let [user, setUser] = createStore({ username: "", password: "" } as User)
  onMount(() => {
    handleLogin()
  })
  const handleLogin = () => {
    checkLogin().then((res) => {
      if (res) {
        location.href = "/home"
      }
    })
  }
  const UserLogin = () => login(user).then((res) => {
    console.log(res);
    handleLogin()
  })
  return (
    <main class="flex-1 flex items-center justify-center">
      <div class="flex items-center justify-center h-full">
        <div class="card w-96 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title py-2 justify-center pr-2">登陆</h2>
            <div class="flex flex-col">
              <input type="text" class="input w-full mb-4 input-bordered" placeholder="用户名" oninput={(e) => setUser("username", e.currentTarget.value)} required />
              <input type="password" class="input w-full mb-4 input-bordered" placeholder="密码" oninput={(e) => setUser("password", e.currentTarget.value)} required />
              <button class="btn w-full mt-4" onclick={UserLogin}>登录</button>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

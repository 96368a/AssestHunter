import { checkLogin, login } from "~/api/login"
import { User } from "~/api/model/user"

export default function Index() {
  let [user, setUser] = createStore({ username: "", password: "" } as User)
  onMount(() => {
    handleLogin()
  })
  const handleLogin = () => {
    checkLogin().then((res) => {
      if (res) {
        snackbar({
          message: "已登录",
        })
        location.href = "/home"
      }
    })
  }
  const UserLogin = () => login(user).then((res) => {
    console.log(res);
    if (res.code == 200) {
      handleLogin()
      snackbar({
        message: "登录成功",
      })
    } else {
      snackbar({
        message: res.msg || "登录失败",
      })
    }
  })

  return (
    <div>
      <h1 mt-20>登录</h1>
      <mdui-card class="">
        <form onsubmit={(e) => { UserLogin(); e.preventDefault() }}>
          <mdui-text-field class="input-field" label="用户名" type="text" oninput={(e) => setUser("username", (e.currentTarget as HTMLInputElement).value)} required></mdui-text-field>
          <mdui-text-field class="input-field" label="密码" type="password" oninput={(e) => setUser("password", (e.currentTarget as HTMLInputElement).value)} required></mdui-text-field>
          <div py-4>
            <mdui-checkbox>登录状态</mdui-checkbox>
            <mdui-button ml-4 color="primary" type="submit">登录</mdui-button>
          </div>
        </form>
      </mdui-card>
    </div>
  )
}

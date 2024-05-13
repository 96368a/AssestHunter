import { type RouteSectionProps, useNavigate } from "@solidjs/router";
import { For, Show, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { getFofaAssetsApi } from "~/api/asset";
import { checkLogin, logout } from "~/api/login";
import { Base64 } from "js-base64";

export default function UsersLayout(props: RouteSectionProps) {
  const navigater = useNavigate()
  onMount(async () => {
    setIsLoading(true)
    await checkLogin().then((res) => {
      console.log(res);

      if (!res) {
        cleanResults()
        navigater("/")
      }
    })
    const results = localStorage.getItem("results")
    const keyword = localStorage.getItem("keyword")
    if (results && keyword) {
      setAssets(JSON.parse(results))
      setKeyword(keyword)
    }
    setIsLoading(false)
  })

  interface Result {
    host: string
    ip: string
    port: number
    title: string
    header: string
    banner: string
  }

  let [keyword, setKeyword] = createSignal("")
  let [isLoading, setIsLoading] = createSignal(false)
  let [assests, setAssets] = createStore([] as Result[])
  const getAssets = async () => {
    setIsLoading(true)
    if (!keyword()) return
    console.log(keyword());
    let qbase64 = Base64.encode(keyword())
    const res = await getFofaAssetsApi({
      qbase64: qbase64,
      fields: "host,ip,port,title,header,banner",
      size: 10
    })
    if (res.results && res.results.length > 0) {
      let results = res.results.map((item: any) => {
        return {
          host: item[0],
          ip: item[1],
          port: item[2],
          title: item[3],
          header: item[4],
          banner: item[5]
        }
      })
      setAssets(results)
      console.log(results);
      localStorage.setItem("keyword", keyword())
      localStorage.setItem("results", JSON.stringify(results))
    }

    setIsLoading(false)
  }
  const handleKeyword = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      getAssets()
    }
  }
  const handleLogout = () => {
    logout().then((res) => {
      if (res) {
        cleanResults()
        navigater("/")
      }
    })
  }

  const cleanResults = () => {
    localStorage.removeItem("keyword")
    localStorage.removeItem("results")
    setKeyword("")
    setAssets([])
  }

  return (
    <div>
      <mdui-layout>
        <mdui-top-app-bar class="example-top-app-bar">
          <mdui-button-icon icon="menu"></mdui-button-icon>
          <mdui-top-app-bar-title>Title</mdui-top-app-bar-title>
          <div class="ml-4 w-full pr-8">
            <div class="input input-bordered flex items-center max-w-6xl">
              <mdui-dropdown placement="right-start">
                <img src="https://fofa.info/favicon.ico" alt="Fofa" slot="trigger" />
                <mdui-menu>
                  <mdui-menu-item>
                    <img src="https://quake.360.net/quake/static/index/favicon.ico" alt="Quake" class="w-4 h-4" />
                    <span>Quake</span>
                  </mdui-menu-item>
                  <mdui-menu-item>
                    <img src="https://hunter.qianxin.com/geagle/static/favicon.ico" alt="Hunter" class="w-4 h-4" />
                    <span>Hunter</span>
                  </mdui-menu-item>
                </mdui-menu>
              </mdui-dropdown>

              <input class="flex-1 bg-transparent px-4" placeholder="搜索" value={keyword()} oninput={(e) => setKeyword(e.currentTarget.value)} onkeydown={handleKeyword} />
              <button class="i-mdi:search text-2xl text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                onclick={getAssets}></button>
            </div>
          </div>
          <div style="flex-grow: 1"></div>
          <mdui-button-icon icon="more_vert"></mdui-button-icon>
        </mdui-top-app-bar>

        <mdui-navigation-drawer open class="example-navigation-drawer">
          <mdui-list>
            <mdui-list-item>Navigation drawer</mdui-list-item>
          </mdui-list>
        </mdui-navigation-drawer>

        <mdui-layout-main class="example-layout-main" style="min-height: 300px">Main</mdui-layout-main>
      </mdui-layout>
    </div>
  );
}
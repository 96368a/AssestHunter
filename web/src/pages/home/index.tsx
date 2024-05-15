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

  let [keyword, setKeyword] = createSignal('title="测试系统"')
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
        snackbar({
          message: "退出成功",
        })
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
    <div px-4>
      <div class="py-2 w-full flex">
        <div class="flex-1 flex items-center justify-start">
          <mdui-button-icon variant="standard" icon="favorite" mx-8></mdui-button-icon>
          <mdui-text-field max-w-180 variant="outlined" label="请输入搜索语法" value={keyword()} oninput={(e) => setKeyword((e.currentTarget as HTMLInputElement).value)} onkeydown={handleKeyword}>
            <mdui-dropdown placement="right-start" slot="icon">
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
            <mdui-button-icon slot="end-icon" icon="search" onclick={getAssets}></mdui-button-icon>
          </mdui-text-field>
        </div>
        <div class="flex sm-container gap-4 items-center">
          <mdui-button icon="person">管理员</mdui-button>
          <mdui-button icon="exit_to_app" variant="outlined" onclick={handleLogout}>注销登录</mdui-button>
        </div>
      </div>
      <mdui-layout>
        <mdui-navigation-drawer open class="example-navigation-drawer">
          <mdui-list>
            <mdui-list-item>Navigation drawer

              <mdui-text-field label="Text Field">
                <mdui-button-icon slot="icon" icon="search"></mdui-button-icon>
                <mdui-button-icon slot="end-icon" icon="mic"></mdui-button-icon>
              </mdui-text-field>
            </mdui-list-item>
          </mdui-list>
        </mdui-navigation-drawer>
        <mdui-layout-main class="example-layout-main" style="min-height: 300px">

          <div class="flex-1 p-4 gap-6 flex flex-col">
            <Show when={isLoading() && assests.length == 0}>
              <div class="flex flex-col gap-4 w-full px-4">
                <div class="skeleton h-4 w-full"></div>
                <div class="flex gap-4">
                  <div class="skeleton h-40 min-w-sm"></div>
                  <div class="skeleton h-40 w-full"></div>
                </div>
              </div>
            </Show>
            <For each={assests}>{(result, i) =>
              <mdui-card py-2 px-4 text-left>
                <div class="flex justify-between py-2">
                  <span>{result.host}</span>
                  <span><mdui-badge variant="large">{result.port}</mdui-badge></span>
                </div>
                <mdui-divider></mdui-divider>
                <div class="flex py-4 gap-8 h-50">
                  <div class="flex flex-col gap-2 w-60">
                    <span>{result.title}</span>
                    <span>{result.ip}</span>
                    <span>地区、运营商</span>
                    <span>更新时间</span>
                  </div>
                  <div class="flex-1">
                    <mdui-tabs value="tab-1" variant="secondary">
                      <mdui-tab value="tab-1">Header</mdui-tab>
                      <mdui-tab value="tab-2">Other</mdui-tab>
                      {/* <mdui-tab value="tab-3">Tab 3</mdui-tab> */}

                      <mdui-tab-panel slot="panel" value="tab-1">
                        <pre text-xs h-32 overflow-auto bg-mdui-color-suface p-2 class="rounded pb-4">
                          {result.banner || result.header}
                        </pre>
                      </mdui-tab-panel>
                      <mdui-tab-panel slot="panel" value="tab-2">
                      {/* <pre text-xs h-32 overflow-hidden>
                          {result.banner || result.header}
                        </pre> */}
                      </mdui-tab-panel>
                      {/* <mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel> */}
                    </mdui-tabs>
                  </div>
                </div>
              </mdui-card>
            }</For>

          </div>
        </mdui-layout-main>
      </mdui-layout>
    </div>
  );
}
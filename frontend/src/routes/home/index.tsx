import { useLocation, type RouteSectionProps, redirect } from "@solidjs/router";
import { For, Show, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { getFofaAssetsApi } from "~/api/asset";
import { checkLogin } from "~/api/login";
import { Base64 } from "js-base64";

export default function UsersLayout(props: RouteSectionProps) {
  onMount(async () => {
    setIsLoading(true)
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
    if (res.data.results && res.data.results.length > 0) {
      let results = res.data.results.map((item: any) => {
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

  const cleanResults = () => {
    localStorage.removeItem("keyword")
    localStorage.removeItem("results")
    setKeyword("")
    setAssets([])
  }

  return (
    <div>
      <header class="bg-white dark:bg-gray-800 shadow px-10 py-2">
        <div class="flex">
          <div class="flex-1 flex">
            <div class="i-line-md:emoji-smile-wink-twotone text-4xl"></div>
            <div class="ml-4 w-full pr-8">
              <div class="input input-bordered flex items-center max-w-6xl">
                <button class="i-arcticons:fdroid-nethunter text-2xl text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"></button>
                <input class="flex-1 bg-transparent px-4" placeholder="搜索" value={keyword()} oninput={(e) => setKeyword(e.currentTarget.value)} onkeydown={handleKeyword} />
                <button class="i-mdi:search text-2xl text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                  onclick={getAssets}></button>
              </div>
            </div>
          </div>
          <div class="flex sm-container">
            <button class="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none">
              <div class="flex items-center">
                <div class="i-mdi:person"></div>
                <div>管理员</div>
              </div>
            </button>
            <button class="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none ml-4">
              <div class="flex items-center">
                <div class=" i-mdi:exit-to-app"></div>
                <div class="">注销登录</div>
              </div>
            </button>
          </div>
        </div>

      </header>

      <div class="flex">
        <div class="w-80 flex justify-center h-full p-4 flex-none">
          <ul class="menu bg-base-200 w-56 rounded-box">
            <li><a>Item 1</a></li>
            <li>
              <details open>
                <summary>Parent</summary>
                <ul>
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                  <li>
                    <details open>
                      <summary>Parent</summary>
                      <ul>
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
            <li><a>Item 3</a></li>
            <li>
              <button onclick={cleanResults}>清除搜索结果</button>
            </li>
          </ul>
        </div>
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
            <div class="flex flex-col gap-4 ">
              <div class="collapse bg-base-200 shadow">
                <input type="checkbox" checked />
                <div class="collapse-title font-medium">
                  <div class="flex gap-8">
                    <span>{result.host}</span>
                    <span>
                      {result.title}
                    </span>
                  </div>
                </div>
                <div class="collapse-content p-0 pb-0">
                  <div class="divider my-0"></div>
                  <div class="px-4 flex gap-8">
                    <div class="flex flex-col min-w-sm">
                      <div class="line-height-loose">
                        <span>{result.ip}</span>
                        <span class="ml-4">{result.port}</span>
                      </div>
                      <div>地区、运营商</div>
                    </div>
                    <div class="flex-1">
                      <div role="tablist" class="tabs tabs-lifted">
                        <input type="radio" name={"tabs_" + i()} role="tab" class="tab" aria-label={result.banner ? "Banner" : "Header"} checked />
                        <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                          <pre text-xs h-32 overflow-auto>
                            {result.banner || result.header}
                          </pre>
                        </div>

                        <input type="radio" name={"tabs_" + i()} role="tab" class="tab" aria-label="Other" />
                        <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                          <pre h-32 text-sm>
                            ...
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }</For>

        </div>
      </div>
    </div>
  );
}
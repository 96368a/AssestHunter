import { useLocation, type RouteSectionProps, redirect } from "@solidjs/router";
import { For, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { getFofaAssetsApi } from "~/api/asset";
import { checkLogin } from "~/api/login";
import {Base64} from "js-base64";

export default function UsersLayout(props: RouteSectionProps) {
  onMount(() => {
    // checkLogin().then((res) => {
    //   console.log(res);
    //   if (res.data.code && res.data.code != 200) {
    //     location.href = "/"
    //   }
    // })
    const o = [["https://215.25.37.5", "215.25.37.5", "443"], ["199.63.94.76", "199.63.94.76", "80"], ["www.test.xxx.cn", "111.114.25.5", "80"], ["https://wxl.tun.xxx.cn", "58.26.67.47", "443"]]
    setAssets(o)
  })

  let [keyword, setKeyword] = createSignal("")
  let [assests, setAssets] = createStore([] as string[][])
  const getAssets = () => {
    if (!keyword()) return
    console.log(keyword());
    let qbase64 = Base64.encode(keyword())
    getFofaAssetsApi({
      qbase64: qbase64,
      fields: "host,ip,port,header,title"
    }).then((res) => {
      setAssets(res.data.results)
      console.log(assests);
    })
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
                <input class="flex-1 bg-transparent px-4" placeholder="搜索" oninput={(e) => setKeyword(e.currentTarget.value)} />
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

      <div class="flex items-center justify-center">
        <div class="w-80 bg-red-100">
          <ul>
            <li>a</li>
          </ul>
        </div>
        <div class="flex-1">
          <For each={assests}>{(asset, i) =>
            <div class="flex flex-col gap-4 p-4 ">
              <div class="collapse bg-base-200 shadow">
                <input type="checkbox" checked />
                <div class="collapse-title font-medium">
                  <div class="flex gap-8">
                    <span>{asset[0]}</span>
                    <span>
                      {asset[4]}
                    </span>
                  </div>
                </div>
                <div class="collapse-content p-0 pb-0">
                  <div class="divider my-0"></div>
                  <div class="px-4 flex gap-8">
                    <div class="flex flex-col min-w-sm">
                      <div>{asset[1]}</div>
                      <div>地区、运营商</div>
                    </div>
                    <div class="flex-1">
                      <div role="tablist" class="tabs tabs-lifted">
                        <input type="radio" name={"tabs_" + i()} role="tab" class="tab" aria-label="Banner" checked />
                        <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                          <pre text-xs h-32 overflow-auto>
                            {asset[3]}
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
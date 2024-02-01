import { useLocation, type RouteSectionProps, redirect } from "@solidjs/router";
import { For, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { getFofaAssetsApi } from "~/api/asset";
import { checkLogin } from "~/api/login";

export default function UsersLayout(props: RouteSectionProps) {
  onMount(() => {
    // checkLogin().then((res) => {
    //   console.log(res);
    //   if (res.data.code && res.data.code != 200) {
    //     location.href = "/"
    //   }
    // })

  })

  let [assests, setAssets] = createStore([] as [][])
  const getAssets = () => {
    getFofaAssetsApi({
      qbase64: "111"
    }).then((res) => {
      setAssets(res.data.results)
      console.log(assests);
    })
  }

  const testHeader = `HTTP/1.1 200
Connection: close
Content-Length: 309
Content-Type: text/html;charset=UTF-8
Date: Thu, 01 Feb 2024 02:05:18 GMT
Set-Cookie: JSESSIONID=080165579A2BD1888A2D05C3F1BC2453; Path=/; HttpOnly
X-Content-Type-Options: nosniff
X-Frame-Options: ALLOW-FROM null
X-Protected-By: RASP
X-Request-Id: 04ae779406a84046837660cb4250e03c
X-Xss-Protection: 1; mode=block`
  return (
    <div>
      <header class="bg-white dark:bg-gray-800 shadow px-10 py-2">
        <div class="flex">
          <div class="flex-1 flex items-center container">
            <div class="i-line-md:emoji-smile-wink-twotone text-4xl"></div>
            <div class="ml-4 w-full pr-8">
              <div class="input input-bordered flex items-center max-w-6xl">
                <button class="i-arcticons:fdroid-nethunter text-2xl text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"></button>
                <input class="flex-1 bg-transparent px-4" placeholder="搜索" />
                <button class="i-mdi:search text-2xl text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                  onclick={getAssets}></button>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-end">
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
          <div class="flex flex-col gap-4 p-4">
          <div class="collapse bg-base-200">
            <input type="checkbox" checked />
            <div class="collapse-title font-medium">
              <div class="flex gap-8">
                <span>{asset[0]}</span>
                <span>
                  电子文档安全管理系统
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
                    <a role="tab" class="tab tab-active">Header</a>
                    <a role="tab" class="tab">Tab 2</a>
                  </div>
                  <div class="h-36 overflow-y-auto scroll-smooth px-1">
                    <span class="whitespace-pre-wrap text-sm">{
                      testHeader
                    }
                    </span>
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
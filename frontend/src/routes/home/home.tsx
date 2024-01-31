export default function Home() {
    return (
        <div class="flex justify-center">
            <div class="bg-blue-100 p-2 h-full">
                <ul class="menu bg-base-200 w-56 rounded-box">
                    <li>
                        <details id="disclosure-docs">
                            <summary class="group">
                                <span>
                                    <svg width="18" height="18" viewBox="0 0 48 48" class="text-orange-400 h-5 w-5" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 7H16C20.4183 7 24 10.5817 24 15V42C24 38.6863 21.3137 36 18 36H5V7Z" fill="none"
                                            stroke="currentColor" stroke-width="4" stroke-linejoin="bevel"></path>
                                        <path d="M43 7H32C27.5817 7 24 10.5817 24 15V42C24 38.6863 26.6863 36 30 36H43V7Z" fill="none"
                                            stroke="currentColor" stroke-width="4" stroke-linejoin="bevel"></path>
                                    </svg></span> 文档
                            </summary>
                            <ul>
                                <li> <a href="/docs/install/" class="group   "> <span>安装 </span> </a></li>
                                <li> <a href="/docs/use/" class="group   "> <span>使用 </span> </a></li>
                                <li> <a href="/docs/customize/" class="group   "> <span>自定义组件 </span> </a></li>
                                <li> <a href="/docs/config/" class="group   "> <span>全局配置 </span> <span
                                    class="badge badge-sm font-mono undefined">更新 </span> </a></li>
                                <li> <a href="/docs/colors/" class="group   "> <span>颜色 </span> <span
                                    class="badge badge-sm font-mono undefined">更新 </span> </a></li>
                                <li> <a href="/docs/themes/" class="group active  active"> <span>主题 </span> <span
                                    class="badge badge-sm font-mono undefined">更新 </span> </a></li>
                                <li> <a href="/docs/utilities/" class="group   "> <span>工具类 </span> <span
                                    class="badge badge-sm font-mono undefined">新增 </span> </a></li>
                                <li> <a href="/docs/layout-and-typography/" class="group   ">
                                    <span>布局 &amp; 排版 </span> </a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 2</a></li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <div class="flex-1 bg-gray-50">
                <h2>content</h2>
            </div>
        </div>
    );
}
export default function () {
    return (
        <div class="h-screen flex items-center justify-center bg-base-200">
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title py-2 justify-center pr-2">登陆</h2>
                    <form class="flex flex-col">
                        <input type="text" class="input w-full mb-4 input-bordered" placeholder="用户名" required />
                        <input type="password" class="input w-full mb-4 input-bordered" placeholder="密码" required />
                        <button type="submit" class="btn w-full mt-4">登录</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
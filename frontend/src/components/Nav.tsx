import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (
    <nav class="bg-sky-800 dark:bg-gray-700">
      <ul class="container flex items-center p-3 text-gray-200 dark:text-gray-400">
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <a href="/">Home</a>
        </li>
        <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
          <a href="/about">About</a>
        </li>
        <li class={`border-b-2 ${active("/home")} mx-1.5 sm:mx-6`}>
          <a href="/home">Home</a>
        </li>
      </ul>
    </nav>
  );
}

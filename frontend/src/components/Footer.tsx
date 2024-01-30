import { useDark } from "~/primitives"


export default function Footer() {
  // const [isDark, toggleDark ] = createSignal(false)
  const { isDark, toggleDark } = useDark()
  // const isDark = useDark()
// const [value, toggleDark] = useToggle(isDark)
  return (
    <div class="text-center mx-auto text-gray-700 p-4 w-full">
    <nav class="text-xl mt-6 inline-flex gap-2">
      <button class="icon-btn !outline-none" onClick={() => toggleDark()}>
        {isDark() ? <div class=" icon-btn i-carbon-moon" /> : <div class="icon-btn i-carbon-sun" />}
      </button>

      <a
        class="icon-btn i-carbon-logo-github"
        rel="noreferrer"
        href="https://github.com/96368a/vitesse-lite-solidjs"
        target="_blank"
        title="GitHub"
      />
    </nav>
    </div>

  )
}

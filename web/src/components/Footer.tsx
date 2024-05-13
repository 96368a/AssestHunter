export default function Footer() {
  const { isDark, toggleDark } = useDark()
  return (
    <nav class="text-xl mt-6 inline-flex gap-2">
      <div class="icon-btn !outline-none bg-inherit border-transparent" onClick={() => toggleDark()}>
        {isDark() ? <div class=" icon-btn i-carbon-moon" /> : <div class="icon-btn i-carbon-sun" />}
      </div>

      <a
        class="icon-btn i-carbon-logo-github"
        rel="noreferrer"
        href="https://github.com/nanakura/vitesse-lite-solidjs"
        target="_blank"
        title="GitHub"
      />
    </nav>

  )
}

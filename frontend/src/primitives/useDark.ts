import { useColorMode } from "solidjs-use"


export default function useDark() {
  const {mode, setMode} = useColorMode({
    attribute: 'data-theme',
  })
  const toggleDark = () => setMode(mode() === 'dark' ? 'light' : 'dark')
  const isDark = createMemo(() => mode() === 'dark')
  createEffect(() => document.documentElement.classList.toggle('dark', isDark()))
  return {
    isDark,
    toggleDark,
  }
}

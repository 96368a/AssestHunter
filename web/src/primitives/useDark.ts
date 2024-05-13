import { usePrefersDark } from '@solid-primitives/media'
import { makePersisted } from '@solid-primitives/storage'

export default function useDark() {
  const prefersDark = usePrefersDark()

  const [value, setValue] = makePersisted(createSignal<string>('auto'), {
    storage: localStorage,
    name: 'dark-mode',
  })
  const isDark = createMemo(() => value() === 'auto' ? prefersDark() : value() === 'dark')

  createEffect(() => {
    document.documentElement.classList.toggle('dark', isDark())
    document.documentElement.classList.toggle('mdui-theme-dark', isDark())
  })
  const toggleDark = () => setValue(isDark() ? 'light' : 'dark')

  return {
    isDark,
    toggleDark,
  }
}

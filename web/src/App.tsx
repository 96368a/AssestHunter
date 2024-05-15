import { Router } from '@solidjs/router'
import Footer from './components/Footer'
import routes from '~solid-pages'

export default function App() {
  return (
    <main class="font-sans text-center h-screen">
      <Router>
        {routes}
      </Router>
      <Footer />
    </main>
  )
}

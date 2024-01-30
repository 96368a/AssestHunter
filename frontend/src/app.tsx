import "@unocss/reset/tailwind.css";
import "uno.css";

// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { Suspense } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";
import Nav from "~/components/Nav";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <div class="dark:text-white dark:bg-hex-121212 h-screen">
            <Nav />
            <Suspense>{props.children}</Suspense>
            <Footer></Footer>
          </div>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

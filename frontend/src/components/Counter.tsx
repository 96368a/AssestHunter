import { createSignal } from "solid-js";

export default function Counter({ initial = 0 }) {
  const [count, setCount] = createSignal(initial);
  return (
    <button
      class="btn"
      onClick={() => setCount(count() + 1)}
    >
      Clicks: {count()}
    </button>
  );
}

import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { add } from "@kingsword/add";
import { ping } from "@kingsword/tauri-plugin-ping-api";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [left, setLeft] = useState(1);
  const [right, setRight] = useState(1);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  useEffect(() => {
    const asyncPing = async () => {
      await ping("test");
    };
    asyncPing();
  }, []);

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <div className="input-add">
        <input
          className="input-number"
          type="number"
          value={left}
          onChange={(e) => setLeft(parseInt(e.currentTarget.value))}
        />
        +
        <input
          className="input-number"
          type="number"
          value={right}
          onChange={(e) => setRight(parseInt(e.currentTarget.value))}
        />
        = {add(left, right)}
      </div>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;

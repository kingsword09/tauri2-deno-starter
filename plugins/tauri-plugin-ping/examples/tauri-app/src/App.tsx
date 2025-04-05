import { useState } from "react";
import { ping } from "@kingsword/tauri-plugin-ping-api";
import "./App.css";

function App() {
  const [response, setResponse] = useState("");
  console.log(response)

  function updateResponse(returnValue: unknown) {
    setResponse(
      response +
        `[${new Date().toLocaleTimeString()}] ` +
        (typeof returnValue === "string"
          ? returnValue
          : JSON.stringify(returnValue)) +
        "<br>"
    );
  }

  function _ping() {
    ping("Pong!").then(updateResponse).catch(updateResponse);
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <button type="button" onClick={_ping}></button>
      <div dangerouslySetInnerHTML={{ __html: response }} />
    </main>
  );
}

export default App;

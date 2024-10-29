import React from "react";
import AppRouter from "./routes/AppRouter";
import { DynamicProvider } from "./app/context/DynamicContext";
function App() {
  return (
    <DynamicProvider>
      <AppRouter />
    </DynamicProvider>
  )
}

export default App;

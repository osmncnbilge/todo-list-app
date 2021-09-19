import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import TodoScreen from "./components/TodoScreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact={true} component={TodoScreen} />
      </BrowserRouter>
    </>
  );
}

export default App;

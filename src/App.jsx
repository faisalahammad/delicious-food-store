import React from "react";
import "./App.css";
import Categories from "./components/Categories";
import Search from "./components/Search";
import Pages from "./pages/Pages";

function App() {
  return (
    <div className="App">
      <Search />
      <Categories />
      <Pages />
    </div>
  );
}

export default App;

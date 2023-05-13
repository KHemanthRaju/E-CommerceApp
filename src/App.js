import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Routes>
        <Route path="/" />
        <Route path="/products" />
      </Routes>
    </div>
  );
}

export default App;

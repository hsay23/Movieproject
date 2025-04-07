import { Routes, Route } from "react-router-dom";
import "./App.css";
import Create from "./assets/Components/Create";
import Read from "./assets/Components/Read";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Read />}></Route>
        <Route exact path="/create" element={<Create />}></Route>
      </Routes>
    </>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Header2 from "./components/Header2";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar />}></Route>
        <Route path="/header" element={<Header />}></Route>
        <Route path="/header2" element={<Header2 />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

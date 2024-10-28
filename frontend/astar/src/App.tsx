import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Calendar" element={<Calendar />} />
      </Routes>
      
    </Router>
  );
}

export default App;

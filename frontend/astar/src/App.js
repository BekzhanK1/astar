import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/Login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/Calendar", element: _jsx(Calendar, {}) })] }) }));
}
export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/userRegistration.jsx";
import Dashboard from "./components/Dashboard.jsx";
import EmployeRegistraion from "./components/EmployeRegistraion.jsx";
import "./App.css";
import Login from "./components/Login.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/govempreg" element={<EmployeRegistraion />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  );
}

export default App;

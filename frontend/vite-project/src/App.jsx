import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./components/userRegistration";
import EmployeRegistraion from "./components/EmployeRegistraion";
import Login from "./components/Login";
import Home from "./components";
function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />}/>
      <Route path="/register" element={<Register />} />
      <Route path="/govempreg" element={<EmployeRegistraion />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
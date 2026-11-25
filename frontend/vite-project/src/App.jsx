import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./components/userRegistration";
import EmployeRegistraion from "./components/EmployeRegistraion";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components";
import Userhome from './pages/user/Userhome'
import EmployeeHome from './pages/employee/Employeehome'
import AdminHome from './pages/admin/Adminhome'
import ReportIssue from "./pages/user/ReportIssue";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/report-issue" element={<ReportIssue />} />
      <Route path="/user/home"  element={
        <ProtectedRoute allowedRoles={["USER"]}>
            <Userhome />
        </ProtectedRoute>
    }/>
      <Route path="/employee/home"   element={
        <ProtectedRoute allowedRoles={["GOVERNMENT_EMPLOYEE"]}>
            <EmployeeHome />
        </ProtectedRoute>
    }/>
      <Route path="/admin/home"  element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminHome />
        </ProtectedRoute>
    }/>
      <Route path="/" element={<Home />}/>
      <Route path="/register" element={<Register />} />
      <Route path="/govempreg" element={<EmployeRegistraion />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/login/login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ConfirmProvider } from "material-ui-confirm";
import "./App.css";

function App() {
  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact element={<ProtectedRoutes />}>
          <Route exact path="/dashboard/*" element={<ConfirmProvider><Dashboard /></ConfirmProvider>} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;

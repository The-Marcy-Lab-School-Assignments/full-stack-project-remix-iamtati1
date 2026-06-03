import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./components/layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import AI from "./pages/AI";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
           PUBLIC ROUTES
        ===================================================== */}
        <Route path="/auth" element={<Auth />} />

        {/* redirect root → dashboard OR auth handled by ProtectedRoute */}
        <Route path="/" element={<Navigate to="/tasks" replace />} />

        {/* =====================================================
           PROTECTED APP SHELL
        ===================================================== */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* =====================================================
           FALLBACK ROUTE
        ===================================================== */}
        <Route path="*" element={<Navigate to="/auth" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
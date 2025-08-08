import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import RouteGuard from "./components/RouteGuard";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <Routes>
      <Route
        element={
          <RouteGuard>
            <Layout />
          </RouteGuard>
        }
      >
        <Route index element={<HomePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
      </Route>
    </Routes>
  );
}

export default App;

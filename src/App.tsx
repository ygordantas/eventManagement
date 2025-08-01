import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import HomePage from "./pages/HomePage/HomePage";
import RouteGuard from "./components/RouteGuard";

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <RouteGuard>
            <HomePage />
          </RouteGuard>
        }
      />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
      </Route>
    </Routes>
  );
}

export default App;

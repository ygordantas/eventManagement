import { Route, Routes } from "react-router";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
      </Route>
    </Routes>
  );
}

export default App;

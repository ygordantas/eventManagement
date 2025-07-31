import { Route, Routes } from "react-router";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import RouteGuard from "./components/RouteGuard";
import useAuthContext from "./hooks/useAuthContext";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

function App() {
  const { loggedUser } = useAuthContext();

  return (
    <Routes>
      <Route
        index
        element={
          <RouteGuard loggedUser={loggedUser}>
            <HomePage />
          </RouteGuard>
        }
      />
      <Route element={<AuthLayout />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegistrationPage />} />
      </Route>
    </Routes>
  );
}

export default App;

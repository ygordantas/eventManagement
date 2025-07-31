import { Route, Routes, useNavigate } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import HomePage from "./pages/HomePage/HomePage";
import RouteGuard from "./components/RouteGuard";
import type LoggedUser from "./models/LoggedUser";
import { LoggedUserContext } from "./contexts/LoggedUserContext";
import { useContext } from "react";

function App() {
  const navigate = useNavigate();
  const userContext = useContext(LoggedUserContext);

  const onLoginHandler = (email: string, password: string) => {
    const response = localStorage.getItem(email);

    if (!response) {
      alert("User not found");
    }

    const user: LoggedUser = JSON.parse(response!);

    if (user.password !== password) {
      alert("Incorrect password.");
      return;
    }

    userContext?.setLoggedUser(user);

    navigate("/");
  };

  return (
    <Routes>
      <Route
        index
        element={
          <RouteGuard loggedUser={loggedUser}>
            <HomePage loggedUser={loggedUser!} />
          </RouteGuard>
        }
      />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage onLogin={onLoginHandler} />} />
        <Route path="register" element={<RegistrationPage />} />
      </Route>
    </Routes>
  );
}

export default App;

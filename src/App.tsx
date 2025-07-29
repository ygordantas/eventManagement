import { Route, Routes, useNavigate } from "react-router";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import HomePage from "./pages/HomePage/HomePage";
import { useState } from "react";
import type LoggedUser from "./models/LoggedUser";
import ProtectedRoute from "./navigation/ProtectedRoute";

function App() {
  const navigate = useNavigate();

  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);

  const onLoginHandler = (email: string, passwordInput: string) => {
    const response = localStorage.getItem(email);

    if (!response) {
      return alert("User not found");
    }

    const user: LoggedUser = JSON.parse(response);

    const { password, ...remainingUserProps } = user;

    if (password !== passwordInput) {
      return alert("Wrong password");
    }

    setLoggedUser(remainingUserProps);
    navigate("/");
  };

  const onRegisterUserHandler = (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date
  ) => {
    if (localStorage.getItem(email)) {
      return alert("User with the provided email already exists.");
    }

    const newUser = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
    };

    setLoggedUser(newUser);

    localStorage.setItem(email, JSON.stringify(newUser));
  };

  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute loggedUser={loggedUser}>
            <HomePage loggedUser={loggedUser!} />
          </ProtectedRoute>
        }
      />

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage onLogin={onLoginHandler} />} />
        <Route
          path="register"
          element={<RegistrationPage onRegisterUser={onRegisterUserHandler} />}
        />
      </Route>
    </Routes>
  );
}

export default App;

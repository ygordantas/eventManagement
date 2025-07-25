import { useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

type Pages = "login" | "register";

function App() {
  const [currentPage, setCurrentPage] = useState<Pages>("login");

  return (
    <div>
      {currentPage === "login" ? (
        <LoginPage onRegisterClick={() => setCurrentPage("register")} />
      ) : (
        <RegistrationPage
          onLoginClick={() => {
            setCurrentPage("login");
          }}
        />
      )}
    </div>
  );
}

export default App;

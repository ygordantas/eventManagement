import { Link } from "react-router";
import Button from "../../components/Button/Button";
import useAuthContext from "../../hooks/useAuthContext";

export default function HomePage() {
  const { user, logout } = useAuthContext();

  return (
    <div>
      Hello {user!.firstName} {user!.lastName}
      <Button as={Link} to="/login" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

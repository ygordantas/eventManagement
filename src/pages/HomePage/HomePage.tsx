import useAuthContext from "../../hooks/useAuthContext";

export default function HomePage() {
  const { user } = useAuthContext();

  return (
    <div>
      Hello {user!.firstName} {user!.lastName}
    </div>
  );
}

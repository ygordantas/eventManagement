import useAuthContext from "../../hooks/useAuthContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomePage() {
  const { loggedUser } = useAuthContext();
  return (
    <div>
      Hello {loggedUser!.firstName} {loggedUser!.lastName}
    </div>
  );
}

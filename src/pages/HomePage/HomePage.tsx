import Button from "../../components/Button/Button";
import useAuthContext from "../../hooks/useAuthContext";
import eventsServices from "../../services/eventsServices";

export default function HomePage() {
  const { user } = useAuthContext();

  return (
    <div>
      Hello {null!.firstName} {user!.lastName}
      <Button
        onClick={async () => {
          const response = await eventsServices.customQuery();
          console.log(response);
        }}
      >
        Get events
      </Button>
    </div>
  );
}

import { Link } from "react-router";
import Button from "../../components/Button/Button";
import eventServices from "../../services/eventServices";
import useAuthContext from "../../hooks/useAuthContext";

export default function MyEventsPage() {
  const { user } = useAuthContext();
  const myEvents = eventServices.getUserEvents(user!.id);

  return (
    <div>
      MyEventsPage
      <Button as={Link} to="/my-events/manage">
        Create new event
      </Button>
      {myEvents.length > 0 ? (
        <ul>
          {myEvents.map((e) => (
            <li key={e.id}>
              <h3>{e.name}</h3>
              <code>{JSON.stringify(e)}</code>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't created any events yet</p>
      )}
    </div>
  );
}

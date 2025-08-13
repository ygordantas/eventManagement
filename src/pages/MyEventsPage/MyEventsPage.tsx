import { Link } from "react-router";
import Button from "../../components/Button/Button";
import EVENTS from "../../data/events";

export default function MyEventsPage() {
  return (
    <div>
      MyEventsPage
      <Button as={Link} to="/my-events/manage">
        Create new event
      </Button>
      <ul>
        {EVENTS.map((e) => (
          <li key={e.id}>
            <h3>{e.name}</h3>
            <code>{JSON.stringify(e)}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}

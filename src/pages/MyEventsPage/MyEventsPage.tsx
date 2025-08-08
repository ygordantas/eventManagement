import { Link } from "react-router";
import Button from "../../components/Button/Button";

export default function MyEventsPage() {
  return (
    <div>
      MyEventsPage
      <Button as={Link} to="/my-events/manage">
        Create new event
      </Button>
    </div>
  );
}

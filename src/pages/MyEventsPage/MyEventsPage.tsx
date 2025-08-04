import { Link } from "react-router";
import Button from "../../components/Button/Button";

export default function MyEventsPage() {
  return (
    <div>
      My Events Page
      <Button as={Link} to='/my-events/manage/'>
        Create Event
      </Button>
    </div>
  );
}

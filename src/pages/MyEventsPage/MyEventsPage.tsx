import { useEffect, useState } from "react";
import { Link } from "react-router";
import Button from "../../components/Button/Button";
import EventCard from "../../components/EventCard/EventCard";
import EventGrid from "../../components/EventGrid/EventGrid";
import useAlertContext from "../../hooks/useAlertContext";
import useAuthContext from "../../hooks/useAuthContext";
import type EventModel from "../../models/EventModel";
import eventsServices from "../../services/eventsServices";
import classes from "./MyEventsPage.module.css";

export default function MyEventsPage() {
  const { user } = useAuthContext();
  const { showErrorAlert } = useAlertContext();
  const [myEvents, setMyEvents] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMyEvents = async () => {
      try {
        const events = await eventsServices.getUserEvents(user!.id);

        setMyEvents(events.sort((a, b) => new Date(a.date).getMilliseconds() - new Date(b.date).getMilliseconds()));
      } catch (error) {
        showErrorAlert(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMyEvents();
  }, [showErrorAlert, user]);

  const onDeleteEventHandler = async (eventId: string): Promise<void> => {
    try {
      setIsLoading(true);
      await eventsServices.deleteEvent(eventId);
      setMyEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch (error) {
      showErrorAlert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 className={classes.title}>My Events</h1>
        <Button as={Link} to='/my-events/manage'>
          Create new event
        </Button>
      </div>

      <EventGrid>
        {myEvents.map((e) => (
          <EventCard
            key={e.id}
            event={e}
            footer={
              <>
                <Button as={Link} to={`/my-events/manage/${e.id}`}>
                  Edit
                </Button>
                <Button onClick={() => onDeleteEventHandler(e.id)}>Remove</Button>
              </>
            }
          />
        ))}
      </EventGrid>
    </div>
  );
}

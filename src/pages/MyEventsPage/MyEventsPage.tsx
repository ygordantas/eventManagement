import eventsServices from "../../services/eventsServices";
import useAuthContext from "../../hooks/useAuthContext";
import Button from "../../components/Button/Button";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import type EventModel from "../../models/EventModel";
import useAlertContext from "../../hooks/useAlertContext";
import EventGrid from "../../components/EventGrid/EventGrid";
import EventCard from "../../components/EventCard/EventCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import { getEndOfTheDay } from "../../utils/dateUtils";
import attendanceServices from "../../services/attendanceServices";

const END_OF_THE_DAY = getEndOfTheDay();

export default function MyEventsPage() {
  const { user } = useAuthContext();
  const { showErrorAlert } = useAlertContext();
  const [myEvents, setMyEvents] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMyEvents = async () => {
      try {
        const events = await eventsServices.getUserEvents(user!.id);
        setMyEvents(
          events.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        );
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
      await attendanceServices.deleteEvent(eventId);
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
    <>
      <PageHeader title="My Events">
        <Button as={Link} to="/my-events/manage">
          Create new event
        </Button>
      </PageHeader>
      <EventGrid>
        {myEvents.map((e) => (
          <EventCard
            key={e.id}
            event={e}
            footer={
              e.date > END_OF_THE_DAY && (
                <>
                  <Button as={Link} to={`/my-events/manage/${e.id}`}>
                    Edit
                  </Button>
                  <Button onClick={() => onDeleteEventHandler(e.id)}>
                    Remove
                  </Button>
                </>
              )
            }
          />
        ))}
      </EventGrid>
    </>
  );
}

import { useEffect, useState } from "react";
import type EventModel from "../../models/EventModel";
import eventServices from "../../services/eventServices";
import useAlertContext from "../../hooks/useAlertContext";

export default function EventsPage() {
  const { showErrorAlert } = useAlertContext();
  const [upcomingEvents, setUpcomingEvents] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUpcomingEvents = async () => {
      try {
        const events = await eventServices.getAllEvents();
        setUpcomingEvents(
          events.sort(
            (a, b) =>
              new Date(a.date).getMilliseconds() -
              new Date(b.date).getMilliseconds()
          )
        );
      } catch (error) {
        showErrorAlert(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUpcomingEvents();
  }, [showErrorAlert]);

  return isLoading ? (
    "Loading..."
  ) : (
    <div>
      EventsPage
      {upcomingEvents.length > 0 ? (
        <ul>
          {upcomingEvents.map((e) => (
            <li key={e.id}>
              {e.name} <strong>{e.date}</strong>
            </li>
          ))}
        </ul>
      ) : (
        "No upcoming events... "
      )}
    </div>
  );
}

import { useEffect, useState, useMemo } from "react";
import type EventModel from "../../models/EventModel";
import eventsServices from "../../services/eventsServices";
import useAlertContext from "../../hooks/useAlertContext";
import EventGrid from "../../components/EventGrid/EventGrid";
import EventCard from "../../components/EventCard/EventCard";
import Button from "../../components/Button/Button";
import Select from "../../components/Select/Select";
import type Option from "../../models/Option";
import PageHeader from "../../components/PageHeader/PageHeader";
import EmptyState from "../../components/EmptyState/EmptyState";

type FilterType = "all" | "today" | "upcoming" | "past";

export default function EventsPage() {
  const { showErrorAlert } = useAlertContext();
  const [events, setEvents] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("upcoming");

  const filterOptions: Option[] = [
    { code: "upcoming", value: "Upcoming Events" },
    { code: "today", value: "Today's Events" },
    { code: "all", value: "All Events" },
    { code: "past", value: "Past Events" },
  ];

  useEffect(() => {
    const getEvents = async () => {
      try {
        const eventsData = await eventsServices.getAllEvents();
        setEvents(eventsData);
      } catch (error) {
        showErrorAlert(error);
      } finally {
        setIsLoading(false);
      }
    };

    getEvents();
  }, [showErrorAlert]);

  const filteredAndSortedEvents = useMemo(() => {
    let filteredEvents = events;

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000 - 1); // End of today

    // Apply filters based on selection
    switch (filter) {
      case "today":
        filteredEvents = events.filter((event) => {
          const eventDateTime = new Date(`${event.date} ${event.time}`);
          return eventDateTime >= todayStart && eventDateTime <= todayEnd;
        });
        break;
      case "upcoming":
        filteredEvents = events.filter((event) => {
          const eventDateTime = new Date(`${event.date} ${event.time}`);
          return eventDateTime > now;
        });
        break;
      case "past":
        filteredEvents = events.filter((event) => {
          const eventDateTime = new Date(`${event.date} ${event.time}`);
          return eventDateTime < todayStart;
        });
        break;
      case "all":
      default:
        // Show all events (no filtering)
        break;
    }

    // Sort by date (earliest first)
    return filteredEvents.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  }, [events, filter]);

  const handleAttend = (eventId: string) => {
    // TODO: Implement attend functionality
    console.log("Attending event:", eventId);
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <PageHeader title='Events'>
        <Select
          label='Filter Events'
          options={filterOptions}
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterType)}
        />
      </PageHeader>

      {filteredAndSortedEvents.length > 0 ? (
        <EventGrid>
          {filteredAndSortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              footer={<Button onClick={() => handleAttend(event.id)}>Attend</Button>}
            />
          ))}
        </EventGrid>
      ) : (
        <EmptyState
          message={
            filter === "today"
              ? "No events today..."
              : filter === "upcoming"
              ? "No upcoming events..."
              : filter === "past"
              ? "No past events..."
              : "No events found..."
          }
        />
      )}
    </>
  );
}

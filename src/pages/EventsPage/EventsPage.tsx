import { useEffect, useState } from "react";
import type EventModel from "../../models/EventModel";
import eventsServices from "../../services/eventsServices";
import useAlertContext from "../../hooks/useAlertContext";
import PageHeader from "../../components/PageHeader/PageHeader";
import EventGrid from "../../components/EventGrid/EventGrid";
import EventCard from "../../components/EventCard/EventCard";
import Button from "../../components/Button/Button";
import Select from "../../components/Select/Select";
import type { DateFilterType } from "../../constants/dateFiltersTypes";
import DATE_FILTER_TYPES from "../../constants/dateFiltersTypes";

export default function EventsPage() {
  const { showErrorAlert } = useAlertContext();

  const [allEvents, setAllEvents] = useState<EventModel[]>([]);
  const [filter, setFilter] = useState<DateFilterType | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllEvents = async () => {
      setIsLoading(true);
      try {
        const events = await eventsServices.getEvents(filter);
        setAllEvents(events);
      } catch (error) {
        showErrorAlert(error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllEvents();
  }, [filter, showErrorAlert]);

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <PageHeader title="Events">
        <Select
          label={"Filter by date"}
          onChange={(e) =>
            setFilter(
              e.target.value ? (e.target.value as DateFilterType) : undefined
            )
          }
          options={Object.values(DATE_FILTER_TYPES).map((v) => ({
            code: v,
            value: v,
          }))}
        />
      </PageHeader>
      <EventGrid>
        {allEvents.map((e) => (
          <EventCard
            key={e.id}
            event={e}
            footer={<Button>Attend Event</Button>}
          />
        ))}
      </EventGrid>
    </>
  );
}

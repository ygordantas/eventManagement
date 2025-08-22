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
import { getDateOnlyString } from "../../utils/dateUtils";

export default function EventsPage() {
  const { showErrorAlert } = useAlertContext();

  const [allEvents, setAllEvents] = useState<EventModel[]>([]);
  const [filter, setFilter] = useState<DateFilterType | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const events = await eventsServices.getAllEvents();
        setAllEvents(events);
      } catch (error) {
        showErrorAlert(error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllEvents();
  }, [showErrorAlert]);

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
        {allEvents
          .filter((e) => {
            if (filter === DATE_FILTER_TYPES.all) return true;

            const todayUTC = new Date(new Date().getTime());
            todayUTC.setHours(0);
            todayUTC.setMinutes(0);
            todayUTC.setSeconds(0);
            todayUTC.setMilliseconds(0);

            const [year, month, day] = e.date.split("-").map(Number);
            const eventDate = new Date(year, month - 1, day);

            switch (filter) {
              case DATE_FILTER_TYPES.now:
                return (
                  getDateOnlyString(eventDate) === getDateOnlyString(todayUTC)
                );
              case DATE_FILTER_TYPES.past:
                return eventDate < todayUTC;
              case DATE_FILTER_TYPES.upcoming:
                return eventDate > todayUTC;
              default:
                return eventDate >= todayUTC;
            }
          })
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .map((e) => (
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

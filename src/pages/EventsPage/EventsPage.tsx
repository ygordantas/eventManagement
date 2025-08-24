import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import EventCard from "../../components/EventCard/EventCard";
import EventGrid from "../../components/EventGrid/EventGrid";
import PageHeader from "../../components/PageHeader/PageHeader";
import Select from "../../components/Select/Select";
import type { DateFilterType } from "../../constants/dateFiltersTypes";
import DATE_FILTER_TYPES from "../../constants/dateFiltersTypes";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import type EventModel from "../../models/EventModel";
import eventsServices from "../../services/eventsServices";
import classes from "./EventsPage.module.css";

export default function EventsPage() {
  const [filter, setFilter] = useState<DateFilterType | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const { records: allEvents, isLoadingMore, hasMore, loadRecords, clear } = useInfinityScroll<EventModel>();

  const loadEvents = useCallback(
    (lastDoc?: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      return eventsServices.getEvents(filter, lastDoc);
    },
    [filter]
  );

  const handleLoadMoreEvents = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      loadRecords(loadEvents);
    }
  }, [isLoadingMore, hasMore, loadRecords, loadEvents]);

  useEffect(() => {
    const loadInitialData = async () => {
      clear(); // Clear previous records when filter changes
      setIsLoading(true);
      try {
        await loadRecords(loadEvents);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [filter, clear, loadRecords, loadEvents]);

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <PageHeader title='Events'>
        <Select
          className={classes.select_container}
          label={"Filter Events"}
          onChange={(e) => setFilter(e.target.value ? (e.target.value as DateFilterType) : undefined)}
          options={Object.values(DATE_FILTER_TYPES).map((v) => ({
            code: v,
            value: v,
          }))}
        />
      </PageHeader>
      <EventGrid onLoadMore={handleLoadMoreEvents} hasMore={hasMore} isLoading={isLoadingMore}>
        {allEvents.map((e) => (
          <EventCard key={e.id} event={e} footer={<Button>Attend Event</Button>} />
        ))}
      </EventGrid>
    </>
  );
}

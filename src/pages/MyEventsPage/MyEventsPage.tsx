import eventsServices from "../../services/eventsServices";
import useAuthContext from "../../hooks/useAuthContext";
import Button from "../../components/Button/Button";
import { Link } from "react-router";
import { useEffect, useState, useCallback } from "react";
import type EventModel from "../../models/EventModel";
import useAlertContext from "../../hooks/useAlertContext";
import EventGrid from "../../components/EventGrid/EventGrid";
import EventCard from "../../components/EventCard/EventCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import useInfinityScroll from "../../hooks/useInfinityScroll";

export default function MyEventsPage() {
  const { user } = useAuthContext();
  const { showErrorAlert } = useAlertContext();
  const [isLoading, setIsLoading] = useState(true);

  const { records: myEvents, isLoadingMore, hasMore, loadRecords } = useInfinityScroll<EventModel>();

  const loadUserEvents = useCallback(
    (lastDoc?: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      if (!user) throw new Error("User not authenticated");
      return eventsServices.getUserEventsPaginated(user.id, lastDoc);
    },
    [user]
  );

  const handleLoadMoreEvents = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      loadRecords(loadUserEvents);
    }
  }, [isLoadingMore, hasMore, loadRecords, loadUserEvents]);

  useEffect(() => {
    const loadInitialData = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        await loadRecords(loadUserEvents);
      } catch (error) {
        showErrorAlert(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [user, loadRecords, loadUserEvents, showErrorAlert]);

  const onDeleteEventHandler = async (eventId: string): Promise<void> => {
    try {
      await eventsServices.deleteEvent(eventId);
      // Remove the deleted event from the records
      // This will be handled by the hook's state management
    } catch (error) {
      showErrorAlert(error);
    }
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <PageHeader title='My Events'>
        <Button as={Link} to='/my-events/manage'>
          Create new event
        </Button>
      </PageHeader>
      <EventGrid onLoadMore={handleLoadMoreEvents} hasMore={hasMore} isLoading={isLoadingMore}>
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
    </>
  );
}

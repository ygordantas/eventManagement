import eventServices from "../../services/eventServices";
import useAuthContext from "../../hooks/useAuthContext";
import classes from "./MyEventsPage.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router";
import { useState } from "react";

export default function MyEventsPage() {
  const { user } = useAuthContext();
  const [myEvents, setMyEvents] = useState(
    eventServices.getUserEvents(user!.id)
  );

  const onDeleteEventHandler = (eventId: string): void => {
    eventServices.deleteEvent(eventId);
    setMyEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 className={classes.title}>My Events</h1>
        <Button as={Link} to="/my-events/manage">
          Create new event
        </Button>
      </div>

      <div className={classes.eventsGrid}>
        {myEvents.map((e) => (
          <div key={e.id} className={classes.eventCard}>
            <div className={classes.eventHeader}>
              <h3 className={classes.eventTitle}>{e.name}</h3>
              <span className={classes.status}>status</span>
            </div>

            <div className={classes.eventDetails}>
              <p className={classes.eventDateTime}>
                {e.date} - {e.time} - {e.timezoneCode}
              </p>
              {e.isOnline ? (
                <a href={e.address} target="_blank">
                  {e.address}
                </a>
              ) : (
                <p className={classes.eventLocation}>{e.address}</p>
              )}
              {e.description && (
                <p className={classes.description}>
                  {e.description.length > 100
                    ? e.description.substring(0, 100) + "..."
                    : e.description}
                </p>
              )}
            </div>

            <div className={classes.eventMeta}>
              <div className={classes.metaItem}>
                <span className={classes.metaLabel}>Visibility:</span>
                <span className={classes.metaValue}>
                  {e.isPrivate ? "Private" : "Public"}
                </span>
              </div>

              <div className={classes.metaItem}>
                <span className={classes.metaLabel}>Price:</span>
                <span className={classes.metaValue}>
                  {e.entrancePrice ? e.entrancePrice : "Free"}
                </span>
              </div>

              {e.maxCapacity && (
                <div className={classes.metaItem}>
                  <span className={classes.metaLabel}>Max Capacity:</span>
                  <span className={classes.metaValue}>{e.maxCapacity}</span>
                </div>
              )}
            </div>

            <div className={classes.eventActions}>
              <Button as={Link} to={`/my-events/manage/${e.id}`}>
                Edit
              </Button>
              <Button onClick={() => onDeleteEventHandler(e.id)}>Remove</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

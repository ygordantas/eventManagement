import type EventModel from "../../models/EventModel";
import classes from "./EventCard.module.css";
import createClassName from "../../utils/createClassName";
import { EVENT_STATUS, EVENT_STATUS_TEXT } from "../../constants/eventStatus";

type EventCardProps = {
  event: EventModel;
  footer?: React.ReactNode;
};

export default function EventCard({ event, footer }: EventCardProps) {
  const getEventStatus = () => {
    const eventDate = new Date(`${event.date} ${event.time}`);
    const now = new Date();

    // Reset time to start of day for comparison
    const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    const todayOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (eventDateOnly < todayOnly) {
      return { status: EVENT_STATUS.PAST, text: EVENT_STATUS_TEXT[EVENT_STATUS.PAST] };
    } else if (eventDateOnly.getTime() === todayOnly.getTime()) {
      return { status: EVENT_STATUS.TODAY, text: EVENT_STATUS_TEXT[EVENT_STATUS.TODAY] };
    } else {
      return { status: EVENT_STATUS.UPCOMING, text: EVENT_STATUS_TEXT[EVENT_STATUS.UPCOMING] };
    }
  };

  const eventStatus = getEventStatus();

  return (
    <div key={event.id} className={createClassName(classes.eventCard, classes[eventStatus.status])}>
      <div className={classes.eventHeader}>
        <h3 className={classes.eventTitle}>{event.name}</h3>
        <span className={createClassName(classes.status, classes[eventStatus.status])}>{eventStatus.text}</span>
      </div>

      <div className={classes.eventDetails}>
        <p className={classes.eventDateTime}>
          {event.date} - {event.time} - {event.timezoneCode}
        </p>
        {event.isOnline ? (
          <a href={event.address} target='_blank'>
            {event.address}
          </a>
        ) : (
          <p className={classes.eventLocation}>{event.address}</p>
        )}
        {event.description && (
          <p className={classes.description}>
            {event.description.length > 100 ? event.description.substring(0, 100) + "..." : event.description}
          </p>
        )}
      </div>

      <div className={classes.eventMeta}>
        <div className={classes.metaItem}>
          <span className={classes.metaLabel}>Visibility:</span>
          <span className={classes.metaValue}>{event.isPrivate ? "Private" : "Public"}</span>
        </div>

        <div className={classes.metaItem}>
          <span className={classes.metaLabel}>Price:</span>
          <span className={classes.metaValue}>{event.entrancePrice ? event.entrancePrice : "Free"}</span>
        </div>

        {event.maxCapacity && (
          <div className={classes.metaItem}>
            <span className={classes.metaLabel}>Max Capacity:</span>
            <span className={classes.metaValue}>{event.maxCapacity}</span>
          </div>
        )}
      </div>

      {footer && <div className={classes.eventActions}>{footer}</div>}
    </div>
  );
}

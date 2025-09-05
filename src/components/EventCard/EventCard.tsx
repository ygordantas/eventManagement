import { useMemo } from "react";
import DATE_FILTER_TYPES from "../../constants/dateFiltersTypes";
import type EventModel from "../../models/EventModel";
import createClassName from "../../utils/createClassName";
import classes from "./EventCard.module.css";
import { getEndOfTheDay, getStartOfTheDay } from "../../utils/dateUtils";

type EventCardProps = {
  event: EventModel;
  footer?: React.ReactNode;
};

export default function EventCard({ event, footer }: EventCardProps) {
  const eventStatus = useMemo(() => {
    const fromDate = getStartOfTheDay();
    const toDate = getEndOfTheDay();

    if (event.date >= fromDate && event.date <= toDate)
      return DATE_FILTER_TYPES.today;

    if (event.date > toDate) return DATE_FILTER_TYPES.upcoming;

    return DATE_FILTER_TYPES.past;
  }, [event.date]);

  return (
    <div
      key={event.id}
      className={createClassName(classes.eventCard, classes[eventStatus])}
    >
      <div className={classes.eventHeader}>
        <h3 className={classes.eventTitle}>{event.name}</h3>
        <span className={createClassName(classes.status, classes[eventStatus])}>
          {eventStatus}
        </span>
        {event.imagePath && (
          <img
            src={event.imagePath}
            alt={`Event image for event ${event.id}`}
          />
        )}
      </div>

      <div className={classes.eventDetails}>
        <p className={classes.eventDateTime}>{event.date.toString()}</p>
        {event.isOnline ? (
          <a href={event.address} target="_blank">
            {event.address}
          </a>
        ) : (
          <p className={classes.eventLocation}>{event.address}</p>
        )}
        {event.description && (
          <p className={classes.description}>
            {event.description.length > 100
              ? event.description.substring(0, 100) + "..."
              : event.description}
          </p>
        )}
      </div>

      <div className={classes.eventMeta}>
        <div className={classes.metaItem}>
          <span className={classes.metaLabel}>Visibility:</span>
          <span className={classes.metaValue}>
            {event.isPrivate ? "Private" : "Public"}
          </span>
        </div>

        <div className={classes.metaItem}>
          <span className={classes.metaLabel}>Price:</span>
          <span className={classes.metaValue}>
            {event.entrancePrice ? event.entrancePrice : "Free"}
          </span>
        </div>

        <div className={classes.metaItem}>
          <span className={classes.metaLabel}>Confirmed guests:</span>
          <span className={classes.metaValue}>
            {event.attendees?.length ?? 0}
          </span>
        </div>

        {event.maxCapacity && (
          <div className={classes.metaItem}>
            <span className={classes.metaLabel}>Max Capacity:</span>
            <span className={classes.metaValue}>{event.maxCapacity}</span>
          </div>
        )}
      </div>

      {footer && <div className={classes.footer}>{footer}</div>}
    </div>
  );
}

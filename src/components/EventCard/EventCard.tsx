import type EventModel from "../../models/EventModel";
import classes from "./EventCard.module.css";

type EventCardProps = {
  event: EventModel;
  footer?: React.ReactNode;
};

export default function EventCard({ event, footer }: EventCardProps) {
  return (
    <div key={event.id} className={classes.eventCard}>
      <div className={classes.eventHeader}>
        <h3 className={classes.eventTitle}>{event.name}</h3>
        {/* <span className={classes.status}>status</span> */}
      </div>

      <div className={classes.eventDetails}>
        <p className={classes.eventDateTime}>
          {event.date} - {event.time} - {event.timezoneCode}
        </p>
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

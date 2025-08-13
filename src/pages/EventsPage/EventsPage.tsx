import eventServices from "../../services/eventServices";

export default function EventsPage() {
  const upcomingEvents = eventServices
    .getAllEvents()
    .sort(
      (a, b) =>
        new Date(a.date).getMilliseconds() - new Date(b.date).getMilliseconds()
    );

  return (
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

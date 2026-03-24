import { AppChrome } from "../chrome";
import styles from "./page.module.css";
import { getMissionControlData } from "@/lib/store";
import { formatDateTime } from "@/lib/view-models";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const data = await getMissionControlData();
  const events = [...data.events].reverse();
  const eventTypes = Array.from(new Set(events.map((event) => event.type)));
  const actorCounts = data.agents
    .map((agent) => ({ name: agent.name, count: events.filter((event) => event.actor === agent.name || event.actor === agent.id).length }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <AppChrome
      active="history"
      title="History"
      description="The event trail makes the workflow explainable. Use it to see handoffs, approvals, task movement, and the narrative of what actually changed."
      controls={
        <>
          <button>{events.length} recorded events</button>
          <button>{eventTypes.length} event types</button>
        </>
      }
    >
      <section className={styles.metricRow}>
        <div className={styles.metricCard}><span>Latest event</span><strong>{events[0]?.type ?? "none"}</strong><small>{events[0]?.message ?? "No activity logged yet."}</small></div>
        <div className={styles.metricCard}><span>Approval trail</span><strong>{events.filter((event) => event.type === "approval").length}</strong><small>Decision activity visible in the shared record</small></div>
        <div className={styles.metricCard}><span>Task movement</span><strong>{events.filter((event) => event.type === "task").length}</strong><small>Board changes that explain execution flow</small></div>
        <div className={styles.metricCard}><span>System changes</span><strong>{events.filter((event) => event.type === "system" || event.type === "build").length}</strong><small>Underlying coordination or build work</small></div>
      </section>

      <section className={styles.layout}>
        <div className={styles.feedColumn}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.kicker}>Event feed</span>
              <h3>What happened, in reverse order</h3>
            </div>
          </div>
          <div className={styles.feed}>
            {events.map((event) => (
              <article key={event.id} className={styles.eventCard}>
                <div className={styles.eventTop}>
                  <span className={styles.type}>{event.type}</span>
                  <small>{formatDateTime(event.timestamp)}</small>
                </div>
                <strong>{event.message}</strong>
                <p>{event.actor}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className={styles.sideColumn}>
          <div className={styles.sideCard}>
            <span className={styles.kicker}>Coverage</span>
            <strong>Event types in use</strong>
            <div className={styles.pillRow}>
              {eventTypes.map((type) => <span key={type} className={styles.pill}>{type}</span>)}
            </div>
            <p>As actions run through Mission Control, history becomes the audit trail for handoffs and decisions.</p>
          </div>

          <div className={styles.sideCard}>
            <span className={styles.kicker}>Most active actors</span>
            <div className={styles.actorList}>
              {actorCounts.map((actor) => (
                <div key={actor.name} className={styles.actorItem}>
                  <strong>{actor.name}</strong>
                  <span>{actor.count} events</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sideCard}>
            <span className={styles.kicker}>Why it matters</span>
            <ul>
              <li>Approvals stop being mysterious because the queue has a matching event trail.</li>
              <li>Task movement becomes visible beyond the board itself.</li>
              <li>Relay integrations have a clean source for future outbound summaries and notifications.</li>
            </ul>
          </div>
        </aside>
      </section>
    </AppChrome>
  );
}

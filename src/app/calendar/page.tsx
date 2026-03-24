import { AppChrome } from "../chrome";
import styles from "./page.module.css";
import { createScheduleItem, deleteScheduleItem } from "@/lib/actions";
import { getMissionControlData } from "@/lib/store";
import { formatDate, formatTime } from "@/lib/view-models";

export const dynamic = "force-dynamic";

const typeTone = {
  focus: "purple",
  meeting: "blue",
  delivery: "green",
  review: "amber",
} as const;

export default async function CalendarPage() {
  const data = await getMissionControlData();
  const agentMap = new Map(data.agents.map((agent) => [agent.id, agent]));
  const projectMap = new Map(data.projects.map((project) => [project.id, project]));
  const items = [...data.scheduleItems].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const recurring = items.filter((item) => item.type === "meeting");
  const focus = items.filter((item) => item.type === "focus");
  const scheduled = items.filter((item) => item.type !== "meeting");
  const todayKey = items[0] ? new Date(items[0].startsAt).toISOString().slice(0, 10) : null;
  const todayFocus = todayKey ? scheduled.filter((item) => item.startsAt.slice(0, 10) === todayKey) : [];

  return (
    <AppChrome
      active="calendar"
      title="Calendar"
      description="This page separates recurring operating rhythm, scheduled work blocks, and today’s focus so it is obvious what is fixed versus flexible."
      controls={
        <>
          <button>{items.length} scheduled items</button>
          <button>{focus.length} focus blocks</button>
        </>
      }
    >
      <section className={styles.metaRow}>
        <div className={styles.metaCard}><span>Always-running rhythm</span><strong>{recurring.length}</strong><small>Recurring meeting and review cadence</small></div>
        <div className={styles.metaCard}><span>Scheduled work</span><strong>{scheduled.length}</strong><small>Non-recurring execution blocks</small></div>
        <div className={styles.metaCard}><span>Today focus</span><strong>{todayFocus.length}</strong><small>Blocks on the nearest operating day in view</small></div>
      </section>

      <section className={styles.composer}>
        <div>
          <span className={styles.sectionKicker}>Create schedule item</span>
          <h2>Add a block with owner, project, time window, and type</h2>
          <p>Meetings should represent cadence. Focus, delivery, and review blocks should represent actual execution time.</p>
        </div>
        <form action={createScheduleItem} className={styles.formGrid}>
          <input name="title" placeholder="Block title" required />
          <select name="ownerId" defaultValue={data.agents[0]?.id}>{data.agents.map((agent) => <option key={agent.id} value={agent.id}>{agent.name}</option>)}</select>
          <select name="projectId" defaultValue={data.projects[0]?.id}>{data.projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}</select>
          <input type="datetime-local" name="startsAt" required />
          <input type="datetime-local" name="endsAt" required />
          <select name="type" defaultValue="focus">
            <option value="focus">Focus</option>
            <option value="meeting">Meeting</option>
            <option value="delivery">Delivery</option>
            <option value="review">Review</option>
          </select>
          <button type="submit">Add item</button>
        </form>
      </section>

      <div className={styles.layout}>
        <section className={styles.column}>
          <div className={styles.columnHeader}>
            <div>
              <span className={styles.sectionKicker}>Always-running schedules</span>
              <h3>Recurring cadence</h3>
            </div>
            <small>Fixed rhythm</small>
          </div>
          <div className={styles.list}>
            {recurring.length ? recurring.map((item) => (
              <article key={item.id} className={`${styles.item} ${styles[typeTone[item.type]]}`}>
                <div>
                  <small>{formatDate(item.startsAt)}</small>
                  <h2>{item.title}</h2>
                  <p>{formatTime(item.startsAt)}–{formatTime(item.endsAt)} · {agentMap.get(item.ownerId)?.name ?? item.ownerId}</p>
                </div>
                <div className={styles.sideMeta}>
                  <span>{projectMap.get(item.projectId)?.title ?? "Unknown project"}</span>
                  <strong>{item.type}</strong>
                  <form action={deleteScheduleItem}>
                    <input type="hidden" name="id" value={item.id} />
                    <button type="submit">Delete</button>
                  </form>
                </div>
              </article>
            )) : <div className={styles.emptyState}><strong>No recurring schedule blocks.</strong><p>Add meetings here when they represent standing operating rhythm.</p></div>}
          </div>
        </section>

        <section className={styles.column}>
          <div className={styles.columnHeader}>
            <div>
              <span className={styles.sectionKicker}>Scheduled tasks</span>
              <h3>Upcoming time blocks</h3>
            </div>
            <small>Execution</small>
          </div>
          <div className={styles.list}>
            {scheduled.length ? scheduled.map((item) => (
              <article key={item.id} className={`${styles.item} ${styles[typeTone[item.type]]}`}>
                <div>
                  <small>{formatDate(item.startsAt)}</small>
                  <h2>{item.title}</h2>
                  <p>{formatTime(item.startsAt)}–{formatTime(item.endsAt)} · {agentMap.get(item.ownerId)?.name ?? item.ownerId}</p>
                </div>
                <div className={styles.sideMeta}>
                  <span>{projectMap.get(item.projectId)?.title ?? "Unknown project"}</span>
                  <strong>{item.type}</strong>
                  <form action={deleteScheduleItem}>
                    <input type="hidden" name="id" value={item.id} />
                    <button type="submit">Delete</button>
                  </form>
                </div>
              </article>
            )) : <div className={styles.emptyState}><strong>No scheduled work blocks yet.</strong><p>Add focus, delivery, or review windows so the day has real structure.</p></div>}
          </div>
        </section>

        <aside className={styles.todayRail}>
          <div className={styles.todayCard}>
            <span className={styles.sectionKicker}>Today focus</span>
            <strong>{todayKey ?? "No day in view"}</strong>
            <p>This isolates the immediate day from the broader schedule so Daniel can see what needs protecting right now.</p>
          </div>
          <div className={styles.todayList}>
            {todayFocus.length ? todayFocus.map((item) => (
              <div key={item.id} className={styles.todayItem}>
                <strong>{item.title}</strong>
                <span>{formatTime(item.startsAt)}–{formatTime(item.endsAt)}</span>
                <small>{agentMap.get(item.ownerId)?.name ?? item.ownerId} · {item.type}</small>
              </div>
            )) : <div className={styles.emptyState}><strong>No focus blocks for the current day.</strong><p>Add one or pull from scheduled work to define today’s shape.</p></div>}
          </div>
        </aside>
      </div>
    </AppChrome>
  );
}

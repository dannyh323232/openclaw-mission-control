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

  return (
    <AppChrome
      active="calendar"
      title="Calendar"
      description="Shared scheduled load with persisted items and quick add/remove actions for the local MVP."
      controls={<><button>{items.length} items</button><button>{data.scheduleItems.filter((item) => item.type === "focus").length} focus blocks</button></>}
    >
      <div className={styles.metaRow}>
        <div className={styles.metaCard}><span>Recurring jobs</span><strong>{data.scheduleItems.filter((item) => item.type === "meeting").length}</strong></div>
        <div className={styles.metaCard}><span>Booked focus blocks</span><strong>{data.scheduleItems.filter((item) => item.type === "focus").length}</strong></div>
        <div className={styles.metaCard}><span>Review blocks</span><strong>{data.scheduleItems.filter((item) => item.type === "review").length}</strong></div>
      </div>

      <section className={styles.composer}>
        <div>
          <span className={styles.sectionKicker}>Create schedule item</span>
          <h2>Add a new block to the operating calendar</h2>
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

      <div className={styles.list}>
        {items.map((item) => (
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
        ))}
      </div>
    </AppChrome>
  );
}

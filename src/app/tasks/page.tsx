import { AppChrome } from "../chrome";
import styles from "./page.module.css";
import { createTask, deleteTask, moveTask } from "@/lib/actions";
import { getMissionControlData } from "@/lib/store";
import { formatDateTime, laneMeta, priorityTone } from "@/lib/view-models";
import type { TaskLane } from "@/lib/types";

export const dynamic = "force-dynamic";

const lanes: TaskLane[] = ["now", "queued", "building", "review"];

export default async function TasksPage() {
  const data = await getMissionControlData();
  const projectMap = new Map(data.projects.map((project) => [project.id, project]));
  const agentMap = new Map(data.agents.map((agent) => [agent.id, agent]));
  const pendingApprovals = data.approvals.filter((approval) => approval.status === "pending").length;

  return (
    <AppChrome
      active="tasks"
      title="Tasks"
      description="Persisted execution lanes with real task records, ownership, and simple board actions."
      controls={<><button>{data.tasks.length} tasks</button><button>{pendingApprovals} approvals waiting</button></>}
    >
      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}><span>Open items</span><strong>{data.tasks.length}</strong><small>{data.tasks.filter((task) => task.lane === "now").length} active now</small></div>
        <div className={styles.summaryCard}><span>Active builders</span><strong>{data.agents.filter((agent) => agent.status === "busy").length}</strong><small>{data.tasks.filter((task) => task.lane === "building").length} building tasks</small></div>
        <div className={styles.summaryCard}><span>Escalations</span><strong>{pendingApprovals}</strong><small>CEO exception queue</small></div>
        <div className={styles.summaryCard}><span>Throughput</span><strong>{Math.round((data.tasks.filter((task) => task.lane === "review").length / Math.max(data.tasks.length, 1)) * 100)}%</strong><small>Tasks in review</small></div>
      </div>

      <section className={styles.composer}>
        <div>
          <span className={styles.sectionKicker}>Create task</span>
          <h2>Add work into the shared board</h2>
        </div>
        <form action={createTask} className={styles.formGrid}>
          <input name="title" placeholder="Task title" required />
          <input name="detail" placeholder="Detail / outcome" required />
          <select name="ownerId" defaultValue={data.agents[0]?.id}>
            {data.agents.map((agent) => <option key={agent.id} value={agent.id}>{agent.name}</option>)}
          </select>
          <select name="projectId" defaultValue={data.projects[0]?.id}>
            {data.projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}
          </select>
          <input name="dueAt" type="datetime-local" required />
          <select name="lane" defaultValue="queued">
            {lanes.map((lane) => <option key={lane} value={lane}>{laneMeta[lane].label}</option>)}
          </select>
          <select name="priority" defaultValue="medium">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <button type="submit">Create task</button>
        </form>
      </section>

      <div className={styles.board}>
        {lanes.map((lane) => (
          <section key={lane} className={styles.column}>
            <div className={styles.columnHeader}>
              <div>
                <strong>{laneMeta[lane].label}</strong>
                <span>{data.tasks.filter((task) => task.lane === lane).length} cards</span>
              </div>
              <b>{laneMeta[lane].badge}</b>
            </div>
            <div className={styles.stack}>
              {data.tasks.filter((task) => task.lane === lane).map((task) => (
                <article key={task.id} className={`${styles.card} ${styles[priorityTone[task.priority]]}`}>
                  <div className={styles.cardMeta}><span>{agentMap.get(task.ownerId)?.name ?? task.ownerId}</span><span>{formatDateTime(task.dueAt)}</span></div>
                  <h2>{task.title}</h2>
                  <p>{task.detail}</p>
                  <div className={styles.footer}><strong>{projectMap.get(task.projectId)?.title ?? "Unknown project"}</strong><small>{task.priority} priority</small></div>
                  <div className={styles.actions}>
                    <form action={moveTask}>
                      <input type="hidden" name="id" value={task.id} />
                      <select name="lane" defaultValue={task.lane} onChange={(event) => event.currentTarget.form?.requestSubmit()}>
                        {lanes.map((option) => <option key={option} value={option}>{laneMeta[option].label}</option>)}
                      </select>
                    </form>
                    <form action={deleteTask}>
                      <input type="hidden" name="id" value={task.id} />
                      <button type="submit" className={styles.deleteButton}>Delete</button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppChrome>
  );
}

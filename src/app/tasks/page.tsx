import Link from "next/link";
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
  const pendingApprovals = data.approvals.filter((approval) => approval.status === "pending");
  const nowTasks = data.tasks.filter((task) => task.lane === "now");
  const reviewTasks = data.tasks.filter((task) => task.lane === "review");
  const queuedTasks = data.tasks.filter((task) => task.lane === "queued");
  const buildingTasks = data.tasks.filter((task) => task.lane === "building");

  return (
    <AppChrome
      active="tasks"
      title="Tasks"
      description="This board is the execution surface. Pull work into now when it is actionable, build it with clear ownership, then move it into review before it is considered done."
      controls={
        <>
          <button>{data.tasks.length} total tasks</button>
          <button>{pendingApprovals.length} approvals creating pressure</button>
        </>
      }
    >
      <section className={styles.pageIntro}>
        <div className={styles.introCard}>
          <span className={styles.sectionKicker}>Board purpose</span>
          <h2>Use this page to run work, not just look at cards.</h2>
          <p>The lanes represent a simple operating flow: what needs attention now, what is ready next, what is actively being built, and what is waiting for a final check.</p>
        </div>
        <div className={styles.priorityStrip}>
          <div className={styles.summaryCard}><span>Now lane</span><strong>{nowTasks.length}</strong><small>Immediate attention items</small></div>
          <div className={styles.summaryCard}><span>Queued next</span><strong>{queuedTasks.length}</strong><small>Ready to be pulled forward</small></div>
          <div className={styles.summaryCard}><span>In build</span><strong>{buildingTasks.length}</strong><small>Active execution load</small></div>
          <div className={styles.summaryCard}><span>Approvals pressure</span><strong>{pendingApprovals.length}</strong><small>{pendingApprovals.length ? "Decision queue needs clearing" : "No decision bottleneck right now"}</small></div>
        </div>
      </section>

      <section className={styles.actionRow}>
        <div className={styles.focusCard}>
          <span className={styles.sectionKicker}>How to use it</span>
          <ul>
            <li><strong>Now</strong> = active priorities Daniel would expect movement on today.</li>
            <li><strong>Queued</strong> = prepared work with enough detail to start when capacity opens.</li>
            <li><strong>Building</strong> = work already in motion and owned.</li>
            <li><strong>Review</strong> = final checks, approvals, or sign-off before closing the loop.</li>
          </ul>
        </div>
        <div className={styles.focusCard}>
          <span className={styles.sectionKicker}>Pressure points</span>
          <strong>{reviewTasks.length} tasks are waiting for review</strong>
          <p>{pendingApprovals[0]?.title ?? "No approval is currently blocking the board."}</p>
          <Link href="/approvals">Open approval queue</Link>
        </div>
      </section>

      <section className={styles.composer}>
        <div>
          <span className={styles.sectionKicker}>Create task</span>
          <h2>Add work with owner, project, due time, lane, and priority</h2>
          <p>New tasks should land with enough context that someone can actually act on them.</p>
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
        {lanes.map((lane) => {
          const laneTasks = data.tasks.filter((task) => task.lane === lane);
          return (
            <section key={lane} className={styles.column}>
              <div className={styles.columnHeader}>
                <div>
                  <strong>{laneMeta[lane].label}</strong>
                  <span>{laneTasks.length} cards · {lane === "review" ? "final checks" : lane === "building" ? "active execution" : lane === "queued" ? "ready next" : "top priority"}</span>
                </div>
                <b>{laneMeta[lane].badge}</b>
              </div>
              <div className={styles.stack}>
                {laneTasks.length ? laneTasks.map((task) => (
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
                )) : (
                  <div className={styles.emptyState}>
                    <strong>No tasks in {laneMeta[lane].label.toLowerCase()}.</strong>
                    <p>{lane === "now" ? "Pull something from queued when it becomes the active priority." : lane === "queued" ? "New well-scoped tasks should land here by default." : lane === "building" ? "No active build work is in motion yet." : "Nothing is waiting for final review right now."}</p>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </AppChrome>
  );
}

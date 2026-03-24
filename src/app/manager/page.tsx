import Link from "next/link";
import { AppChrome } from "../chrome";
import styles from "./page.module.css";
import { getMissionControlData } from "@/lib/store";
import { formatDateTime, priorityTone } from "@/lib/view-models";

export const dynamic = "force-dynamic";

export default async function ManagerPage() {
  const data = await getMissionControlData();
  const projectMap = new Map(data.projects.map((project) => [project.id, project]));
  const agentMap = new Map(data.agents.map((agent) => [agent.id, agent]));
  const pendingApprovals = data.approvals.filter((approval) => approval.status === "pending");
  const activeTasks = data.tasks.filter((task) => task.lane === "now" || task.lane === "building");
  const reviewTasks = data.tasks.filter((task) => task.lane === "review");
  const blockedProjects = data.projects.filter((project) => project.health === "blocked" || project.health === "at-risk");
  const latestEvents = [...data.events].slice(-6).reverse();

  return (
    <AppChrome
      active="manager"
      title="Manager"
      description="This is the real orchestration layer: what enters the system, how it gets routed, what deserves escalation, and where execution is building pressure."
      controls={
        <>
          <button>{activeTasks.length} active tasks</button>
          <button>{pendingApprovals.length} owner exceptions</button>
        </>
      }
    >
      <section className={styles.topRow}>
        <div className={styles.heroCard}>
          <span className={styles.kicker}>Command posture</span>
          <h2>One instruction should become routed execution with visible handoffs and low owner noise.</h2>
          <p>Manager exists to split work, assign the best lane, protect Daniel from status spam, and make sure every exception has a reason.</p>
        </div>
        <div className={styles.metricGrid}>
          <div className={styles.metricCard}><span>Intake pressure</span><strong>{data.tasks.filter((task) => task.lane === "queued").length}</strong><small>Tasks ready for routing or pull-forward</small></div>
          <div className={styles.metricCard}><span>Execution live</span><strong>{activeTasks.length}</strong><small>Now + building combined</small></div>
          <div className={styles.metricCard}><span>Review stack</span><strong>{reviewTasks.length}</strong><small>Work waiting for final assurance</small></div>
          <div className={styles.metricCard}><span>Risk projects</span><strong>{blockedProjects.length}</strong><small>Need intervention before they drift further</small></div>
        </div>
      </section>

      <section className={styles.layout}>
        <div className={styles.mainColumn}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.kicker}>Operating system</span>
              <h3>Manager rules that now exist inside the app</h3>
            </div>
          </div>
          <div className={styles.rulesGrid}>
            {data.managerRules.map((rule) => (
              <article key={rule.id} className={styles.ruleCard}>
                <small>{rule.id.replace("rule-", "").replaceAll("-", " ")}</small>
                <strong>{rule.label}</strong>
                <p>{rule.detail}</p>
                <div className={styles.outcome}>{rule.outcome}</div>
              </article>
            ))}
          </div>

          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.kicker}>Routing board</span>
              <h3>What the manager would route next</h3>
            </div>
            <Link href="/tasks">Open full task board</Link>
          </div>
          <div className={styles.taskStack}>
            {data.tasks.slice(0, 6).map((task) => (
              <article key={task.id} className={`${styles.taskCard} ${styles[priorityTone[task.priority]]}`}>
                <div className={styles.taskTop}>
                  <div>
                    <small>{task.lane}</small>
                    <strong>{task.title}</strong>
                  </div>
                  <span>{formatDateTime(task.dueAt)}</span>
                </div>
                <p>{task.detail}</p>
                <div className={styles.taskMeta}>
                  <span>{agentMap.get(task.ownerId)?.name ?? task.ownerId}</span>
                  <span>{projectMap.get(task.projectId)?.title ?? "Unknown project"}</span>
                  <span>{task.priority}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className={styles.sideColumn}>
          <div className={styles.sideCard}>
            <span className={styles.kicker}>Escalate upward</span>
            <strong>{pendingApprovals.length ? pendingApprovals[0].title : "No owner exception waiting"}</strong>
            <p>{pendingApprovals[0]?.detail ?? "Manager is currently shielding Daniel from routine noise."}</p>
            <Link href="/approvals">Open approvals</Link>
          </div>

          <div className={styles.sideCard}>
            <span className={styles.kicker}>Latest command trail</span>
            <div className={styles.eventList}>
              {latestEvents.map((event) => (
                <div key={event.id} className={styles.eventItem}>
                  <strong>{event.message}</strong>
                  <small>{event.actor} · {formatDateTime(event.timestamp)}</small>
                </div>
              ))}
            </div>
            <Link href="/history">Open full history</Link>
          </div>

          <div className={styles.sideCard}>
            <span className={styles.kicker}>Surface map</span>
            <div className={styles.surfaceList}>
              <div><strong>Mission Control</strong><small>Shared source of truth for state and decisions</small></div>
              <div><strong>Discord</strong><small>Lane execution, handoffs, and daily brief visibility</small></div>
              <div><strong>Telegram</strong><small>Owner exceptions, approvals, and strategic summaries only</small></div>
            </div>
            <Link href="/relay">Open relay readiness</Link>
          </div>
        </aside>
      </section>
    </AppChrome>
  );
}

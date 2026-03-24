import Link from "next/link";
import { AppChrome } from "../chrome";
import styles from "./page.module.css";
import { updateApprovalStatus } from "@/lib/actions";
import { getMissionControlData } from "@/lib/store";
import { approvalTone, formatDateTime } from "@/lib/view-models";

export const dynamic = "force-dynamic";

export default async function ApprovalsPage() {
  const data = await getMissionControlData();
  const projectMap = new Map(data.projects.map((project) => [project.id, project]));
  const pendingApprovals = data.approvals.filter((approval) => approval.status === "pending");
  const approvedApprovals = data.approvals.filter((approval) => approval.status === "approved");
  const rejectedApprovals = data.approvals.filter((approval) => approval.status === "rejected");
  const relatedTasks = data.tasks.filter((task) => {
    const project = projectMap.get(task.projectId);
    return pendingApprovals.some((approval) => approval.projectId === task.projectId) && (task.lane === "now" || task.lane === "review") && project;
  });
  const projectPressure = data.projects
    .map((project) => ({
      project,
      pendingCount: pendingApprovals.filter((approval) => approval.projectId === project.id).length,
    }))
    .filter((item) => item.pendingCount > 0)
    .sort((a, b) => b.pendingCount - a.pendingCount);

  return (
    <AppChrome
      active="approvals"
      title="Approvals"
      description="This is Daniel’s decision surface. Everything here should represent an exception, unblock work quickly, and route execution back into Tasks, Calendar, or Projects."
      controls={<><button>{pendingApprovals.length} waiting now</button><button>{data.approvals.length} total decisions</button></>}
    >
      <section className={styles.summaryRow}>
        <div className={styles.summaryCard}><span>Waiting now</span><strong>{pendingApprovals.length}</strong><small>Items still blocking movement or needing sign-off</small></div>
        <div className={styles.summaryCard}><span>Approved</span><strong>{approvedApprovals.length}</strong><small>Requests already cleared and back in motion</small></div>
        <div className={styles.summaryCard}><span>Rejected</span><strong>{rejectedApprovals.length}</strong><small>Closed decisions that should not return silently</small></div>
      </section>

      <section className={styles.flowBanner}>
        <div>
          <span className={styles.sectionKicker}>Why this page exists</span>
          <h2>Tasks and projects should not stall because the decision queue is hidden.</h2>
          <p>Use Approvals when something needs Daniel. Once cleared, the work should continue on Tasks, Calendar, or Projects without confusion.</p>
        </div>
        <div className={styles.flowLinks}>
          <Link href="/tasks" className={styles.flowLink}><strong>Tasks</strong><span>Resume execution after a decision</span></Link>
          <Link href="/calendar" className={styles.flowLink}><strong>Calendar</strong><span>Protect time for approved work</span></Link>
          <Link href="/projects" className={styles.flowLink}><strong>Projects</strong><span>Inspect delivery pressure by initiative</span></Link>
        </div>
      </section>

      <div className={styles.layout}>
        <section className={styles.mainColumn}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionKicker}>Decision queue</span>
              <h3>Pending approvals</h3>
            </div>
            <small>{pendingApprovals.length ? "Clear these first" : "Queue is clear"}</small>
          </div>
          <div className={styles.stack}>
            {pendingApprovals.length ? pendingApprovals.map((approval) => (
              <article key={approval.id} className={`${styles.card} ${styles[approvalTone[approval.status]]}`}>
                <div className={styles.cardTop}>
                  <div>
                    <small className={styles.status}>{approval.status}</small>
                    <h2>{approval.title}</h2>
                  </div>
                  <small>{formatDateTime(approval.requestedAt)}</small>
                </div>
                <p>{approval.detail}</p>
                <div className={styles.cardMeta}>
                  <div><small>Requested by</small><strong>{approval.requestedBy}</strong></div>
                  <div><small>Project</small><strong>{projectMap.get(approval.projectId)?.title ?? "Unknown project"}</strong></div>
                </div>
                <div className={styles.actions}>
                  <form action={updateApprovalStatus}>
                    <input type="hidden" name="id" value={approval.id} />
                    <input type="hidden" name="status" value="approved" />
                    <button type="submit" className={styles.approve}>Approve and resume work</button>
                  </form>
                  <form action={updateApprovalStatus}>
                    <input type="hidden" name="id" value={approval.id} />
                    <input type="hidden" name="status" value="rejected" />
                    <button type="submit" className={styles.reject}>Reject and close loop</button>
                  </form>
                </div>
              </article>
            )) : (
              <div className={styles.emptyState}>
                <strong>No approvals are waiting right now.</strong>
                <p>That means Daniel can stay in execution and planning surfaces instead of acting as a bottleneck.</p>
              </div>
            )}
          </div>

          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionKicker}>Decision log</span>
              <h3>Recently decided</h3>
            </div>
            <small>{approvedApprovals.length + rejectedApprovals.length} closed items</small>
          </div>
          <div className={styles.decisionGrid}>
            {[...approvedApprovals, ...rejectedApprovals].map((approval) => (
              <article key={approval.id} className={`${styles.decisionCard} ${styles[approvalTone[approval.status]]}`}>
                <div className={styles.cardTop}>
                  <small className={styles.status}>{approval.status}</small>
                  <small>{formatDateTime(approval.requestedAt)}</small>
                </div>
                <strong>{approval.title}</strong>
                <p>{projectMap.get(approval.projectId)?.title ?? "Unknown project"}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className={styles.sideColumn}>
          <div className={styles.sideCard}>
            <span className={styles.sectionKicker}>Project pressure</span>
            <strong>{projectPressure.length ? "Approvals grouped by project" : "No project is waiting on Daniel"}</strong>
            <div className={styles.sideList}>
              {projectPressure.length ? projectPressure.map(({ project, pendingCount }) => (
                <div key={project.id} className={styles.sideItem}>
                  <div>
                    <strong>{project.title}</strong>
                    <small>{project.health.replace("-", " ")} · due {project.dueDate}</small>
                  </div>
                  <b>{pendingCount}</b>
                </div>
              )) : <p className={styles.helper}>The queue is clear, so use Projects to manage delivery risk instead.</p>}
            </div>
          </div>

          <div className={styles.sideCard}>
            <span className={styles.sectionKicker}>Connected work</span>
            <strong>{relatedTasks.length} active tasks are tied to waiting decisions</strong>
            <div className={styles.sideList}>
              {relatedTasks.length ? relatedTasks.map((task) => (
                <div key={task.id} className={styles.sideTask}>
                  <strong>{task.title}</strong>
                  <small>{projectMap.get(task.projectId)?.title ?? "Unknown project"} · {task.lane}</small>
                </div>
              )) : <p className={styles.helper}>No active task is currently being held up by the approval queue.</p>}
            </div>
            <Link href="/tasks" className={styles.sideLink}>Open tasks board</Link>
          </div>
        </aside>
      </div>
    </AppChrome>
  );
}

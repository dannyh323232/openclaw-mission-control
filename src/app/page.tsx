import Link from "next/link";
import { AppChrome } from "./chrome";
import styles from "./page.module.css";
import { getMissionControlData } from "@/lib/store";
import { formatDateTime } from "@/lib/view-models";

export const dynamic = "force-dynamic";

const nextStepCards = [
  {
    label: "Clear the decision queue",
    href: "/approvals",
    description: "Review pending approvals and remove anything waiting on Daniel.",
  },
  {
    label: "Run execution",
    href: "/tasks",
    description: "Move tasks across lanes, assign owners, and create new work with context.",
  },
  {
    label: "Shape the day",
    href: "/calendar",
    description: "Separate recurring meetings from scheduled work and today’s focus blocks.",
  },
] as const;

const workflowCards = [
  ["Projects", "/projects", "Track health, owner, due date, and delivery pressure across initiatives."],
  ["Memory", "/memory", "Hold operating notes, recent journal entries, and assumptions worth keeping."],
  ["Team", "/team", "See who owns what, who is overloaded, and where capacity is available."],
  ["Office", "/office", "Visualise the floor state without pretending it is the main workflow."],
] as const;

export default async function Home() {
  const data = await getMissionControlData();
  const pendingApprovals = data.approvals.filter((approval) => approval.status === "pending");
  const tasksNow = data.tasks.filter((task) => task.lane === "now");
  const tasksInReview = data.tasks.filter((task) => task.lane === "review");
  const busyAgents = data.agents.filter((agent) => agent.status === "busy");
  const latestEvent = data.events.at(-1);

  return (
    <AppChrome
      active="home"
      title="Overview"
      description="Start here when you need to understand what matters now, what is blocked, and which surface to open next."
      controls={
        <>
          <button>{pendingApprovals.length} approvals waiting</button>
          <button>{tasksNow.length} tasks need active attention</button>
        </>
      }
    >
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>Command centre</span>
          <h2>Mission Control is now organised around decisions, execution, time, and reference.</h2>
          <p>
            The point of this screen is orientation: see the pressure, choose the right page, and move straight into action without guessing what each view is for.
          </p>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.statCard}>
            <span>Pending approvals</span>
            <strong>{pendingApprovals.length}</strong>
            <small>Anything here is waiting on a decision.</small>
          </div>
          <div className={styles.statCard}>
            <span>Active tasks</span>
            <strong>{tasksNow.length}</strong>
            <small>Work currently expected to move now.</small>
          </div>
          <div className={styles.statCard}>
            <span>Busy agents</span>
            <strong>{busyAgents.length}</strong>
            <small>{data.agents.length - busyAgents.length} with some spare capacity.</small>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.kicker}>What to do next</span>
            <h3>Choose the surface based on the job</h3>
          </div>
        </div>
        <div className={styles.nextGrid}>
          {nextStepCards.map((card) => (
            <Link key={card.label} href={card.href} className={styles.nextCard}>
              <span className={styles.cardLabel}>Open workflow</span>
              <strong>{card.label}</strong>
              <p>{card.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.kicker}>Situation snapshot</span>
            <h3>The important state at a glance</h3>
          </div>
        </div>
        <div className={styles.snapshotGrid}>
          <article className={styles.snapshotCard}>
            <small>Decision pressure</small>
            <strong>{pendingApprovals[0]?.title ?? "No pending approvals"}</strong>
            <p>
              {pendingApprovals[0]?.detail ?? "The approval queue is clear right now."}
            </p>
            <Link href="/approvals">Open approvals</Link>
          </article>
          <article className={styles.snapshotCard}>
            <small>Current work</small>
            <strong>{tasksNow[0]?.title ?? "No tasks in the now lane"}</strong>
            <p>
              {tasksNow[0]?.detail ?? "Use the Tasks page to pull work into the now lane when it becomes actionable."}
            </p>
            <Link href="/tasks">Open tasks board</Link>
          </article>
          <article className={styles.snapshotCard}>
            <small>Review load</small>
            <strong>{tasksInReview.length} items in review</strong>
            <p>Review is the last handoff before something is considered settled. Keep this lane flowing so work does not silently stall.</p>
            <Link href="/tasks">Check review lane</Link>
          </article>
          <article className={styles.snapshotCard}>
            <small>Latest system event</small>
            <strong>{latestEvent?.message ?? "No recent event logged"}</strong>
            <p>{latestEvent ? `${latestEvent.actor} · ${formatDateTime(latestEvent.timestamp)}` : "Events will appear here once activity is logged."}</p>
            <Link href="/projects">Open delivery views</Link>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.kicker}>Reference surfaces</span>
            <h3>Supporting pages with clearer purpose</h3>
          </div>
        </div>
        <div className={styles.workflowGrid}>
          {workflowCards.map(([label, href, copy]) => (
            <Link key={label} href={href} className={styles.workflowCard}>
              <span className={styles.cardLabel}>Open view</span>
              <strong>{label}</strong>
              <p>{copy}</p>
            </Link>
          ))}
        </div>
      </section>
    </AppChrome>
  );
}

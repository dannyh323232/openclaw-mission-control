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
  ["Manager", "/manager", "Run routing, escalation logic, and the real operating system behind the board."],
  ["History", "/history", "Inspect the event trail so task movement and approvals stay explainable."],
  ["Relay", "/relay", "Prepare Discord and Telegram as outputs from Mission Control instead of rival systems."],
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
  const scheduleItems = [...data.scheduleItems].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const nextScheduled = scheduleItems[0];
  const projectAttention = data.projects.filter((project) => project.health !== "on-track");
  const recentEvents = [...data.events].slice(-4).reverse();
  const flowCards = [
    {
      label: "Approvals",
      href: "/approvals",
      metric: `${pendingApprovals.length} waiting`,
      detail: pendingApprovals.length ? pendingApprovals[0].title : "Decision queue is clear.",
    },
    {
      label: "Tasks",
      href: "/tasks",
      metric: `${tasksNow.length} in now`,
      detail: tasksNow[0]?.title ?? "No task is currently in the now lane.",
    },
    {
      label: "Calendar",
      href: "/calendar",
      metric: nextScheduled ? formatDateTime(nextScheduled.startsAt) : "No block booked",
      detail: nextScheduled ? nextScheduled.title : "Nothing is scheduled yet.",
    },
    {
      label: "Projects",
      href: "/projects",
      metric: `${projectAttention.length} need attention`,
      detail: projectAttention[0]?.title ?? "All tracked projects are on track.",
    },
  ] as const;

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
          <h2>Mission Control is organised as one operating loop, not a pile of separate pages.</h2>
          <p>
            Start here to see pressure, then move in sequence: clear decisions in Approvals, run work in Tasks, protect time in Calendar, and inspect delivery health in Projects.
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
            <span className={styles.kicker}>Operating flow</span>
            <h3>Follow the loop instead of guessing where to start</h3>
          </div>
        </div>
        <div className={styles.flowGrid}>
          {flowCards.map((card) => (
            <Link key={card.label} href={card.href} className={styles.flowCard}>
              <span className={styles.cardLabel}>{card.label}</span>
              <strong>{card.metric}</strong>
              <p>{card.detail}</p>
            </Link>
          ))}
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
            <span className={styles.kicker}>Recent activity</span>
            <h3>Live changes from the shared state</h3>
          </div>
        </div>
        <div className={styles.eventGrid}>
          {recentEvents.map((event) => (
            <article key={event.id} className={styles.eventCard}>
              <small>{event.type}</small>
              <strong>{event.message}</strong>
              <p>{event.actor} · {formatDateTime(event.timestamp)}</p>
            </article>
          ))}
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

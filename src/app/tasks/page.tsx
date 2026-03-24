import Link from "next/link";
import shell from "../shared-shell.module.css";
import styles from "./page.module.css";

type NavItem = { label: string; href: string; active?: boolean };
type TaskStatus = "Recurring" | "Backlog" | "In Progress" | "Review";
type Task = {
  title: string;
  description: string;
  owner: string;
  project: string;
  status: TaskStatus;
  tone: "red" | "amber" | "purple" | "green";
};

const navItems: NavItem[] = [
  { label: "Tasks", href: "/tasks", active: true },
  { label: "Agents", href: "/agents" },
  { label: "Content", href: "/content" },
  { label: "Approvals", href: "/approvals" },
  { label: "Council", href: "/council" },
  { label: "Calendar", href: "/calendar" },
  { label: "Projects", href: "/projects" },
  { label: "Memory", href: "/memory" },
  { label: "Docs", href: "/docs" },
  { label: "People", href: "/people" },
  { label: "Office", href: "/office" },
  { label: "Team", href: "/team" },
  { label: "System", href: "/system" },
  { label: "Radar", href: "/radar" },
  { label: "Factory", href: "/factory" },
  { label: "Pipeline", href: "/pipeline" },
  { label: "Feedback", href: "/feedback" },
];

const tasks: Task[] = [
  {
    title: "Morning office startup flow",
    description: "Recurring queue review, scheduled checks, and activation.",
    owner: "Manager",
    project: "Operations",
    status: "Recurring",
    tone: "purple",
  },
  {
    title: "Confirm live deploy path",
    description: "Validate real publish path so SEO and WEB stop working blind.",
    owner: "SEO",
    project: "Refined Site",
    status: "Backlog",
    tone: "red",
  },
  {
    title: "Tighten homepage → WBco CTA flow",
    description: "Increase retail click-through and reduce homepage drop-off.",
    owner: "Web",
    project: "Conversion",
    status: "Backlog",
    tone: "red",
  },
  {
    title: "Build Mission Control dashboard shell",
    description: "Create denser dashboard layout matching mission-control pattern.",
    owner: "Manager",
    project: "Mission Control",
    status: "In Progress",
    tone: "purple",
  },
  {
    title: "Design relay model for Discord + Telegram",
    description: "Backend-first shared event model, not chat-led orchestration.",
    owner: "Systems",
    project: "Relay Layer",
    status: "In Progress",
    tone: "green",
  },
  {
    title: "Create CEO exception queue",
    description: "Only surface approvals, blockers, decisions, and high-risk actions.",
    owner: "Manager",
    project: "Mission Control",
    status: "Review",
    tone: "amber",
  },
];

const columns: TaskStatus[] = ["Recurring", "Backlog", "In Progress", "Review"];

function toneClass(tone: Task["tone"]) {
  switch (tone) {
    case "red":
      return styles.toneRed;
    case "amber":
      return styles.toneAmber;
    case "purple":
      return styles.tonePurple;
    case "green":
      return styles.toneGreen;
  }
}

export default function TasksPage() {
  return (
    <main className={shell.shell}>
      <aside className={shell.sidebar}>
        <div className={shell.brand}>
          <div className={shell.brandMark}>⌘</div>
          <span>Mission Control</span>
        </div>
        <nav className={shell.nav}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={`${shell.navItem} ${item.active ? shell.navItemActive : ""}`}>
              <span className={shell.navIcon}>◻</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className={shell.sidebarFoot}>
          <div className={shell.avatar}>N</div>
        </div>
      </aside>

      <section className={shell.main}>
        <header className={shell.topbar}>
          <div className={shell.search}>⌕ Search</div>
          <div className={shell.topActions}>
            <button className={shell.ghostButton}>Pause</button>
            <button className={shell.ghostButton}>Ping Henry</button>
            <span className={shell.topIcon}>◌</span>
            <span className={shell.topIcon}>◔</span>
          </div>
        </header>

        <section className={shell.panel}>
          <div className={shell.panelHeader}>
            <div>
              <h1>Tasks</h1>
              <p>Kanban-style operational view</p>
            </div>
          </div>

          <div className={styles.board}>
            {columns.map((column) => (
              <div key={column} className={styles.column}>
                <div className={styles.columnHeader}>
                  <h2>{column}</h2>
                  <span>{tasks.filter((task) => task.status === column).length}</span>
                </div>
                <div className={styles.stack}>
                  {tasks
                    .filter((task) => task.status === column)
                    .map((task) => (
                      <article key={task.title} className={styles.card}>
                        <div className={styles.cardTop}>
                          <span className={`${styles.dot} ${toneClass(task.tone)}`} />
                          <span className={styles.owner}>{task.owner}</span>
                        </div>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div className={styles.meta}>
                          <span>{task.project}</span>
                        </div>
                      </article>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

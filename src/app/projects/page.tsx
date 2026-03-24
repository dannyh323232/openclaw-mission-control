import Link from "next/link";
import shell from "../shared-shell.module.css";
import styles from "./page.module.css";

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

type Project = {
  title: string;
  description: string;
  owner: string;
  lastActivity: string;
  priority: "high" | "medium";
  status: "Active" | "Planning";
  progress: number;
  tasks: string;
  accent: "green" | "orange" | "purple" | "slate";
};

const navItems: NavItem[] = [
  { label: "Tasks", href: "/tasks" },
  { label: "Agents", href: "/agents" },
  { label: "Content", href: "/content" },
  { label: "Approvals", href: "/approvals" },
  { label: "Council", href: "/council" },
  { label: "Calendar", href: "/calendar" },
  { label: "Projects", href: "/projects", active: true },
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

const projects: Project[] = [
  {
    title: "Agent Org Infrastructure",
    description:
      "Core infrastructure for the autonomous agent organization. Health monitoring, message bus, shared state.",
    owner: "Charlie",
    lastActivity: "8 days ago by Henry",
    priority: "high",
    status: "Active",
    progress: 100,
    tasks: "10/10",
    accent: "green",
  },
  {
    title: "Mission Control",
    description:
      "Central dashboard for the agent organization. Tasks, projects, approvals, agent activity, docs, and real-time visibility.",
    owner: "Henry",
    lastActivity: "8 days ago by Henry",
    priority: "high",
    status: "Active",
    progress: 70,
    tasks: "6/8",
    accent: "orange",
  },
  {
    title: "Skool AI Extension",
    description:
      "Chrome extension and RAG pipeline over course content for internal leverage and retrieval.",
    owner: "Henry",
    lastActivity: "8 days ago by Henry",
    priority: "high",
    status: "Active",
    progress: 0,
    tasks: "0/6",
    accent: "orange",
  },
  {
    title: "Micro-SaaS Factory",
    description:
      "Opportunity engine — research market gaps, validate ideas, and build small SaaS products.",
    owner: "Violet",
    lastActivity: "8 days ago by Violet",
    priority: "medium",
    status: "Planning",
    progress: 0,
    tasks: "0/8",
    accent: "purple",
  },
  {
    title: "Even G2 Integration",
    description:
      "Smart glasses bridge app connecting Even Realities G2 glasses to Henry via BLE AI assistant workflows.",
    owner: "Unassigned",
    lastActivity: "8 days ago",
    priority: "medium",
    status: "Planning",
    progress: 0,
    tasks: "0/10",
    accent: "slate",
  },
];

function accentClass(accent: Project["accent"]) {
  switch (accent) {
    case "green":
      return styles.accentGreen;
    case "orange":
      return styles.accentOrange;
    case "purple":
      return styles.accentPurple;
    case "slate":
      return styles.accentSlate;
  }
}

function statusClass(status: Project["status"]) {
  return status === "Active" ? styles.statusActive : styles.statusPlanning;
}

function priorityClass(priority: Project["priority"]) {
  return priority === "high" ? styles.priorityHigh : styles.priorityMedium;
}

export default function ProjectsPage() {
  return (
    <main className={shell.shell}>
      <aside className={shell.sidebar}>
        <div className={shell.brand}>
          <div className={shell.brandMark}>⌘</div>
          <span>Mission Control</span>
        </div>

        <nav className={shell.nav}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${shell.navItem} ${item.active ? shell.navItemActive : ""}`}
            >
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
              <h1>Projects</h1>
              <p>5 total • 2 active • 3 planning</p>
            </div>
          </div>

          <div className={styles.grid}>
            {projects.map((project) => (
              <article key={project.title} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.projectIcon}>▣</div>
                  <span className={`${styles.statusBadge} ${statusClass(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <h2>{project.title}</h2>
                <p>{project.description}</p>

                <div className={styles.progressMeta}>
                  <span>{project.progress}%</span>
                  <span>{project.tasks}</span>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={`${styles.progressBar} ${accentClass(project.accent)}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <div className={styles.ownerRow}>
                  <div className={styles.ownerBadge}>{project.owner.charAt(0)}</div>
                  <div className={styles.ownerMeta}>
                    <strong>{project.owner}</strong>
                    <span>{project.lastActivity}</span>
                  </div>
                  <span className={`${styles.priorityBadge} ${priorityClass(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

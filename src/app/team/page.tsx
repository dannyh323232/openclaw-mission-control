import Link from "next/link";
import shell from "../shared-shell.module.css";
import styles from "./page.module.css";

type NavItem = { label: string; href: string; active?: boolean };
type Member = {
  name: string;
  role: string;
  summary: string;
  tags: string[];
  accent: "purple" | "blue" | "orange" | "green" | "pink" | "slate";
};

const navItems: NavItem[] = [
  { label: "Tasks", href: "/tasks" },
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
  { label: "Team", href: "/team", active: true },
  { label: "System", href: "/system" },
  { label: "Radar", href: "/radar" },
  { label: "Factory", href: "/factory" },
  { label: "Pipeline", href: "/pipeline" },
  { label: "Feedback", href: "/feedback" },
];

const members: Member[] = [
  {
    name: "Henry",
    role: "Chief of Staff",
    summary: "Coordinates, delegates, keeps the ship moving. First point of contact between boss and agents.",
    tags: ["Orchestration", "Clarity", "Delegation"],
    accent: "purple",
  },
  {
    name: "Charlie",
    role: "Infrastructure Engineer",
    summary: "Infrastructure and automation specialist. Handles pipes, systems, and reliability.",
    tags: ["Coding", "Infrastructure", "Automation"],
    accent: "blue",
  },
  {
    name: "Ralph",
    role: "Foreman / QA Manager",
    summary: "Checks the work, spots weak points, and keeps delivery quality under control.",
    tags: ["Quality Assurance", "Monitoring", "Demo Recording"],
    accent: "orange",
  },
  {
    name: "Scout",
    role: "Trend Analyst",
    summary: "Finds trends, hooks, and opportunities before the rest of the team sees them.",
    tags: ["Speed", "Radar", "Research"],
    accent: "green",
  },
  {
    name: "Quill",
    role: "Content Writer",
    summary: "Writes scripts, captions, hooks, and persuasive content assets.",
    tags: ["Voice", "Quality", "Design"],
    accent: "purple",
  },
  {
    name: "Pixel",
    role: "Thumbnail Designer",
    summary: "Designs thumbnails, visuals, and attention-first assets.",
    tags: ["Visual", "Attention", "Style"],
    accent: "pink",
  },
  {
    name: "Echo",
    role: "Social Media Manager",
    summary: "Posts, packages, repurposes, and keeps distribution moving.",
    tags: ["Viral", "Speed", "Reach"],
    accent: "green",
  },
  {
    name: "Codex",
    role: "Lead Engineer",
    summary: "Builds faster, executes technical changes, and ships core implementation work.",
    tags: ["Build", "Code", "Systems"],
    accent: "slate",
  },
  {
    name: "Violet",
    role: "Research Analyst",
    summary: "Digs deeper, validates opportunities, and feeds high-signal insight into the stack.",
    tags: ["Research", "Validation", "Insight"],
    accent: "pink",
  },
];

function accentClass(accent: Member["accent"]) {
  switch (accent) {
    case "purple":
      return styles.accentPurple;
    case "blue":
      return styles.accentBlue;
    case "orange":
      return styles.accentOrange;
    case "green":
      return styles.accentGreen;
    case "pink":
      return styles.accentPink;
    case "slate":
      return styles.accentSlate;
  }
}

export default function TeamPage() {
  const [leader, ...rest] = members;
  const operations = rest.slice(0, 2);
  const signal = rest.slice(2, 6);
  const meta = rest.slice(6);

  return (
    <main className={shell.shell}>
      <aside className={shell.sidebar}>
        <div className={shell.brand}><div className={shell.brandMark}>⌘</div><span>Mission Control</span></div>
        <nav className={shell.nav}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={`${shell.navItem} ${item.active ? shell.navItemActive : ""}`}>
              <span className={shell.navIcon}>◻</span><span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className={shell.sidebarFoot}><div className={shell.avatar}>N</div></div>
      </aside>

      <section className={shell.main}>
        <header className={shell.topbar}>
          <div className={shell.search}>⌕ Search</div>
          <div className={shell.topActions}>
            <button className={shell.ghostButton}>Pause</button>
            <button className={shell.ghostButton}>Ping Henry</button>
            <span className={shell.topIcon}>◌</span><span className={shell.topIcon}>◔</span>
          </div>
        </header>

        <section className={shell.panel}>
          <div className={styles.banner}>“An autonomous organization of AI agents that does work for me and produces value 24/7”</div>
          <div className={styles.heading}>
            <h1>Meet the Team</h1>
            <p>9 AI agents across 3 machines, each with a real role and a real personality.</p>
          </div>

          <div className={styles.leaderWrap}>
            <article className={`${styles.card} ${accentClass(leader.accent)}`}>
              <div className={styles.cardTop}><div className={styles.avatarBox}>{leader.name.charAt(0)}</div></div>
              <h2>{leader.name}</h2>
              <h3>{leader.role}</h3>
              <p>{leader.summary}</p>
              <div className={styles.tagRow}>{leader.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          </div>

          <div className={styles.layerLabel}>Operations</div>
          <div className={styles.twoGrid}>
            {operations.map((member) => (
              <article key={member.name} className={`${styles.card} ${accentClass(member.accent)}`}>
                <div className={styles.cardTop}><div className={styles.avatarBox}>{member.name.charAt(0)}</div></div>
                <h2>{member.name}</h2><h3>{member.role}</h3><p>{member.summary}</p>
                <div className={styles.tagRow}>{member.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>

          <div className={styles.splitLabelRow}><span>Input Signal</span><span>Output Action</span></div>
          <div className={styles.fourGrid}>
            {signal.map((member) => (
              <article key={member.name} className={`${styles.card} ${accentClass(member.accent)}`}>
                <div className={styles.cardTop}><div className={styles.avatarBox}>{member.name.charAt(0)}</div></div>
                <h2>{member.name}</h2><h3>{member.role}</h3><p>{member.summary}</p>
                <div className={styles.tagRow}>{member.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>

          <div className={styles.layerLabel}>Meta Layer</div>
          <div className={styles.twoGrid}>
            {meta.map((member) => (
              <article key={member.name} className={`${styles.card} ${accentClass(member.accent)}`}>
                <div className={styles.cardTop}><div className={styles.avatarBox}>{member.name.charAt(0)}</div></div>
                <h2>{member.name}</h2><h3>{member.role}</h3><p>{member.summary}</p>
                <div className={styles.tagRow}>{member.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

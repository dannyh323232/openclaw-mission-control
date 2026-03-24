import Link from "next/link";
import shell from "../shared-shell.module.css";
import styles from "./page.module.css";

type DayName = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

type StatChip = {
  label: string;
  tone: "slate" | "amber" | "green";
};

type ScheduledTask = {
  title: string;
  time: string;
  tone: "orange" | "red" | "green" | "amber" | "slate" | "blue" | "purple";
};

type DayColumn = {
  day: DayName;
  active?: boolean;
  items: ScheduledTask[];
};

const navItems: NavItem[] = [
  { label: "Tasks", href: "/tasks" },
  { label: "Agents", href: "/agents" },
  { label: "Content", href: "/content" },
  { label: "Approvals", href: "/approvals" },
  { label: "Council", href: "/council" },
  { label: "Calendar", href: "/calendar", active: true },
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

const alwaysRunning: StatChip[] = [
  { label: "Reaction Pulse • Every 5 min", tone: "slate" },
  { label: "Trend Radar • 5x daily", tone: "amber" },
  { label: "Opportunity Scanner • 8x daily", tone: "green" },
];

const week: DayColumn[] = [
  {
    day: "Sun",
    items: [
      { title: "Trend Radar", time: "8:30 AM", tone: "orange" },
      { title: "Morning Kickoff", time: "8:45 AM", tone: "slate" },
      { title: "YouTube OpenClaw Recap", time: "7:30 AM", tone: "red" },
      { title: "Scout Morning Research", time: "8:00 AM", tone: "green" },
      { title: "Morning Brief", time: "9:00 AM", tone: "amber" },
      { title: "Trend Radar Daily Digest", time: "9:30 AM", tone: "slate" },
      { title: "Daily Digest", time: "9:00 AM", tone: "purple" },
      { title: "Evening Wrap Up", time: "6:00 PM", tone: "slate" },
    ],
  },
  {
    day: "Mon",
    items: [
      { title: "Trend Radar", time: "8:30 AM", tone: "orange" },
      { title: "Morning Kickoff", time: "8:45 AM", tone: "slate" },
      { title: "YouTube OpenClaw Recap", time: "7:30 AM", tone: "red" },
      { title: "Block Security Research", time: "7:30 AM", tone: "slate" },
      { title: "Scout Morning Research", time: "8:00 AM", tone: "green" },
      { title: "Morning Brief", time: "9:00 AM", tone: "amber" },
      { title: "Trend Radar Daily Digest", time: "9:30 AM", tone: "slate" },
      { title: "Quill Script Writer", time: "5:30 AM", tone: "blue" },
      { title: "Daily Digest", time: "9:00 AM", tone: "purple" },
      { title: "Evening Wrap Up", time: "6:00 PM", tone: "slate" },
    ],
  },
  {
    day: "Tue",
    active: true,
    items: [
      { title: "Trend Radar", time: "8:30 AM", tone: "orange" },
      { title: "Morning Kickoff", time: "8:45 AM", tone: "slate" },
      { title: "YouTube OpenClaw Recap", time: "7:30 AM", tone: "red" },
      { title: "Scout Morning Research", time: "8:00 AM", tone: "green" },
      { title: "Morning Brief", time: "9:00 AM", tone: "amber" },
      { title: "Trend Radar Daily Digest", time: "9:30 AM", tone: "slate" },
      { title: "Quill Script Writer", time: "5:30 AM", tone: "blue" },
      { title: "Daily Digest", time: "9:00 AM", tone: "purple" },
      { title: "Evening Wrap Up", time: "6:00 PM", tone: "slate" },
    ],
  },
  {
    day: "Wed",
    items: [
      { title: "Trend Radar", time: "8:30 AM", tone: "orange" },
      { title: "Morning Kickoff", time: "8:45 AM", tone: "slate" },
      { title: "YouTube OpenClaw Recap", time: "7:30 AM", tone: "red" },
      { title: "Scout Morning Research", time: "8:00 AM", tone: "green" },
      { title: "Morning Brief", time: "9:00 AM", tone: "amber" },
      { title: "Trend Radar Daily Digest", time: "9:30 AM", tone: "slate" },
      { title: "Quill Script Writer", time: "5:30 AM", tone: "blue" },
      { title: "Daily Digest", time: "9:00 AM", tone: "purple" },
      { title: "Evening Wrap Up", time: "6:00 PM", tone: "slate" },
      { title: "Weekly Newsletter Draft", time: "5:00 PM", tone: "purple" },
    ],
  },
  {
    day: "Thu",
    items: [
      { title: "Trend Radar", time: "8:30 AM", tone: "orange" },
      { title: "Morning Kickoff", time: "8:45 AM", tone: "slate" },
      { title: "YouTube OpenClaw Recap", time: "7:30 AM", tone: "red" },
      { title: "Scout Morning Research", time: "8:00 AM", tone: "green" },
      { title: "Morning Brief", time: "9:00 AM", tone: "amber" },
      { title: "Trend Radar Daily Digest", time: "9:30 AM", tone: "slate" },
      { title: "Quill Script Writer", time: "5:30 AM", tone: "blue" },
      { title: "Daily Digest", time: "9:00 AM", tone: "purple" },
      { title: "Evening Wrap Up", time: "6:00 PM", tone: "slate" },
    ],
  },
  {
    day: "Fri",
    items: [
      { title: "Trend Radar", time: "8:30 AM", tone: "orange" },
      { title: "Morning Kickoff", time: "8:45 AM", tone: "slate" },
      { title: "YouTube OpenClaw Recap", time: "7:30 AM", tone: "red" },
      { title: "Scout Morning Research", time: "8:00 AM", tone: "green" },
      { title: "Morning Brief", time: "9:00 AM", tone: "amber" },
      { title: "Trend Radar Daily Digest", time: "9:30 AM", tone: "slate" },
      { title: "Quill Script Writer", time: "5:30 AM", tone: "blue" },
      { title: "Daily Digest", time: "9:00 AM", tone: "purple" },
      { title: "Evening Wrap Up", time: "6:00 PM", tone: "slate" },
    ],
  },
  {
    day: "Sat",
    items: [
      { title: "Trend Radar", time: "8:30 AM", tone: "orange" },
      { title: "Morning Kickoff", time: "8:45 AM", tone: "slate" },
      { title: "YouTube OpenClaw Recap", time: "7:30 AM", tone: "red" },
      { title: "Scout Morning Research", time: "8:00 AM", tone: "green" },
      { title: "Morning Brief", time: "9:00 AM", tone: "amber" },
      { title: "Trend Radar Daily Digest", time: "9:30 AM", tone: "slate" },
      { title: "Quill Script Writer", time: "5:30 AM", tone: "blue" },
      { title: "Daily Digest", time: "9:00 AM", tone: "purple" },
      { title: "Evening Wrap Up", time: "6:00 PM", tone: "slate" },
    ],
  },
];

function toneClass(tone: ScheduledTask["tone"] | StatChip["tone"]) {
  switch (tone) {
    case "orange":
    case "amber":
      return styles.toneOrange;
    case "red":
      return styles.toneRed;
    case "green":
      return styles.toneGreen;
    case "slate":
      return styles.toneSlate;
    case "blue":
      return styles.toneBlue;
    case "purple":
      return styles.tonePurple;
  }
}

export default function CalendarPage() {
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
              <h1>Scheduled Tasks</h1>
              <p>Henry&apos;s automated routines</p>
            </div>
            <div className={shell.calendarToggles}>
              <button className={shell.toggleActive}>Week</button>
              <button className={shell.toggle}>Today</button>
              <button className={shell.iconButton}>⟳</button>
            </div>
          </div>

          <div className={styles.alwaysRunningBox}>
            <div className={styles.alwaysHeader}>⚡ Always Running</div>
            <div className={styles.chipRow}>
              {alwaysRunning.map((chip) => (
                <span key={chip.label} className={`${styles.chip} ${toneClass(chip.tone)}`}>
                  {chip.label}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.weekGrid}>
            {week.map((day) => (
              <section
                key={day.day}
                className={`${styles.dayColumn} ${day.active ? styles.dayColumnActive : ""}`}
              >
                <div className={styles.dayHeader}>{day.day}</div>
                <div className={styles.dayStack}>
                  {day.items.map((item, index) => (
                    <article
                      key={`${day.day}-${item.title}-${index}`}
                      className={`${styles.taskCard} ${toneClass(item.tone)}`}
                    >
                      <strong>{item.title}</strong>
                      <span>{item.time}</span>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

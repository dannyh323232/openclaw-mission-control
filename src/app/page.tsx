import Link from "next/link";
import { AppChrome } from "./chrome";
import styles from "./page.module.css";

const views = [
  ["Tasks", "/tasks", "Kanban queues, escalation lanes, and operator pacing."],
  ["Calendar", "/calendar", "Weekly cadence board with real-looking scheduled load."],
  ["Projects", "/projects", "Delivery cards with progress, health, and metadata."],
  ["Memory", "/memory", "Split-pane journal and long-term notes workspace."],
  ["Team", "/team", "Org structure, workloads, and specialist roles."],
  ["Office", "/office", "Stylised control-room floor plan and live desk activity."],
] as const;

export default function Home() {
  return (
    <AppChrome active="projects" title="Mission Control" description="Static showcase shell for the redesigned dark operations UI.">
      <div className={styles.grid}>
        {views.map(([label, href, copy]) => (
          <Link key={label} href={href} className={styles.card}>
            <span className={styles.kicker}>Open view</span>
            <strong>{label}</strong>
            <p>{copy}</p>
          </Link>
        ))}
      </div>
    </AppChrome>
  );
}

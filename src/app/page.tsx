import Link from "next/link";
import { AppChrome } from "./chrome";
import styles from "./page.module.css";
import { getMissionControlData } from "@/lib/store";

const views = [
  ["Tasks", "/tasks", "Persisted task board with lane moves and create/delete flows."],
  ["Calendar", "/calendar", "Shared scheduled load with add/remove blocks."],
  ["Projects", "/projects", "Portfolio cards backed by live local data."],
  ["Approvals", "/approvals", "CEO exception queue with approve/reject actions."],
  ["Memory", "/memory", "Long-term notes plus dated operating memory."],
  ["Team", "/team", "Agent roster loaded from the shared model."],
  ["Office", "/office", "Stylised floor plan still acting as the visual mock view."],
] as const;

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getMissionControlData();

  return (
    <AppChrome active="projects" title="Mission Control" description="Usable local MVP with shared persisted state, CRUD for core workflow objects, and a polished dark shell.">
      <div className={styles.grid}>
        {views.map(([label, href, copy]) => (
          <Link key={label} href={href} className={styles.card}>
            <span className={styles.kicker}>Open view</span>
            <strong>{label}</strong>
            <p>{copy}</p>
            <small>{label === "Office" ? "Visual-only" : `${data.tasks.length} tasks / ${data.projects.length} projects shared`}</small>
          </Link>
        ))}
      </div>
    </AppChrome>
  );
}

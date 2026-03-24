import { AppChrome } from "../chrome";
import styles from "./page.module.css";
import { getMissionControlData } from "@/lib/store";

export const dynamic = "force-dynamic";

const toneByStatus = {
  busy: "purple",
  online: "green",
  idle: "slate",
} as const;

export default async function TeamPage() {
  const data = await getMissionControlData();

  return (
    <AppChrome
      active="team"
      title="Team"
      description="Agent roster now comes from shared persisted data, so team load and status are no longer page-local mocks."
      controls={<><button>Org chart</button><button>{data.agents.filter((agent) => agent.status === "busy").length} busy</button></>}
    >
      <div className={styles.hero}>
        <div>
          <span>Autonomous org</span>
          <strong>{data.agents.length} agents across command, systems, signal, output, and assurance.</strong>
        </div>
        <div className={styles.heroStats}>
          <div><small>Online</small><strong>{data.agents.filter((agent) => agent.status !== "idle").length}</strong></div>
          <div><small>Busy now</small><strong>{data.agents.filter((agent) => agent.status === "busy").length}</strong></div>
          <div><small>Avg load</small><strong>{Math.round(data.agents.reduce((sum, agent) => sum + agent.load, 0) / Math.max(data.agents.length, 1))}%</strong></div>
        </div>
      </div>

      <div className={styles.grid}>
        {data.agents.map((member) => (
          <article key={member.id} className={styles.card}>
            <div className={styles.topRow}>
              <div className={`${styles.avatar} ${styles[toneByStatus[member.status]]}`}>{member.name[0]}</div>
              <div className={styles.loadPill}>{member.load}%</div>
            </div>
            <h2>{member.name}</h2>
            <h3>{member.role}</h3>
            <p>{member.summary}</p>
            <div className={styles.footer}>
              <span>{member.lane}</span>
              <strong>{member.status}</strong>
            </div>
          </article>
        ))}
      </div>
    </AppChrome>
  );
}

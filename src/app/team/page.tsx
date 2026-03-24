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
  const avgLoad = Math.round(data.agents.reduce((sum, agent) => sum + agent.load, 0) / Math.max(data.agents.length, 1));

  return (
    <AppChrome
      active="team"
      title="Team"
      description="Team is now structured around role, status, lane, and workload so it reads like a capacity view rather than a gallery of avatars."
      controls={
        <>
          <button>{data.agents.filter((agent) => agent.status === "busy").length} busy now</button>
          <button>{avgLoad}% average load</button>
        </>
      }
    >
      <div className={styles.hero}>
        <div>
          <span>Capacity overview</span>
          <strong>{data.agents.length} agents across command, systems, signal, output, build, and assurance.</strong>
          <p>Use this page to see ownership and workload balance. If a role is overloaded, it should be obvious here before it becomes a hidden delivery problem.</p>
        </div>
        <div className={styles.heroStats}>
          <div><small>Online</small><strong>{data.agents.filter((agent) => agent.status !== "idle").length}</strong></div>
          <div><small>Busy now</small><strong>{data.agents.filter((agent) => agent.status === "busy").length}</strong></div>
          <div><small>Avg load</small><strong>{avgLoad}%</strong></div>
        </div>
      </div>

      <div className={styles.tableHeader}>
        <span>Name</span>
        <span>Role</span>
        <span>Lane</span>
        <span>Status</span>
        <span>Load</span>
        <span>What they are for</span>
      </div>

      <div className={styles.list}>
        {data.agents.map((member) => (
          <article key={member.id} className={styles.rowCard}>
            <div className={styles.nameCell}>
              <div className={`${styles.avatar} ${styles[toneByStatus[member.status]]}`}>{member.name[0]}</div>
              <div>
                <strong>{member.name}</strong>
                <small>{member.id}</small>
              </div>
            </div>
            <div className={styles.metaCell}><strong>{member.role}</strong></div>
            <div className={styles.metaCell}><strong>{member.lane}</strong></div>
            <div className={styles.metaCell}><span className={`${styles.statusPill} ${styles[toneByStatus[member.status]]}`}>{member.status}</span></div>
            <div className={styles.loadCell}>
              <div className={styles.loadBar}><span style={{ width: `${member.load}%` }} /></div>
              <strong>{member.load}%</strong>
            </div>
            <div className={styles.summaryCell}><p>{member.summary}</p></div>
          </article>
        ))}
      </div>
    </AppChrome>
  );
}

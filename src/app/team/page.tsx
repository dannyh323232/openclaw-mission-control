import { AppChrome } from "../chrome";
import styles from "./page.module.css";

type Member = { name: string; role: string; lane: string; load: string; summary: string; tone: "purple" | "blue" | "green" | "amber" | "pink" | "slate" };

const members: Member[] = [
  { name: "Henry", role: "Chief of Staff", lane: "Command", load: "94%", summary: "Routes work, shields the CEO from noise, and decides what actually deserves escalation.", tone: "purple" },
  { name: "Charlie", role: "Infrastructure", lane: "Systems", load: "88%", summary: "Owns automations, event routing, and the plumbing that keeps the organisation reliable.", tone: "blue" },
  { name: "Scout", role: "Trend Analyst", lane: "Signal", load: "71%", summary: "Scans fast for hooks, angles, and market movement before the rest of the stack sees it.", tone: "green" },
  { name: "Quill", role: "Writer", lane: "Output", load: "76%", summary: "Turns raw direction into hooks, scripts, captions, and persuasive content assets.", tone: "purple" },
  { name: "Pixel", role: "Visual Design", lane: "Output", load: "63%", summary: "Builds thumbnails, visual systems, and attention-first packaging for creative delivery.", tone: "pink" },
  { name: "Ralph", role: "QA / Foreman", lane: "Assurance", load: "57%", summary: "Checks the work, spots weak joins, and keeps quality from slipping at the handoff point.", tone: "amber" },
];

export default function TeamPage() {
  return (
    <AppChrome
      active="team"
      title="Team"
      description="An org view with a clearer command structure, workload cues, and more believable role framing."
      controls={<><button>Org chart</button><button>Capacity</button></>}
    >
      <div className={styles.hero}>
        <div>
          <span>Autonomous org</span>
          <strong>9 agents across command, systems, signal, output, and assurance.</strong>
        </div>
        <div className={styles.heroStats}>
          <div><small>Online</small><strong>9</strong></div>
          <div><small>Busy now</small><strong>6</strong></div>
          <div><small>Load</small><strong>78%</strong></div>
        </div>
      </div>

      <div className={styles.grid}>
        {members.map((member) => (
          <article key={member.name} className={styles.card}>
            <div className={styles.topRow}>
              <div className={`${styles.avatar} ${styles[member.tone]}`}>{member.name[0]}</div>
              <div className={styles.loadPill}>{member.load}</div>
            </div>
            <h2>{member.name}</h2>
            <h3>{member.role}</h3>
            <p>{member.summary}</p>
            <div className={styles.footer}>
              <span>{member.lane}</span>
              <strong>{member.load} utilised</strong>
            </div>
          </article>
        ))}
      </div>
    </AppChrome>
  );
}

import { AppChrome } from "../chrome";
import styles from "./page.module.css";

type Desk = { name: string; x: string; y: string; tone: "purple" | "blue" | "green" | "amber" | "pink"; status: string };

const desks: Desk[] = [
  { name: "Henry", x: "50%", y: "15%", tone: "blue", status: "Routing approvals" },
  { name: "Scout", x: "20%", y: "36%", tone: "green", status: "Trend scan" },
  { name: "Quill", x: "35%", y: "38%", tone: "purple", status: "Writing" },
  { name: "Charlie", x: "63%", y: "38%", tone: "amber", status: "Infra checks" },
  { name: "Codex", x: "78%", y: "36%", tone: "amber", status: "Building" },
  { name: "Pixel", x: "30%", y: "70%", tone: "pink", status: "Asset pass" },
  { name: "Ralph", x: "50%", y: "72%", tone: "amber", status: "QA watch" },
  { name: "Echo", x: "70%", y: "70%", tone: "green", status: "Distribution" },
];

export default function OfficePage() {
  return (
    <AppChrome
      active="office"
      title="Office"
      description="A stylised control-room floor plan with clearer desk zoning, live presence, and more deliberate visual structure."
      controls={<><button>All working</button><button>Gather</button></>}
    >
      <div className={styles.layout}>
        <section className={styles.floor}>
          <div className={styles.commandRing}>Command table</div>
          <div className={`${styles.zone} ${styles.zoneTop}`}>Leadership</div>
          <div className={`${styles.zone} ${styles.zoneLeft}`}>Signal + content</div>
          <div className={`${styles.zone} ${styles.zoneRight}`}>Systems + build</div>
          <div className={`${styles.zone} ${styles.zoneBottom}`}>QA + distribution</div>
          {desks.map((desk) => (
            <div key={desk.name} className={styles.desk} style={{ left: desk.x, top: desk.y }}>
              <div className={`${styles.bot} ${styles[desk.tone]}`}>{desk.name[0]}</div>
              <strong>{desk.name}</strong>
              <span>{desk.status}</span>
            </div>
          ))}
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.liveCard}>
            <small>Live status</small>
            <strong>6 desks active · 2 idle</strong>
            <p>No collisions in the queue. Command table is clear for the next council block.</p>
          </div>
          <div className={styles.activityCard}>
            <small>Recent movement</small>
            <ul>
              <li>Codex pushed a new UI pass to the console lane.</li>
              <li>Henry queued one approval for CEO review.</li>
              <li>Scout opened two new opportunity briefs.</li>
            </ul>
          </div>
        </aside>
      </div>
    </AppChrome>
  );
}

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
      description="This remains the visual overview surface. It is useful for atmosphere and presence, but the real workflow still lives in Overview, Tasks, Calendar, Projects, and Approvals."
      controls={<><button>Visual overview</button><button>Not the main workflow</button></>}
    >
      <div className={styles.noticeCard}>
        <span className={styles.sectionKicker}>What this page is for</span>
        <strong>A visual presence map of the team floor, not the primary operating surface.</strong>
        <p>Use this when you want a quick sense of who is where. Use the Team, Tasks, and Calendar pages when you need to make actual decisions or move work.</p>
      </div>

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
            <p>The room is healthy. Nothing here replaces the structured workflow pages — it just gives you a visual read on the floor.</p>
          </div>
          <div className={styles.activityCard}>
            <small>When to leave this page</small>
            <ul>
              <li>Go to <strong>Tasks</strong> to move work between lanes.</li>
              <li>Go to <strong>Calendar</strong> to manage time and daily focus.</li>
              <li>Go to <strong>Team</strong> to inspect workload and responsibilities.</li>
            </ul>
          </div>
        </aside>
      </div>
    </AppChrome>
  );
}

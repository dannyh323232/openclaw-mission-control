import { AppChrome } from "../chrome";
import styles from "./page.module.css";

type Lane = "Now" | "Queued" | "Building" | "Review";

type Task = {
  title: string;
  detail: string;
  owner: string;
  project: string;
  eta: string;
  lane: Lane;
  tone: "purple" | "blue" | "amber" | "green";
};

const tasks: Task[] = [
  { title: "CEO exception digest", detail: "Reduce noise to approvals, blockers, and high-risk asks.", owner: "Henry", project: "Ops", eta: "09:20", lane: "Now", tone: "purple" },
  { title: "Homepage conversion retune", detail: "Tighten the hero → consultation CTA flow and lower friction.", owner: "Web", project: "Refined", eta: "10:40", lane: "Queued", tone: "amber" },
  { title: "Mission Control visual rebuild", detail: "Premium shell, denser hierarchy, stronger realism across all views.", owner: "Codex", project: "Console", eta: "Today", lane: "Building", tone: "blue" },
  { title: "Relay event model", detail: "Shared event schema for Discord, Telegram, and cron-driven actions.", owner: "Charlie", project: "Systems", eta: "14:10", lane: "Building", tone: "green" },
  { title: "Weekly agent staffing", detail: "Rebalance shift windows around research, content, and delivery demand.", owner: "Manager", project: "Org", eta: "16:00", lane: "Review", tone: "purple" },
  { title: "Clinic social capture list", detail: "Translate campaign plan into realistic shoot tasks for Rachel.", owner: "Scout", project: "Content", eta: "11:30", lane: "Queued", tone: "green" },
  { title: "Deploy-path verification", detail: "Confirm the real publish route so SEO changes stop shipping blind.", owner: "Ops", project: "Infra", eta: "Blocked", lane: "Now", tone: "amber" },
  { title: "Daily recap template", detail: "Sharper evening wrap with wins, misses, and tomorrow’s carry-over.", owner: "Quill", project: "Comms", eta: "17:45", lane: "Review", tone: "purple" },
];

const lanes: Lane[] = ["Now", "Queued", "Building", "Review"];

export default function TasksPage() {
  return (
    <AppChrome
      active="tasks"
      title="Tasks"
      description="Live execution lanes with clearer urgency, ownership, and delivery pacing."
      controls={<><button>Filters</button><button>Sort: urgency</button></>}
    >
      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}><span>Open items</span><strong>28</strong><small>6 due this morning</small></div>
        <div className={styles.summaryCard}><span>Active builders</span><strong>09</strong><small>2 shipping now</small></div>
        <div className={styles.summaryCard}><span>Escalations</span><strong>03</strong><small>1 waiting on Daniel</small></div>
        <div className={styles.summaryCard}><span>Throughput</span><strong>81%</strong><small>Above weekly baseline</small></div>
      </div>

      <div className={styles.board}>
        {lanes.map((lane) => (
          <section key={lane} className={styles.column}>
            <div className={styles.columnHeader}>
              <div>
                <strong>{lane}</strong>
                <span>{tasks.filter((task) => task.lane === lane).length} cards</span>
              </div>
              <b>{lane === "Now" ? "Hot" : lane === "Building" ? "Live" : "Stable"}</b>
            </div>
            <div className={styles.stack}>
              {tasks.filter((task) => task.lane === lane).map((task) => (
                <article key={task.title} className={`${styles.card} ${styles[task.tone]}`}>
                  <div className={styles.cardMeta}><span>{task.owner}</span><span>{task.eta}</span></div>
                  <h2>{task.title}</h2>
                  <p>{task.detail}</p>
                  <div className={styles.footer}><strong>{task.project}</strong><small>Priority queue</small></div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppChrome>
  );
}

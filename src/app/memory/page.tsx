import { AppChrome } from "../chrome";
import styles from "./page.module.css";

const journal = [
  "Mon · Mar 18",
  "Sun · Mar 17",
  "Sat · Mar 16",
  "Fri · Mar 15",
  "Thu · Mar 14",
  "Wed · Mar 13",
  "Tue · Mar 12",
];

export default function MemoryPage() {
  return (
    <AppChrome
      active="memory"
      title="Memory"
      description="A proper notes and journal split view with stronger structure, depth, and reading comfort."
      controls={<><button>Journal</button><button>Long-term</button></>}
    >
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.featured}>
            <span>Long-term memory</span>
            <strong>Operating assumptions, project state, and recurring lessons</strong>
            <small>Last distilled 22 hours ago</small>
          </div>

          <div className={styles.sectionLabel}>Daily journal</div>
          <div className={styles.entryList}>
            {journal.map((entry, index) => (
              <button key={entry} className={`${styles.entry} ${index === 4 ? styles.entryActive : ""}`}>
                <strong>{entry}</strong>
                <span>{index === 4 ? "Selected note" : "Review log"}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className={styles.document}>
          <div className={styles.docHeader}>
            <div>
              <small>Thursday archive</small>
              <h2>2026-03-14 — Thursday</h2>
            </div>
            <span>4.8 KB · 778 words</span>
          </div>

          <div className={styles.docBody}>
            <h3>09:00 — Research stack review</h3>
            <p>
              The main takeaway was that visibility keeps beating aesthetics. Every useful system change was the one that made actions, blockers, and ownership more obvious at a glance.
            </p>
            <ul>
              <li>Medium-tier local models are now viable for serious background throughput.</li>
              <li>Replacing weak fallbacks matters more than endlessly tweaking the best primary model.</li>
              <li>Operator trust goes up when the system shows what changed, not just that work happened.</li>
            </ul>

            <h3>13:40 — Mission Control direction</h3>
            <p>
              The dashboard should feel dense, composed, and a bit premium — less prototype, more internal tool that a real team would use daily. Calendar, projects, memory, team, and office all need distinct personalities under one shell.
            </p>

            <blockquote>
              Workflow visibility beats aesthetics — but the aesthetics still need to communicate confidence.
            </blockquote>

            <h3>Decision</h3>
            <p>
              Move forward with a tighter dark UI, stronger card realism, and static-but-believable layouts before any backend work.
            </p>
          </div>
        </section>
      </div>
    </AppChrome>
  );
}

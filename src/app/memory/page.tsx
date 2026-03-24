import { AppChrome } from "../chrome";
import styles from "./page.module.css";
import { getMissionControlData } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function MemoryPage() {
  const data = await getMissionControlData();
  const selected = data.memoryEntries[0];

  return (
    <AppChrome
      active="memory"
      title="Memory"
      description="Memory now reads from the shared persisted model: long-term notes, dated entries, and operating context."
      controls={<><button>Journal</button><button>{data.memoryEntries.length} entries</button></>}
    >
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.featured}>
            <span>Long-term memory</span>
            <strong>Operating assumptions, project state, and recurring lessons</strong>
            <small>{data.longTermNotes.length} standing notes</small>
            <ul className={styles.noteList}>
              {data.longTermNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </div>

          <div className={styles.sectionLabel}>Daily journal</div>
          <div className={styles.entryList}>
            {data.memoryEntries.map((entry, index) => (
              <div key={entry.id} className={`${styles.entry} ${index === 0 ? styles.entryActive : ""}`}>
                <strong>{entry.title}</strong>
                <span>{entry.summary}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className={styles.document}>
          <div className={styles.docHeader}>
            <div>
              <small>Latest memory entry</small>
              <h2>{selected.title}</h2>
            </div>
            <span>{selected.tags.join(" · ")}</span>
          </div>

          <div className={styles.docBody}>
            {selected.content.map((paragraph, index) => (
              <p key={`${selected.id}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </section>
      </div>
    </AppChrome>
  );
}

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
      description="Memory is now framed as a working reference: long-term assumptions on the left, current journal selection in the middle, and the selected entry clearly expanded."
      controls={
        <>
          <button>{data.longTermNotes.length} standing notes</button>
          <button>{data.memoryEntries.length} journal entries</button>
        </>
      }
    >
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.featured}>
            <span>Long-term memory</span>
            <strong>Keep durable assumptions, recurring lessons, and operating rules here.</strong>
            <small>{data.longTermNotes.length} standing notes</small>
            <ul className={styles.noteList}>
              {data.longTermNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </div>

          <div className={styles.sectionLabel}>Journal index</div>
          <p className={styles.helperText}>The first entry is treated as the active selection in this MVP so the page reads like a proper two-pane reference surface.</p>
          <div className={styles.entryList}>
            {data.memoryEntries.map((entry, index) => (
              <div key={entry.id} className={`${styles.entry} ${index === 0 ? styles.entryActive : ""}`}>
                <small>{entry.date}</small>
                <strong>{entry.title}</strong>
                <span>{entry.summary}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className={styles.document}>
          <div className={styles.docHeader}>
            <div>
              <small>Selected journal entry</small>
              <h2>{selected.title}</h2>
              <p>{selected.summary}</p>
            </div>
            <div className={styles.tagCluster}>
              {selected.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
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

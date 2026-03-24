import Link from "next/link";
import shell from "../shared-shell.module.css";
import styles from "./page.module.css";

type NavItem = { label: string; href: string; active?: boolean };
type MemoryEntry = {
  date: string;
  meta: string;
  active?: boolean;
};

const navItems: NavItem[] = [
  { label: "Tasks", href: "/tasks" },
  { label: "Agents", href: "/agents" },
  { label: "Content", href: "/content" },
  { label: "Approvals", href: "/approvals" },
  { label: "Council", href: "/council" },
  { label: "Calendar", href: "/calendar" },
  { label: "Projects", href: "/projects" },
  { label: "Memory", href: "/memory", active: true },
  { label: "Docs", href: "/docs" },
  { label: "People", href: "/people" },
  { label: "Office", href: "/office" },
  { label: "Team", href: "/team" },
  { label: "System", href: "/system" },
  { label: "Radar", href: "/radar" },
  { label: "Factory", href: "/factory" },
  { label: "Pipeline", href: "/pipeline" },
  { label: "Feedback", href: "/feedback" },
];

const entries: MemoryEntry[] = [
  { date: "Mon, Mar 2", meta: "1.1 KB • 254 words" },
  { date: "Sun, Mar 1", meta: "5.8 KB • 801 words" },
  { date: "Sat, Feb 28", meta: "12.6 KB • 1,900 words" },
  { date: "Fri, Feb 27", meta: "6.0 KB • 618 words" },
  { date: "Thu, Feb 26", meta: "11.9 KB • 778 words", active: true },
  { date: "Wed, Feb 25", meta: "3.3 KB • 422 words" },
  { date: "Tue, Feb 24", meta: "7.2 KB • 1,063 words" },
];

export default function MemoryPage() {
  return (
    <main className={shell.shell}>
      <aside className={shell.sidebar}>
        <div className={shell.brand}>
          <div className={shell.brandMark}>⌘</div>
          <span>Mission Control</span>
        </div>
        <nav className={shell.nav}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={`${shell.navItem} ${item.active ? shell.navItemActive : ""}`}>
              <span className={shell.navIcon}>◻</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className={shell.sidebarFoot}>
          <div className={shell.avatar}>N</div>
        </div>
      </aside>

      <section className={shell.main}>
        <header className={shell.topbar}>
          <div className={shell.search}>⌕ Search memory...</div>
          <div className={shell.topActions}>
            <button className={shell.ghostButton}>Pause</button>
            <button className={shell.ghostButton}>Ping Henry</button>
            <span className={shell.topIcon}>◌</span>
            <span className={shell.topIcon}>◔</span>
          </div>
        </header>

        <section className={shell.panel}>
          <div className={styles.memoryLayout}>
            <aside className={styles.memorySidebar}>
              <div className={styles.memoryCard}>
                <div className={styles.memoryCardTop}>
                  <div className={styles.memoryIcon}>◔</div>
                  <div>
                    <strong>Long-Term Memory ✨</strong>
                    <p>Core work • updated about 22 hours ago</p>
                  </div>
                </div>
              </div>

              <div className={styles.groupLabel}>DAILY JOURNAL</div>
              <div className={styles.subLabel}>Yesterday</div>

              <div className={styles.entryList}>
                {entries.map((entry) => (
                  <div key={entry.date} className={`${styles.entryItem} ${entry.active ? styles.entryItemActive : ""}`}>
                    <strong>{entry.date}</strong>
                    <span>{entry.meta}</span>
                  </div>
                ))}
              </div>
            </aside>

            <article className={styles.documentPane}>
              <div className={styles.documentMeta}>Modified 4 days ago</div>
              <div className={styles.documentCard}>
                <div className={styles.documentHeader}>
                  <div className={styles.docIcon}>🗓</div>
                  <div>
                    <strong>2026-02-26 — Thursday</strong>
                    <p>Thursday, February 26, 2026 • 4.8 KB • 778 words</p>
                  </div>
                </div>
              </div>

              <div className={styles.documentBody}>
                <h1>2026-02-26 — Thursday</h1>

                <h2>9:00 AM — Qwen 3.5 Medium Series Research</h2>
                <p>
                  <strong>What we discussed:</strong> Alex shared the Qwen 3.5 Medium announcement thread.
                  The team reviewed the new medium-tier models and how they might fit into the local stack.
                </p>

                <p><strong>Key findings:</strong></p>
                <ul>
                  <li>35B-A3B appears extremely efficient for its class.</li>
                  <li>Dense variants beat the old benchmark expectations in several scenarios.</li>
                  <li>All models ship in multiple quant formats for practical local deployment.</li>
                  <li>35B-A3B at 4-bit is plausible as a serious Studio workstation candidate.</li>
                </ul>

                <p><strong>Recommendations given:</strong></p>
                <ol>
                  <li>Keep the strongest current setup as primary until proven otherwise.</li>
                  <li>Add a fast parallel worker model for research / ops throughput.</li>
                  <li>Test a medium-tier upgrade path for Charlie if speed gains justify it.</li>
                  <li>Replace weaker local fallback models where quality-to-speed is better.</li>
                </ol>

                <p><strong>Decision:</strong> Pending — Alex hasn&apos;t decided yet.</p>

                <h2>Overnight — Reborn Factory Results</h2>
                <p>
                  The overnight pass confirmed the bigger lesson again: workflow visibility beats aesthetics.
                  The system is only useful if you can see what happened, what changed, and what needs action.
                </p>
              </div>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}

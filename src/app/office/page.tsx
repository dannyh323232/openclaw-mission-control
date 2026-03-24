import Link from "next/link";
import shell from "../shared-shell.module.css";
import styles from "./page.module.css";

type NavItem = { label: string; href: string; active?: boolean };
type Agent = {
  name: string;
  x: string;
  y: string;
  color: string;
  status?: string;
};

const navItems: NavItem[] = [
  { label: "Tasks", href: "/tasks" },
  { label: "Agents", href: "/agents" },
  { label: "Content", href: "/content" },
  { label: "Approvals", href: "/approvals" },
  { label: "Council", href: "/council" },
  { label: "Calendar", href: "/calendar" },
  { label: "Projects", href: "/projects" },
  { label: "Memory", href: "/memory" },
  { label: "Docs", href: "/docs" },
  { label: "People", href: "/people" },
  { label: "Office", href: "/office", active: true },
  { label: "Team", href: "/team" },
  { label: "System", href: "/system" },
  { label: "Radar", href: "/radar" },
  { label: "Factory", href: "/factory" },
  { label: "Pipeline", href: "/pipeline" },
  { label: "Feedback", href: "/feedback" },
];

const agents: Agent[] = [
  { name: "Alex", x: "15%", y: "22%", color: "#8b5cf6" },
  { name: "Henry", x: "52%", y: "7%", color: "#3b82f6", status: "Build Council - Social" },
  { name: "Quill", x: "18%", y: "48%", color: "#8b5cf6" },
  { name: "Echo", x: "33%", y: "50%", color: "#06b6d4" },
  { name: "Scout", x: "49%", y: "48%", color: "#22c55e" },
  { name: "Violet", x: "42%", y: "50%", color: "#a855f7" },
  { name: "Codex", x: "60%", y: "47%", color: "#f97316" },
  { name: "Charlie", x: "42%", y: "65%", color: "#f59e0b" },
  { name: "Pixel", x: "76%", y: "72%", color: "#ec4899" },
];

const cards = ["Alex", "Henry", "Scout", "Quill", "Pixel", "Echo", "Codex", "Charlie", "Violet", "Ralph"];

export default function OfficePage() {
  return (
    <main className={shell.shell}>
      <aside className={shell.sidebar}>
        <div className={shell.brand}><div className={shell.brandMark}>⌘</div><span>Mission Control</span></div>
        <nav className={shell.nav}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={`${shell.navItem} ${item.active ? shell.navItemActive : ""}`}>
              <span className={shell.navIcon}>◻</span><span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className={shell.sidebarFoot}><div className={shell.avatar}>N</div></div>
      </aside>

      <section className={shell.main}>
        <header className={shell.topbar}>
          <div className={shell.search}>⌕ Search</div>
          <div className={shell.topActions}>
            <button className={shell.ghostButton}>Pause</button>
            <button className={shell.ghostButton}>Ping Henry</button>
            <span className={shell.topIcon}>◌</span><span className={shell.topIcon}>◔</span>
          </div>
        </header>

        <section className={shell.panel}>
          <div className={styles.controlBar}>
            <span className={styles.demoControls}>✦ Demo Controls</span>
            <div className={styles.controlButtons}>
              <button className={styles.workButton}>All Working</button>
              <button className={styles.gatherButton}>Gather</button>
              <button className={styles.meetingButton}>Run Meeting</button>
              <button className={styles.waterButton}>Watercooler</button>
            </div>
          </div>

          <div className={styles.officeLayout}>
            <div className={styles.officeBoard}>
              <button className={styles.startChat}>+ Start Chat</button>
              <div className={styles.room}>
                <div className={styles.roundTable} />
                <div className={styles.door} />
                <div className={styles.plantLeft} />
                <div className={styles.plantRight} />
                {[8, 24, 40, 56, 72].map((left) => (
                  <div key={left} className={styles.desk} style={{ left: `${left}%`, top: left === 56 ? "12%" : left > 56 ? "58%" : "20%" }} />
                ))}
                {agents.map((agent) => (
                  <div key={agent.name} className={styles.agent} style={{ left: agent.x, top: agent.y }}>
                    <div className={styles.agentBot} style={{ background: agent.color }} />
                    {agent.status ? <div className={styles.speech}>{agent.status}</div> : null}
                    <span>{agent.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className={styles.livePanel}>
              <div className={styles.liveHeader}>Live Activity</div>
              <div className={styles.noActivity}>No recent activity</div>
            </aside>
          </div>

          <div className={styles.agentDock}>
            {cards.map((card) => (
              <div key={card} className={styles.agentCard}>
                <strong>{card}</strong>
                <span>{card === "Henry" ? "Build Council - Social" : "idle"}</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

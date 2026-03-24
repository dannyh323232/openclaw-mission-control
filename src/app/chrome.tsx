import Link from "next/link";
import shell from "./shared-shell.module.css";

export type NavKey = "home" | "tasks" | "calendar" | "projects" | "approvals" | "memory" | "team" | "office";

type ChromeProps = {
  active: NavKey;
  title: string;
  description: string;
  controls?: React.ReactNode;
  children: React.ReactNode;
};

type NavGroup = {
  label: string;
  items: { key: NavKey; label: string; href: string; icon: string; hint: string }[];
};

const navGroups: NavGroup[] = [
  {
    label: "Command",
    items: [
      { key: "home", label: "Overview", href: "/", icon: "◉", hint: "What needs attention next" },
      { key: "approvals", label: "Approvals", href: "/approvals", icon: "◈", hint: "CEO exception queue" },
    ],
  },
  {
    label: "Workflows",
    items: [
      { key: "tasks", label: "Tasks", href: "/tasks", icon: "◎", hint: "Execution board + handoffs" },
      { key: "calendar", label: "Calendar", href: "/calendar", icon: "◫", hint: "Schedules + today focus" },
      { key: "projects", label: "Projects", href: "/projects", icon: "◩", hint: "Portfolio health + delivery" },
    ],
  },
  {
    label: "Reference",
    items: [
      { key: "memory", label: "Memory", href: "/memory", icon: "◌", hint: "Journal + operating notes" },
      { key: "team", label: "Team", href: "/team", icon: "◍", hint: "Capacity + ownership" },
      { key: "office", label: "Office", href: "/office", icon: "▦", hint: "Visual floor overview" },
    ],
  },
];

export function AppChrome({ active, title, description, controls, children }: ChromeProps) {
  return (
    <main className={shell.shell}>
      <aside className={shell.sidebar}>
        <div className={shell.brandBlock}>
          <div className={shell.brandMark}>MC</div>
          <div>
            <strong>Mission Control</strong>
            <span>Operations cockpit</span>
          </div>
        </div>

        <div className={shell.missionCard}>
          <span className={shell.sidebarSectionLabel}>Current posture</span>
          <strong>Run the day from one place</strong>
          <p>Use Overview to orient, Tasks to move work, Calendar to shape time, and Approvals only when Daniel needs to decide.</p>
        </div>

        {navGroups.map((group) => (
          <div key={group.label} className={shell.navGroup}>
            <div className={shell.sidebarSectionLabel}>{group.label}</div>
            <nav className={shell.nav}>
              {group.items.map((item) => {
                const isActive = item.key === active;
                return (
                  <Link key={item.key} href={item.href} className={`${shell.navItem} ${isActive ? shell.navItemActive : ""}`}>
                    <span className={shell.navIcon}>{item.icon}</span>
                    <span className={shell.navCopy}>
                      <strong>{item.label}</strong>
                      <small>{item.hint}</small>
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}

        <div className={shell.sidebarSectionLabel}>System</div>
        <div className={shell.sidebarCard}>
          <div>
            <strong>Control loop</strong>
            <span>Plan → execute → review → escalate</span>
          </div>
          <b>Live</b>
        </div>

        <div className={shell.sidebarCardMuted}>
          <span>CEO mode</span>
          <strong>Exceptions only</strong>
        </div>

        <div className={shell.sidebarFoot}>
          <div className={shell.operatorBadge}>D</div>
          <div>
            <strong>Daniel</strong>
            <span>Commander · London</span>
          </div>
        </div>
      </aside>

      <section className={shell.main}>
        <header className={shell.topbar}>
          <div className={shell.searchWrap}>
            <span>⌕</span>
            <div className={shell.search}>Mission Control is a shared operating view — pick a surface based on the decision you need to make.</div>
          </div>
          <div className={shell.topActions}>
            <button className={shell.ghostButton}>Quiet mode</button>
            <button className={shell.primaryButton}>Open approvals</button>
            <div className={shell.signalStack}>
              <span className={shell.signalDot} />
              <span>Shared state live</span>
            </div>
          </div>
        </header>

        <section className={shell.panel}>
          <div className={shell.panelHeader}>
            <div>
              <p className={shell.eyebrow}>Mission Control</p>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            {controls ? <div className={shell.headerControls}>{controls}</div> : null}
          </div>
          {children}
        </section>
      </section>
    </main>
  );
}

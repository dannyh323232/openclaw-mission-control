import Link from "next/link";
import shell from "./shared-shell.module.css";

export type NavKey = "tasks" | "calendar" | "projects" | "memory" | "team" | "office";

type ChromeProps = {
  active: NavKey;
  title: string;
  description: string;
  controls?: React.ReactNode;
  children: React.ReactNode;
};

const navItems: { key: NavKey; label: string; href: string; icon: string; hint: string }[] = [
  { key: "tasks", label: "Tasks", href: "/tasks", icon: "◎", hint: "Queues + execution" },
  { key: "calendar", label: "Calendar", href: "/calendar", icon: "◫", hint: "Scheduled load" },
  { key: "projects", label: "Projects", href: "/projects", icon: "◩", hint: "Roadmap + delivery" },
  { key: "memory", label: "Memory", href: "/memory", icon: "◌", hint: "Journal + notes" },
  { key: "team", label: "Team", href: "/team", icon: "◍", hint: "Org + roles" },
  { key: "office", label: "Office", href: "/office", icon: "▦", hint: "Live floor state" },
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

        <div className={shell.sidebarSectionLabel}>Views</div>
        <nav className={shell.nav}>
          {navItems.map((item) => {
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

        <div className={shell.sidebarSectionLabel}>System</div>
        <div className={shell.sidebarCard}>
          <div>
            <strong>Network State</strong>
            <span>14 agents online · 3 alerts buffered</span>
          </div>
          <b>Nominal</b>
        </div>

        <div className={shell.sidebarCardMuted}>
          <span>CEO relay</span>
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
            <div className={shell.search}>Search queues, notes, agents, projects...</div>
          </div>
          <div className={shell.topActions}>
            <button className={shell.ghostButton}>Quiet mode</button>
            <button className={shell.primaryButton}>Escalations</button>
            <div className={shell.signalStack}>
              <span className={shell.signalDot} />
              <span>Live</span>
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

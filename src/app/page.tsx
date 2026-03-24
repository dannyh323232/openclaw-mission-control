import Link from "next/link";
import shell from "./shared-shell.module.css";
import styles from "./page.module.css";

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

const navItems: NavItem[] = [
  { label: "Tasks", href: "/tasks" },
  { label: "Agents", href: "/agents" },
  { label: "Content", href: "/content" },
  { label: "Approvals", href: "/approvals" },
  { label: "Council", href: "/council" },
  { label: "Calendar", href: "/calendar" },
  { label: "Projects", href: "/projects", active: true },
  { label: "Memory", href: "/memory" },
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

const quickLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Calendar", href: "/calendar" },
  { label: "Tasks", href: "/tasks" },
];

export default function Home() {
  return (
    <main className={shell.shell}>
      <aside className={shell.sidebar}>
        <div className={shell.brand}>
          <div className={shell.brandMark}>⌘</div>
          <span>Mission Control</span>
        </div>

        <nav className={shell.nav}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${shell.navItem} ${item.active ? shell.navItemActive : ""}`}
            >
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
          <div className={shell.search}>⌕ Search</div>
          <div className={shell.topActions}>
            <button className={shell.ghostButton}>Pause</button>
            <button className={shell.ghostButton}>Ping Henry</button>
            <span className={shell.topIcon}>◌</span>
            <span className={shell.topIcon}>◔</span>
          </div>
        </header>

        <section className={shell.panel}>
          <div className={shell.panelHeader}>
            <div>
              <h1>Mission Control</h1>
              <p>Reference-style internal dashboard shell</p>
            </div>
          </div>

          <div className={styles.homeCards}>
            {quickLinks.map((item) => (
              <Link key={item.label} href={item.href} className={styles.homeCard}>
                <strong>{item.label}</strong>
                <span>Open {item.label.toLowerCase()} view</span>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

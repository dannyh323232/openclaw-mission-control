import { AppChrome } from "../chrome";
import styles from "./page.module.css";

type Project = {
  title: string;
  summary: string;
  progress: number;
  owner: string;
  budget: string;
  due: string;
  health: string;
  tone: "green" | "amber" | "purple" | "slate";
};

const projects: Project[] = [
  { title: "Mission Control", summary: "Premium command interface for operations, scheduling, memory, team visibility, and office state.", progress: 74, owner: "Codex", budget: "12 tasks", due: "This week", health: "On track", tone: "purple" },
  { title: "Refined conversion system", summary: "Homepage, CTA flow, trust proof, and consultation-path improvements for clinic growth.", progress: 58, owner: "Web", budget: "8 tasks", due: "Fri", health: "Needs copy lock", tone: "amber" },
  { title: "Relay layer", summary: "Shared event transport for messaging surfaces, approvals, and background automation.", progress: 63, owner: "Charlie", budget: "10 tasks", due: "Mon", health: "Stable", tone: "green" },
  { title: "Research engine", summary: "Trend capture, scoring, and opportunity brief generation for repeatable high-signal input.", progress: 34, owner: "Scout", budget: "15 tasks", due: "Next week", health: "Exploring", tone: "slate" },
  { title: "Content factory", summary: "Repeatable reels, captions, footage plans, and social publishing workflows.", progress: 49, owner: "Quill", budget: "11 tasks", due: "Tue", health: "Waiting assets", tone: "purple" },
  { title: "CEO exception queue", summary: "Filter routing so Daniel only sees decisions, blockers, approvals, and high-risk actions.", progress: 81, owner: "Henry", budget: "5 tasks", due: "Today", health: "Closing out", tone: "green" },
];

export default function ProjectsPage() {
  return (
    <AppChrome
      active="projects"
      title="Projects"
      description="Polished delivery cards with stronger hierarchy, metadata, and clearer progress storytelling."
      controls={<><button>Portfolio</button><button>Health view</button></>}
    >
      <div className={styles.grid}>
        {projects.map((project) => (
          <article key={project.title} className={styles.card}>
            <div className={styles.topRow}>
              <span className={`${styles.health} ${styles[project.tone]}`}>{project.health}</span>
              <small>{project.due}</small>
            </div>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <div className={styles.progressLine}><span style={{ width: `${project.progress}%` }} className={`${styles.progressBar} ${styles[project.tone]}`} /></div>
            <div className={styles.progressMeta}><strong>{project.progress}% complete</strong><span>{project.budget}</span></div>
            <div className={styles.footer}>
              <div>
                <small>Owner</small>
                <strong>{project.owner}</strong>
              </div>
              <div>
                <small>Due</small>
                <strong>{project.due}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AppChrome>
  );
}

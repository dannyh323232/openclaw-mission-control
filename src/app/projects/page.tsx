import { AppChrome } from "../chrome";
import styles from "./page.module.css";
import { createProject, deleteProject } from "@/lib/actions";
import { getMissionControlData } from "@/lib/store";
import { projectTone } from "@/lib/view-models";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const data = await getMissionControlData();
  const agentMap = new Map(data.agents.map((agent) => [agent.id, agent]));
  const projectSummaries = data.projects.map((project) => {
    const tasks = data.tasks.filter((task) => task.projectId === project.id);
    const approvals = data.approvals.filter((approval) => approval.projectId === project.id && approval.status === "pending");
    return { project, tasks, approvals };
  });

  return (
    <AppChrome
      active="projects"
      title="Projects"
      description="Projects now read like operating programmes: health, owner, due date, task load, and approval pressure are all visible without hunting."
      controls={
        <>
          <button>{data.projects.length} projects</button>
          <button>{projectSummaries.filter(({ project }) => project.health !== "on-track").length} need attention</button>
        </>
      }
    >
      <section className={styles.topRow}>
        <div className={styles.summaryCard}><span>On track</span><strong>{projectSummaries.filter(({ project }) => project.health === "on-track").length}</strong><small>Healthy delivery pace</small></div>
        <div className={styles.summaryCard}><span>At risk / blocked</span><strong>{projectSummaries.filter(({ project }) => project.health === "at-risk" || project.health === "blocked").length}</strong><small>Needs intervention</small></div>
        <div className={styles.summaryCard}><span>Pending approvals</span><strong>{projectSummaries.reduce((sum, item) => sum + item.approvals.length, 0)}</strong><small>Decision load tied to projects</small></div>
        <div className={styles.summaryCard}><span>Tracked tasks</span><strong>{data.tasks.length}</strong><small>Execution linked back to projects</small></div>
      </section>

      <section className={styles.composer}>
        <div>
          <span className={styles.sectionKicker}>Create project</span>
          <h2>Add a new tracked initiative with owner, due date, health, and progress</h2>
          <p>This page should tell you whether a project is calm, drifting, or blocked — not just that it exists.</p>
        </div>
        <form action={createProject} className={styles.formGrid}>
          <input name="title" placeholder="Project title" required />
          <input name="summary" placeholder="Short summary" required />
          <select name="ownerId" defaultValue={data.agents[0]?.id}>{data.agents.map((agent) => <option key={agent.id} value={agent.id}>{agent.name}</option>)}</select>
          <input type="date" name="dueDate" required />
          <input type="number" min="0" max="100" name="progress" placeholder="Progress %" defaultValue="0" required />
          <select name="health" defaultValue="planning">
            <option value="planning">Planning</option>
            <option value="on-track">On track</option>
            <option value="at-risk">At risk</option>
            <option value="blocked">Blocked</option>
          </select>
          <button type="submit">Create project</button>
        </form>
      </section>

      <div className={styles.grid}>
        {projectSummaries.map(({ project, tasks, approvals }) => (
          <article key={project.id} className={styles.card}>
            <div className={styles.topMeta}>
              <span className={`${styles.health} ${styles[projectTone[project.health]]}`}>{project.health.replace("-", " ")}</span>
              <small>Due {project.dueDate}</small>
            </div>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <div className={styles.progressLine}><span style={{ width: `${project.progress}%` }} className={`${styles.progressBar} ${styles[projectTone[project.health]]}`} /></div>
            <div className={styles.progressMeta}><strong>{project.progress}% complete</strong><span>{tasks.length} linked tasks</span></div>
            <div className={styles.statusGrid}>
              <div><small>Owner</small><strong>{agentMap.get(project.ownerId)?.name ?? project.ownerId}</strong></div>
              <div><small>Approvals</small><strong>{approvals.length ? `${approvals.length} waiting` : "Clear"}</strong></div>
              <div><small>Execution</small><strong>{tasks.filter((task) => task.lane === "now" || task.lane === "building").length} active</strong></div>
              <div><small>Review</small><strong>{tasks.filter((task) => task.lane === "review").length} checking</strong></div>
            </div>
            <form action={deleteProject} className={styles.deleteForm}>
              <input type="hidden" name="id" value={project.id} />
              <button type="submit">Delete project</button>
            </form>
          </article>
        ))}
      </div>
    </AppChrome>
  );
}

import { AppChrome } from "../chrome";
import styles from "./page.module.css";
import { createProject, deleteProject } from "@/lib/actions";
import { getMissionControlData } from "@/lib/store";
import { projectTone } from "@/lib/view-models";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const data = await getMissionControlData();
  const agentMap = new Map(data.agents.map((agent) => [agent.id, agent]));
  const taskCounts = new Map(data.projects.map((project) => [project.id, data.tasks.filter((task) => task.projectId === project.id).length]));

  return (
    <AppChrome
      active="projects"
      title="Projects"
      description="Portfolio cards now load from the shared data model, with project creation and delete flows."
      controls={<><button>{data.projects.length} projects</button><button>{data.tasks.length} linked tasks</button></>}
    >
      <section className={styles.composer}>
        <div>
          <span className={styles.sectionKicker}>Create project</span>
          <h2>Add a new tracked initiative</h2>
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
        {data.projects.map((project) => (
          <article key={project.id} className={styles.card}>
            <div className={styles.topRow}>
              <span className={`${styles.health} ${styles[projectTone[project.health]]}`}>{project.health.replace("-", " ")}</span>
              <small>{project.dueDate}</small>
            </div>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <div className={styles.progressLine}><span style={{ width: `${project.progress}%` }} className={`${styles.progressBar} ${styles[projectTone[project.health]]}`} /></div>
            <div className={styles.progressMeta}><strong>{project.progress}% complete</strong><span>{taskCounts.get(project.id)} tasks</span></div>
            <div className={styles.footer}>
              <div>
                <small>Owner</small>
                <strong>{agentMap.get(project.ownerId)?.name ?? project.ownerId}</strong>
              </div>
              <div>
                <small>Due</small>
                <strong>{project.dueDate}</strong>
              </div>
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

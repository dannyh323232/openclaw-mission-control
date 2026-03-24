import { AppChrome } from "../chrome";
import styles from "./page.module.css";
import { updateApprovalStatus } from "@/lib/actions";
import { getMissionControlData } from "@/lib/store";
import { approvalTone, formatDateTime } from "@/lib/view-models";

export const dynamic = "force-dynamic";

export default async function ApprovalsPage() {
  const data = await getMissionControlData();
  const projectMap = new Map(data.projects.map((project) => [project.id, project]));

  return (
    <AppChrome
      active="approvals"
      title="Approvals"
      description="A real CEO exception queue with persisted approval records and approve/reject actions."
      controls={<><button>{data.approvals.filter((approval) => approval.status === "pending").length} pending</button><button>{data.approvals.length} total</button></>}
    >
      <div className={styles.grid}>
        {data.approvals.map((approval) => (
          <article key={approval.id} className={`${styles.card} ${styles[approvalTone[approval.status]]}`}>
            <div className={styles.topRow}>
              <span className={styles.status}>{approval.status}</span>
              <small>{formatDateTime(approval.requestedAt)}</small>
            </div>
            <h2>{approval.title}</h2>
            <p>{approval.detail}</p>
            <div className={styles.footer}>
              <span>{approval.requestedBy}</span>
              <strong>{projectMap.get(approval.projectId)?.title ?? "Unknown project"}</strong>
            </div>
            {approval.status === "pending" ? (
              <div className={styles.actions}>
                <form action={updateApprovalStatus}>
                  <input type="hidden" name="id" value={approval.id} />
                  <input type="hidden" name="status" value="approved" />
                  <button type="submit" className={styles.approve}>Approve</button>
                </form>
                <form action={updateApprovalStatus}>
                  <input type="hidden" name="id" value={approval.id} />
                  <input type="hidden" name="status" value="rejected" />
                  <button type="submit" className={styles.reject}>Reject</button>
                </form>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </AppChrome>
  );
}

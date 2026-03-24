import { AppChrome } from "../chrome";
import styles from "./page.module.css";
import { getMissionControlData } from "@/lib/store";
import { formatDateTime, relayTone } from "@/lib/view-models";

export const dynamic = "force-dynamic";

export default async function RelayPage() {
  const data = await getMissionControlData();
  const pendingApprovals = data.approvals.filter((approval) => approval.status === "pending");
  const recentEvents = [...data.events].slice(-3).reverse();

  return (
    <AppChrome
      active="relay"
      title="Relay"
      description="This page prepares the external messaging layer honestly: what Discord and Telegram are for, what data they should receive, and what is still blocked until real credentials exist."
      controls={
        <>
          <button>{data.relayChannels.length} relay targets</button>
          <button>{pendingApprovals.length} approval payloads available</button>
        </>
      }
    >
      <section className={styles.hero}>
        <div className={styles.heroCard}>
          <span className={styles.kicker}>Relay contract</span>
          <h2>External surfaces are now framed as outputs from Mission Control, not parallel sources of truth.</h2>
          <p>Discord should receive execution visibility. Telegram should receive owner exceptions. Both can now be wired against a clearer in-app contract when credentials are available.</p>
        </div>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}><span>Approvals ready to send</span><strong>{pendingApprovals.length}</strong><small>Immediate Telegram-style owner exceptions</small></div>
          <div className={styles.summaryCard}><span>Recent event payloads</span><strong>{recentEvents.length}</strong><small>Latest history available for feed fan-out</small></div>
          <div className={styles.summaryCard}><span>Blocked by access</span><strong>{data.relayChannels.filter((channel) => channel.status !== "ready").length}</strong><small>All remaining blockers are external, not structural</small></div>
        </div>
      </section>

      <section className={styles.channelGrid}>
        {data.relayChannels.map((channel) => (
          <article key={channel.id} className={`${styles.channelCard} ${styles[relayTone[channel.status]]}`}>
            <div className={styles.channelTop}>
              <div>
                <small>{channel.surface}</small>
                <h3>{channel.name}</h3>
              </div>
              <span className={styles.status}>{channel.status}</span>
            </div>
            <p>{channel.purpose}</p>
            <div className={styles.metaBlock}>
              <div><small>Prepared</small><strong>{channel.readiness}</strong></div>
              <div><small>Blocker</small><strong>{channel.blocker}</strong></div>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.payloadLayout}>
        <div className={styles.payloadCard}>
          <span className={styles.kicker}>Telegram payload shape</span>
          <strong>Owner exceptions only</strong>
          <div className={styles.payloadExample}>
            <pre>{`{
  "surface": "telegram",
  "kind": "approval",
  "title": "${pendingApprovals[0]?.title ?? "No pending approval"}",
  "detail": "${pendingApprovals[0]?.detail ?? "Queue currently clear."}",
  "requestedBy": "${pendingApprovals[0]?.requestedBy ?? "System"}",
  "status": "${pendingApprovals[0]?.status ?? "clear"}"
}`}</pre>
          </div>
        </div>

        <div className={styles.payloadCard}>
          <span className={styles.kicker}>Discord payload shape</span>
          <strong>Execution feed and handoff visibility</strong>
          <div className={styles.payloadExample}>
            <pre>{`{
  "surface": "discord",
  "kind": "event",
  "events": [
${recentEvents.map((event) => `    { "type": "${event.type}", "actor": "${event.actor}", "message": "${event.message}", "timestamp": "${formatDateTime(event.timestamp)}" }`).join(",\n")}
  ]
}`}</pre>
          </div>
        </div>
      </section>
    </AppChrome>
  );
}

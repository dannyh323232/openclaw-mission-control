import { AppChrome } from "../chrome";
import styles from "./page.module.css";
import { sendRelayTest } from "@/lib/actions";
import { getRelayReadiness } from "@/lib/relay";
import { getMissionControlData } from "@/lib/store";
import { formatDateTime, relayTone } from "@/lib/view-models";

export const dynamic = "force-dynamic";

export default async function RelayPage() {
  const data = await getMissionControlData();
  const pendingApprovals = data.approvals.filter((approval) => approval.status === "pending");
  const recentEvents = [...data.events].slice(-5).reverse();
  const readiness = getRelayReadiness();

  return (
    <AppChrome
      active="relay"
      title="Relay"
      description="Mission Control can now prepare real outbound Discord and Telegram messages. Live send works as soon as the correct environment variables exist."
      controls={
        <>
          <button>{data.relayChannels.length} relay targets</button>
          <button>{Object.values(readiness).filter((item) => item.configured).length} surfaces configured</button>
        </>
      }
    >
      <section className={styles.hero}>
        <div className={styles.heroCard}>
          <span className={styles.kicker}>Relay contract</span>
          <h2>External surfaces are outputs from Mission Control, not competing sources of truth.</h2>
          <p>
            Discord should receive execution visibility. Telegram should receive owner exceptions.
            This screen now shows both the contract and the real runtime readiness for sending test payloads.
          </p>
        </div>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}><span>Approvals ready to send</span><strong>{pendingApprovals.length}</strong><small>Immediate Telegram-style owner exceptions</small></div>
          <div className={styles.summaryCard}><span>Recent event payloads</span><strong>{recentEvents.length}</strong><small>Latest history available for feed fan-out</small></div>
          <div className={styles.summaryCard}><span>Configured surfaces</span><strong>{Object.values(readiness).filter((item) => item.configured).length}</strong><small>Environment-backed relay targets</small></div>
        </div>
      </section>

      <section className={styles.runtimeGrid}>
        <article className={styles.runtimeCard}>
          <span className={styles.kicker}>Live runtime readiness</span>
          <div className={styles.runtimeList}>
            <div className={styles.runtimeRow}>
              <div>
                <strong>Discord</strong>
                <small>{readiness.discord.target}</small>
              </div>
              <b className={readiness.discord.configured ? styles.ok : styles.bad}>{readiness.discord.configured ? "Configured" : "Blocked"}</b>
            </div>
            <p>{readiness.discord.blocker}</p>

            <div className={styles.runtimeRow}>
              <div>
                <strong>Telegram</strong>
                <small>{readiness.telegram.target}</small>
              </div>
              <b className={readiness.telegram.configured ? styles.ok : styles.bad}>{readiness.telegram.configured ? "Configured" : "Blocked"}</b>
            </div>
            <p>{readiness.telegram.blocker}</p>
          </div>
        </article>

        <article className={styles.runtimeCard}>
          <span className={styles.kicker}>Test live relay</span>
          <p className={styles.runtimeLead}>These actions attempt a real outbound send. If env vars are missing, the app logs the blocker into History instead.</p>
          <div className={styles.testActions}>
            <form action={sendRelayTest}>
              <input type="hidden" name="surface" value="discord" />
              <button type="submit" className={styles.primaryButton}>Send Discord test</button>
            </form>
            <form action={sendRelayTest}>
              <input type="hidden" name="surface" value="telegram" />
              <button type="submit" className={styles.secondaryButton}>Send Telegram test</button>
            </form>
          </div>
          <small className={styles.inlineNote}>Required env vars: <code>DISCORD_WEBHOOK_URL</code>, <code>TELEGRAM_BOT_TOKEN</code>, <code>TELEGRAM_CHAT_ID</code></small>
        </article>
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

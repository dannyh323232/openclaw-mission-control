import { AppChrome } from "../chrome";
import styles from "./page.module.css";

type Slot = { time: string; title: string; span?: number; tone: "purple" | "green" | "amber" | "blue" | "red" };
type Day = { label: string; date: string; active?: boolean; slots: Slot[] };

const days: Day[] = [
  { label: "Mon", date: "18", slots: [{ time: "08:30", title: "Trend radar", tone: "amber" }, { time: "09:00", title: "Morning briefing", tone: "blue", span: 2 }, { time: "13:00", title: "Clinic offer review", tone: "purple" }] },
  { label: "Tue", date: "19", active: true, slots: [{ time: "08:45", title: "Kickoff queue", tone: "blue" }, { time: "10:00", title: "Mission Control rebuild", tone: "purple", span: 3 }, { time: "15:30", title: "Relay schema review", tone: "green" }] },
  { label: "Wed", date: "20", slots: [{ time: "07:30", title: "YouTube recap", tone: "red" }, { time: "09:30", title: "CEO digest", tone: "amber" }, { time: "14:00", title: "Content planning", tone: "green", span: 2 }] },
  { label: "Thu", date: "21", slots: [{ time: "08:00", title: "Security sweep", tone: "blue" }, { time: "11:00", title: "Project council", tone: "purple", span: 2 }, { time: "16:30", title: "Draft newsletter", tone: "amber" }] },
  { label: "Fri", date: "22", slots: [{ time: "08:30", title: "Trend radar", tone: "amber" }, { time: "12:00", title: "Weekly review", tone: "purple", span: 2 }, { time: "17:30", title: "Wrap + handoff", tone: "green" }] },
];

const hours = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export default function CalendarPage() {
  return (
    <AppChrome
      active="calendar"
      title="Calendar"
      description="A denser weekly task board with realistic scheduling weight and clearer time structure."
      controls={<><button>Week</button><button>UTC+0</button></>}
    >
      <div className={styles.metaRow}>
        <div className={styles.metaCard}><span>Recurring jobs</span><strong>17</strong></div>
        <div className={styles.metaCard}><span>Booked focus blocks</span><strong>11h</strong></div>
        <div className={styles.metaCard}><span>Today’s load</span><strong>82%</strong></div>
      </div>

      <div className={styles.calendar}>
        <div className={styles.times}>
          {hours.map((hour) => <span key={hour}>{hour}</span>)}
        </div>
        {days.map((day) => (
          <section key={day.label} className={`${styles.day} ${day.active ? styles.active : ""}`}>
            <div className={styles.dayHeader}>
              <span>{day.label}</span>
              <strong>{day.date}</strong>
            </div>
            <div className={styles.grid}>
              {hours.map((hour) => <div key={hour} className={styles.hourLine} />)}
              {day.slots.map((slot) => {
                const row = Math.max(1, hours.indexOf(slot.time) + 1);
                return (
                  <article
                    key={`${day.label}-${slot.title}`}
                    className={`${styles.slot} ${styles[slot.tone]}`}
                    style={{ gridRow: `${row} / span ${slot.span ?? 1}` }}
                  >
                    <small>{slot.time}</small>
                    <strong>{slot.title}</strong>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </AppChrome>
  );
}

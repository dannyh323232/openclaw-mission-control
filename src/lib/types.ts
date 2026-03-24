export type TaskLane = "now" | "queued" | "building" | "review";
export type Priority = "low" | "medium" | "high" | "critical";
export type Health = "on-track" | "at-risk" | "blocked" | "planning";
export type ApprovalStatus = "pending" | "approved" | "rejected";
export type AgentStatus = "online" | "busy" | "idle";

export type Task = {
  id: string;
  title: string;
  detail: string;
  ownerId: string;
  projectId: string;
  dueAt: string;
  lane: TaskLane;
  priority: Priority;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  ownerId: string;
  dueDate: string;
  progress: number;
  health: Health;
};

export type ScheduleItem = {
  id: string;
  title: string;
  ownerId: string;
  projectId: string;
  startsAt: string;
  endsAt: string;
  type: "focus" | "meeting" | "delivery" | "review";
};

export type MemoryEntry = {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string[];
  tags: string[];
};

export type Agent = {
  id: string;
  name: string;
  role: string;
  lane: string;
  load: number;
  summary: string;
  status: AgentStatus;
};

export type Approval = {
  id: string;
  title: string;
  detail: string;
  projectId: string;
  requestedBy: string;
  requestedAt: string;
  status: ApprovalStatus;
};

export type Event = {
  id: string;
  timestamp: string;
  actor: string;
  type: string;
  message: string;
};

export type MissionControlData = {
  tasks: Task[];
  projects: Project[];
  scheduleItems: ScheduleItem[];
  memoryEntries: MemoryEntry[];
  agents: Agent[];
  approvals: Approval[];
  events: Event[];
  longTermNotes: string[];
};

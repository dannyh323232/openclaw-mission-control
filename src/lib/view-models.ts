import type { ApprovalStatus, Health, Priority, TaskLane } from "./types";

export const laneMeta: Record<TaskLane, { label: string; badge: string; tone: "purple" | "blue" | "amber" | "green" }> = {
  now: { label: "Now", badge: "Hot", tone: "purple" },
  queued: { label: "Queued", badge: "Ready", tone: "amber" },
  building: { label: "Building", badge: "Live", tone: "blue" },
  review: { label: "Review", badge: "Stable", tone: "green" },
};

export const priorityTone: Record<Priority, "green" | "amber" | "purple" | "blue"> = {
  low: "green",
  medium: "blue",
  high: "amber",
  critical: "purple",
};

export const projectTone: Record<Health, "green" | "amber" | "purple" | "slate"> = {
  "on-track": "green",
  "at-risk": "amber",
  blocked: "purple",
  planning: "slate",
};

export const approvalTone: Record<ApprovalStatus, "purple" | "green" | "amber"> = {
  pending: "amber",
  approved: "green",
  rejected: "purple",
};

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date(value));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

export function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(value));
}

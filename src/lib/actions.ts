"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getMissionControlData, makeId, writeMissionControlData } from "./store";
import type { ApprovalStatus, Health, MissionControlData, Priority, TaskLane } from "./types";

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function bounce(path: string) {
  revalidatePath(path);
  redirect(path);
}

function logEvent(data: MissionControlData, actor: string, type: string, message: string) {
  data.events.push({
    id: makeId("event"),
    timestamp: new Date().toISOString(),
    actor,
    type,
    message,
  });
}

export async function createTask(formData: FormData) {
  const data = await getMissionControlData();
  const title = asString(formData.get("title"));
  const ownerId = asString(formData.get("ownerId"));
  const lane = (asString(formData.get("lane")) || "queued") as TaskLane;
  data.tasks.unshift({
    id: makeId("task"),
    title,
    detail: asString(formData.get("detail")),
    ownerId,
    projectId: asString(formData.get("projectId")),
    dueAt: asString(formData.get("dueAt")),
    lane,
    priority: (asString(formData.get("priority")) || "medium") as Priority,
  });
  logEvent(data, ownerId || "System", "task", `Created task \"${title}\" in ${lane}.`);
  await writeMissionControlData(data);
  bounce("/tasks");
}

export async function moveTask(formData: FormData) {
  const data = await getMissionControlData();
  const task = data.tasks.find((item) => item.id === asString(formData.get("id")));
  const lane = asString(formData.get("lane")) as TaskLane;
  if (task) {
    task.lane = lane;
    logEvent(data, task.ownerId || "System", "task", `Moved task \"${task.title}\" to ${lane}.`);
  }
  await writeMissionControlData(data);
  bounce("/tasks");
}

export async function deleteTask(formData: FormData) {
  const data = await getMissionControlData();
  const id = asString(formData.get("id"));
  const task = data.tasks.find((item) => item.id === id);
  data.tasks = data.tasks.filter((item) => item.id !== id);
  if (task) {
    logEvent(data, task.ownerId || "System", "task", `Deleted task \"${task.title}\".`);
  }
  await writeMissionControlData(data);
  bounce("/tasks");
}

export async function createProject(formData: FormData) {
  const data = await getMissionControlData();
  const title = asString(formData.get("title"));
  const ownerId = asString(formData.get("ownerId"));
  data.projects.unshift({
    id: makeId("project"),
    title,
    summary: asString(formData.get("summary")),
    ownerId,
    dueDate: asString(formData.get("dueDate")),
    progress: Number(asString(formData.get("progress")) || 0),
    health: (asString(formData.get("health")) || "planning") as Health,
  });
  logEvent(data, ownerId || "System", "project", `Created project \"${title}\".`);
  await writeMissionControlData(data);
  bounce("/projects");
}

export async function deleteProject(formData: FormData) {
  const data = await getMissionControlData();
  const id = asString(formData.get("id"));
  const project = data.projects.find((item) => item.id === id);
  data.projects = data.projects.filter((item) => item.id !== id);
  data.tasks = data.tasks.filter((item) => item.projectId !== id);
  data.scheduleItems = data.scheduleItems.filter((item) => item.projectId !== id);
  data.approvals = data.approvals.filter((item) => item.projectId !== id);
  if (project) {
    logEvent(data, project.ownerId || "System", "project", `Deleted project \"${project.title}\" and its linked work.`);
  }
  await writeMissionControlData(data);
  bounce("/projects");
}

export async function createScheduleItem(formData: FormData) {
  const data = await getMissionControlData();
  const title = asString(formData.get("title"));
  const ownerId = asString(formData.get("ownerId"));
  data.scheduleItems.push({
    id: makeId("schedule"),
    title,
    ownerId,
    projectId: asString(formData.get("projectId")),
    startsAt: asString(formData.get("startsAt")),
    endsAt: asString(formData.get("endsAt")),
    type: (asString(formData.get("type")) || "focus") as "focus" | "meeting" | "delivery" | "review",
  });
  data.scheduleItems.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  logEvent(data, ownerId || "System", "schedule", `Scheduled \"${title}\".`);
  await writeMissionControlData(data);
  bounce("/calendar");
}

export async function deleteScheduleItem(formData: FormData) {
  const data = await getMissionControlData();
  const id = asString(formData.get("id"));
  const item = data.scheduleItems.find((entry) => entry.id === id);
  data.scheduleItems = data.scheduleItems.filter((entry) => entry.id !== id);
  if (item) {
    logEvent(data, item.ownerId || "System", "schedule", `Deleted scheduled block \"${item.title}\".`);
  }
  await writeMissionControlData(data);
  bounce("/calendar");
}

export async function updateApprovalStatus(formData: FormData) {
  const data = await getMissionControlData();
  const approval = data.approvals.find((item) => item.id === asString(formData.get("id")));
  if (approval) {
    approval.status = asString(formData.get("status")) as ApprovalStatus;
    logEvent(data, approval.requestedBy || "Daniel", "approval", `${approval.status === "approved" ? "Approved" : "Rejected"} \"${approval.title}\".`);
  }
  await writeMissionControlData(data);
  bounce("/approvals");
}

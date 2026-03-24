"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getMissionControlData, makeId, writeMissionControlData } from "./store";
import type { ApprovalStatus, Health, Priority, TaskLane } from "./types";

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function bounce(path: string) {
  revalidatePath(path);
  redirect(path);
}

export async function createTask(formData: FormData) {
  const data = await getMissionControlData();
  data.tasks.unshift({
    id: makeId("task"),
    title: asString(formData.get("title")),
    detail: asString(formData.get("detail")),
    ownerId: asString(formData.get("ownerId")),
    projectId: asString(formData.get("projectId")),
    dueAt: asString(formData.get("dueAt")),
    lane: (asString(formData.get("lane")) || "queued") as TaskLane,
    priority: (asString(formData.get("priority")) || "medium") as Priority,
  });
  await writeMissionControlData(data);
  bounce("/tasks");
}

export async function moveTask(formData: FormData) {
  const data = await getMissionControlData();
  const task = data.tasks.find((item) => item.id === asString(formData.get("id")));
  if (task) task.lane = asString(formData.get("lane")) as TaskLane;
  await writeMissionControlData(data);
  bounce("/tasks");
}

export async function deleteTask(formData: FormData) {
  const data = await getMissionControlData();
  data.tasks = data.tasks.filter((item) => item.id !== asString(formData.get("id")));
  await writeMissionControlData(data);
  bounce("/tasks");
}

export async function createProject(formData: FormData) {
  const data = await getMissionControlData();
  data.projects.unshift({
    id: makeId("project"),
    title: asString(formData.get("title")),
    summary: asString(formData.get("summary")),
    ownerId: asString(formData.get("ownerId")),
    dueDate: asString(formData.get("dueDate")),
    progress: Number(asString(formData.get("progress")) || 0),
    health: (asString(formData.get("health")) || "planning") as Health,
  });
  await writeMissionControlData(data);
  bounce("/projects");
}

export async function deleteProject(formData: FormData) {
  const data = await getMissionControlData();
  const id = asString(formData.get("id"));
  data.projects = data.projects.filter((item) => item.id !== id);
  data.tasks = data.tasks.filter((item) => item.projectId !== id);
  data.scheduleItems = data.scheduleItems.filter((item) => item.projectId !== id);
  data.approvals = data.approvals.filter((item) => item.projectId !== id);
  await writeMissionControlData(data);
  bounce("/projects");
}

export async function createScheduleItem(formData: FormData) {
  const data = await getMissionControlData();
  data.scheduleItems.push({
    id: makeId("schedule"),
    title: asString(formData.get("title")),
    ownerId: asString(formData.get("ownerId")),
    projectId: asString(formData.get("projectId")),
    startsAt: asString(formData.get("startsAt")),
    endsAt: asString(formData.get("endsAt")),
    type: (asString(formData.get("type")) || "focus") as "focus" | "meeting" | "delivery" | "review",
  });
  data.scheduleItems.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  await writeMissionControlData(data);
  bounce("/calendar");
}

export async function deleteScheduleItem(formData: FormData) {
  const data = await getMissionControlData();
  data.scheduleItems = data.scheduleItems.filter((item) => item.id !== asString(formData.get("id")));
  await writeMissionControlData(data);
  bounce("/calendar");
}

export async function updateApprovalStatus(formData: FormData) {
  const data = await getMissionControlData();
  const approval = data.approvals.find((item) => item.id === asString(formData.get("id")));
  if (approval) approval.status = asString(formData.get("status")) as ApprovalStatus;
  await writeMissionControlData(data);
  bounce("/approvals");
}

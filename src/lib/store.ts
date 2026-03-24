import { promises as fs } from "node:fs";
import path from "node:path";
import type { MissionControlData } from "./types";

const dataFile = path.join(process.cwd(), "src", "data", "mission-control.json");

export async function getMissionControlData(): Promise<MissionControlData> {
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw) as MissionControlData;
}

export async function writeMissionControlData(data: MissionControlData) {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2) + "\n", "utf8");
}

export function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

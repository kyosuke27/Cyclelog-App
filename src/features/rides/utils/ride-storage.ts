import type { Ride } from "../types";

const key = "rides";

// Ride型かどうかの判定
// 形式があっていたらRide型になる
function isRide(value: unknown): value is Ride {
  // valueの型をチェック
  if (typeof value !== "object" || value === null) {
    console.log("value type error");
    return false;
  }
  const row = value as Record<string, unknown>;
  // 日付形式チェック
  if (typeof row.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(row.date)) {
    console.log("date type error");
    return false;
  }
  const date = new Date(`${row.date}T00:00:00Z`);
  if (
    // 実在日付かチェック,UTCの決まった形式になっているか？
    !Number.isFinite(date.getTime()) ||
    date.toISOString().slice(0, 10) !== row.date
  ) {
    console.log("date numeric format error");
    return false;
  }
  console.log("last check");
  return (
    typeof row.id === "string" &&
    row.id.length > 0 &&
    typeof row.distanceM === "number" &&
    Number.isSafeInteger(row.distanceM) &&
    row.distanceM >= 1 &&
    row.distanceM <= 1_000_000 &&
    typeof row.note === "string"
  );
}

export function readRides(): { rides: Ride[]; error: string } {
  console.log("start readRides");
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return { rides: [], error: "" };
    console.log("raw : ", raw);
    const value: unknown = JSON.parse(raw);
    console.log("parse value : ", value);
    if (!Array.isArray(value) || !value.every(isRide)) {
      throw new Error("記録の形式が不正です");
    }
    console.log("value : ", value);
    return { rides: value, error: "" };
  } catch {
    return {
      rides: [],
      error:
        "保存済みの記録を読めません。元のデータを保つために自動保存を停止しました",
    };
  }
}

export function writeRides(rides: Ride[]) {
  localStorage.setItem(key, JSON.stringify(rides));
}

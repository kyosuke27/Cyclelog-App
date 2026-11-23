import { useState, type SubmitEvent } from "react";
import type { Ride } from "../types";
import { parseDistance } from "../utils/parse-distance";

type RideFormProps = { onAdd: (ride: Ride) => void };
export function RideForm({ onAdd }: RideFormProps) {
  const [date, setDate] = useState<string>("2026-11-23");
  const [distance, setDistance] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [error, setError] = useState<string>("");
  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!date || !event.currentTarget.checkValidity()) {
      setError("日付を正しく入力してください");
      return;
    }
    let meters: number;
    try {
      meters = parseDistance(distance);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "距離を確認してください",
      );
      return;
    }
    console.log("mters ", meters);
    let ride: Ride = {
      id: crypto.randomUUID(),
      date: date,
      distanceM: meters,
      note: note,
    };
    onAdd(ride);
    setDistance("");
    setNote("");
  }
  return (
    <form onSubmit={submit}>
      <div>
        <label>
          日付:
          <input
            type="date"
            required
            min="0001-01-01"
            max="9999-12-31"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          走行距離(km):
          <input
            type="number"
            required
            min={0}
            max={9999}
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          メモ:
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">登録</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}

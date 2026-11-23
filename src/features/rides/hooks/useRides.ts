import { useEffect, useState } from "react";
import { readRides, writeRides } from "../utils/ride-storage";
import type { Ride } from "../types";

export function useRides() {
  const [initial] = useState(readRides());
  const [rides, setRides] = useState<Ride[]>(initial.rides);
  const [writeError, setWriteError] = useState<string>("");
  const storageError = initial.error || writeError;

  useEffect(() => {
    if (initial.error) return;
    try {
      writeRides(rides);
      setWriteError("");
    } catch {
      setWriteError("ブラウザ保存失敗");
    }
  }, [rides, initial]);

  function removeRide(id: string) {
    setRides((pre) => pre.filter((r) => r.id !== id));
  }
  function addRides(ride: Ride) {
    setRides([...rides, ride]);
  }
  return { rides, addRides, removeRide, storageError };
}

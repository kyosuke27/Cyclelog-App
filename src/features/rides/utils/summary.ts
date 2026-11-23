import type { Ride } from "../types";

// 指定された走行距離記録を計算
export function totalDistance(rides: Ride[]): number {
	return rides.reduce((sum, ride) => sum + ride.distanceM, 0);
}

// 月でridesの中から検索
export function monthly(rides: Ride[], month: string): Ride[] {
	return rides.filter((ride) => ride.date.startsWith(`${month} -`));
}

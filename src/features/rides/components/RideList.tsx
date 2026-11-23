import { useState } from "react";
import type { Ride } from "../types";
import { RideCard } from "./RideCard";

type RideListProps = { rides: Ride[]; onRemove: (id: string) => void };

export function RideList({ rides, onRemove }: RideListProps) {
	// 表示順序を判定する変数
	// true:昇順
	// false:高順
	const [newestFirst, setNewestFist] = useState<boolean>(true);

	const sorted = [...rides].sort((a, b) =>
		newestFirst ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
	);

	return (
		<article aria-label="記録一覧">
			<h1>運動記録</h1>
			<h2>記録一覧 {rides.length}件</h2>
			<button onClick={() => setNewestFist((value) => !value)}>
				{newestFirst ? "古い順にする" : "新しい順にする"}
			</button>
			{rides.length == 0 && <p>記録がありません</p>}
			<ol>
				{sorted.map((ride) => (
					<li key={ride.id}>
						<RideCard ride={ride} />
						<button onClick={() => onRemove(ride.id)}>削除</button>
					</li>
				))}
			</ol>
		</article>
	);
}

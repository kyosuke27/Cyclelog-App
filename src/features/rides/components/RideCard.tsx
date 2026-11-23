import type { Ride } from "../types";
import { mTokm } from "../utils/formatKilometer";

type RideCardProps = { ride: Ride };

export function RideCard({ ride }: RideCardProps) {
	console.log(ride);
	return (
		<article>
			<time>{ride.date}</time>
			<p>{mTokm(ride.distanceM)}km</p>
		</article>
	);
}

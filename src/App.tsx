import { useState } from "react";
import "./App.css";
import type { Ride } from "./features/rides/types";
import { RideList } from "./features/rides/components/RideList";
import { RideForm } from "./features/rides/components/RideForm";

const rides2: Ride[] = [
	{
		id: "1",
		date: "2026-11-22",
		distanceM: 10000,
		note: "メモ",
	},
	{
		id: "2",
		date: "2026-11-23",
		distanceM: 20000,
		note: "メモ3",
	},
];

function App() {
	const [rides, setRides] = useState<Ride[]>(rides2);

	function removeRide(id: string) {
		setRides((pre) => pre.filter((r) => r.id != id));
	}
	function addRides(ride: Ride) {
		setRides([...rides, ride]);
	}

	return (
		<main>
			{/* Propsはrides:Ride{}とonRemove:(id:string)=>voidを引数に指定*/}
			<RideList rides={rides} onRemove={removeRide} />
			<RideForm onAdd={addRides} />
		</main>
	);
}

export default App;

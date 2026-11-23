import { RideForm } from "../features/rides/components/RideForm";
import { RideList } from "../features/rides/components/RideList";
import { useRides } from "../features/rides/hooks/useRides";

export function LocalRideScreen() {
	const { rides, addRides, removeRide, storageError } = useRides();
	return (
		<main>
			{storageError && <p role="alert">{storageError}</p>}
			{/* Propsはrides:Ride{}とonRemove:(id:string)=>voidを引数に指定*/}
			<RideList rides={rides} onRemove={removeRide} />
			<RideForm onAdd={addRides} />
		</main>
	);
}

import { QuickSearch } from "./components/quick-search";
import { RecommendedTrips } from "./components/recommended-trips";
import { TripSearch } from "./components/trip-search";

export default function Home() {
  return (
    <div className="flex flex-col">
      <TripSearch />
      <QuickSearch />
      <RecommendedTrips />
    </div>
  );
}

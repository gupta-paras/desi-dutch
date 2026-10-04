import { getDishes } from "@/lib/storage";
import { getRestaurantConfig } from "@/lib/config";
import { HomePageClient } from "@/components/HomePageClient";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const dishes = getDishes();
  const config = getRestaurantConfig();

  return <HomePageClient initialDishes={dishes} config={config} />;
}

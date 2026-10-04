import fs from "fs";
import path from "path";
import { Dish } from "@/types";
import { INITIAL_DISHES } from "@/data/initialDishes";

// Determine safe storage path across local dev and Vercel serverless
function getStorageFilePath(): string {
  // If running in Vercel serverless / read-only environment
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join("/tmp", "desi_dutch_dishes.json");
  }
  return path.join(process.cwd(), "src", "data", "dishes.json");
}

let inMemoryFallback: Dish[] = [...INITIAL_DISHES];

export function getDishes(): Dish[] {
  try {
    const filePath = getStorageFilePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      const parsed: Dish[] = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryFallback = parsed;
        return parsed;
      }
    } else {
      // First run: write initial dishes to storage
      saveAllDishes(INITIAL_DISHES);
      return INITIAL_DISHES;
    }
  } catch (err) {
    console.warn("Storage read error, using memory fallback:", err);
  }
  return inMemoryFallback;
}

export function saveAllDishes(dishes: Dish[]): boolean {
  try {
    inMemoryFallback = [...dishes];
    const filePath = getStorageFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(dishes, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Storage write error:", err);
    return false;
  }
}

export function getDishById(id: string): Dish | null {
  const dishes = getDishes();
  return dishes.find((d) => d.id === id) || null;
}

export function saveDish(dishData: Omit<Dish, "id"> & { id?: string }): Dish {
  const dishes = getDishes();
  const now = new Date().toISOString();

  if (dishData.id) {
    // Update existing
    const index = dishes.findIndex((d) => d.id === dishData.id);
    if (index !== -1) {
      const updated: Dish = {
        ...dishes[index],
        ...dishData,
        id: dishData.id,
        updatedAt: now,
      };
      dishes[index] = updated;
      saveAllDishes(dishes);
      return updated;
    }
  }

  // Create new
  const generatedId =
    dishData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Math.random().toString(36).substring(2, 6);

  const newDish: Dish = {
    ...dishData,
    id: generatedId,
    photos: dishData.photos && dishData.photos.length > 0 ? dishData.photos : [],
    createdAt: now,
    updatedAt: now,
  };

  dishes.unshift(newDish);
  saveAllDishes(dishes);
  return newDish;
}

export function deleteDish(id: string): boolean {
  const dishes = getDishes();
  const filtered = dishes.filter((d) => d.id !== id);
  if (filtered.length !== dishes.length) {
    saveAllDishes(filtered);
    return true;
  }
  return false;
}

export function toggleSpecialToday(id: string): Dish | null {
  const dishes = getDishes();
  const dish = dishes.find((d) => d.id === id);
  if (dish) {
    dish.isSpecialToday = !dish.isSpecialToday;
    dish.updatedAt = new Date().toISOString();
    saveAllDishes(dishes);
    return dish;
  }
  return null;
}

export function resetDishesToDefault(): Dish[] {
  saveAllDishes(INITIAL_DISHES);
  return INITIAL_DISHES;
}

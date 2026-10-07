import { createClient, Client } from '@libsql/client';
import crypto from 'node:crypto';
import { Dish, DishCreateInput, DishUpdateInput } from './schema';
import { SEED_DISHES } from './seed-data';
import type { IDishRepository } from '../services/dish.service';

let defaultTursoClient: Client | null = null;
let schemaInitialized = false;

export function getTursoClient(customUrl?: string, customAuthToken?: string): Client {
  const url = customUrl || process.env.TURSO_DATABASE_URL;
  const authToken = customAuthToken || process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error(
      'TURSO_DATABASE_URL is required to initialize the Turso LibSQL client. ' +
      'Please configure TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in your environment.'
    );
  }

  if (customUrl) {
    return createClient({
      url,
      authToken: authToken || undefined,
    });
  }

  if (!defaultTursoClient) {
    defaultTursoClient = createClient({
      url,
      authToken: authToken || undefined,
    });
  }

  return defaultTursoClient;
}

export async function initTursoSchema(client: Client): Promise<void> {
  if (schemaInitialized) return;

  await client.execute(`
    CREATE TABLE IF NOT EXISTS dishes (
      dish_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      name_nl TEXT,
      description TEXT NOT NULL,
      description_nl TEXT,
      photo_url TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL DEFAULT 'Curries',
      tags TEXT NOT NULL,
      daily_special INTEGER NOT NULL DEFAULT 0,
      is_available INTEGER NOT NULL DEFAULT 1,
      is_coming_soon INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await client.execute(`CREATE INDEX IF NOT EXISTS idx_dishes_name ON dishes(name);`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_dishes_daily_special ON dishes(daily_special);`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_dishes_is_available ON dishes(is_available);`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_dishes_category ON dishes(category);`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_dishes_coming_soon ON dishes(is_coming_soon);`);

  schemaInitialized = true;
}

export async function seedTursoIfEmpty(client: Client): Promise<number> {
  await initTursoSchema(client);

  const countRes = await client.execute('SELECT COUNT(*) as count FROM dishes');
  const count = Number(countRes.rows[0]?.count ?? 0);

  if (count === 0) {
    const statements = SEED_DISHES.map((dish) => ({
      sql: `
        INSERT INTO dishes (
          dish_id, name, name_nl, description, description_nl, photo_url, price, category, tags, daily_special, is_available, is_coming_soon, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        dish.dish_id,
        dish.name,
        dish.name_nl || dish.name,
        dish.description,
        dish.description_nl || dish.description,
        dish.photo_url,
        dish.price,
        dish.category || 'Curries',
        JSON.stringify(dish.tags),
        dish.daily_special ? 1 : 0,
        dish.is_available ? 1 : 0,
        dish.is_coming_soon ? 1 : 0,
        dish.created_at,
        dish.updated_at,
      ],
    }));

    await client.batch(statements, 'write');
    return SEED_DISHES.length;
  }

  return 0;
}

export function mapTursoRowToDish(row: Record<string, unknown>): Dish {
  let tags: string[] = [];
  try {
    tags = JSON.parse(String(row.tags));
  } catch {
    tags = typeof row.tags === 'string' ? row.tags.split(',').map((t) => t.trim()) : [];
  }

  return {
    dish_id: String(row.dish_id),
    name: String(row.name),
    name_nl: row.name_nl ? String(row.name_nl) : String(row.name),
    description: String(row.description),
    description_nl: row.description_nl ? String(row.description_nl) : String(row.description),
    photo_url: String(row.photo_url),
    price: Number(row.price),
    category: row.category ? String(row.category) : 'Curries',
    tags: Array.isArray(tags) ? tags : [],
    daily_special: Number(row.daily_special) === 1 || Boolean(row.daily_special),
    is_available: Number(row.is_available) === 1 || Boolean(row.is_available),
    is_coming_soon: Number(row.is_coming_soon) === 1 || Boolean(row.is_coming_soon),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export class TursoDishRepository implements IDishRepository {
  private client: Client;
  private initialized = false;

  constructor(client?: Client) {
    this.client = client || getTursoClient();
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await initTursoSchema(this.client);
      await seedTursoIfEmpty(this.client);
      this.initialized = true;
    }
  }

  async findAll(): Promise<Dish[]> {
    await this.ensureInitialized();
    const res = await this.client.execute('SELECT * FROM dishes ORDER BY created_at ASC');
    return res.rows.map((r) => mapTursoRowToDish(r as unknown as Record<string, unknown>));
  }

  async findById(dishId: string): Promise<Dish | null> {
    await this.ensureInitialized();
    const res = await this.client.execute({
      sql: 'SELECT * FROM dishes WHERE dish_id = ?',
      args: [dishId],
    });
    if (res.rows.length === 0) return null;
    return mapTursoRowToDish(res.rows[0] as unknown as Record<string, unknown>);
  }

  async create(input: DishCreateInput): Promise<Dish> {
    await this.ensureInitialized();
    const dish_id = input.dish_id || `dish_${crypto.randomUUID().replace(/-/g, '').slice(0, 8)}`;
    const now = new Date().toISOString();
    const daily_special = input.daily_special ?? false;
    const is_available = input.is_available ?? true;
    const is_coming_soon = input.is_coming_soon ?? false;
    const category = input.category || 'Curries';
    const name_nl = input.name_nl || input.name;
    const description_nl = input.description_nl || input.description;
    const tagsJson = JSON.stringify(input.tags || []);

    await this.client.execute({
      sql: `
        INSERT INTO dishes (
          dish_id, name, name_nl, description, description_nl, photo_url, price, category, tags, daily_special, is_available, is_coming_soon, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        dish_id,
        input.name,
        name_nl,
        input.description,
        description_nl,
        input.photo_url,
        input.price,
        category,
        tagsJson,
        daily_special ? 1 : 0,
        is_available ? 1 : 0,
        is_coming_soon ? 1 : 0,
        now,
        now,
      ],
    });

    return {
      dish_id,
      name: input.name,
      name_nl,
      description: input.description,
      description_nl,
      photo_url: input.photo_url,
      price: input.price,
      category,
      tags: input.tags,
      daily_special,
      is_available,
      is_coming_soon,
      created_at: now,
      updated_at: now,
    };
  }

  async update(dishId: string, input: DishUpdateInput): Promise<Dish | null> {
    await this.ensureInitialized();
    const existing = await this.findById(dishId);
    if (!existing) return null;

    const updatedDish: Dish = {
      dish_id: existing.dish_id,
      name: input.name !== undefined ? input.name : existing.name,
      name_nl: input.name_nl !== undefined ? input.name_nl : existing.name_nl,
      description: input.description !== undefined ? input.description : existing.description,
      description_nl: input.description_nl !== undefined ? input.description_nl : existing.description_nl,
      photo_url: input.photo_url !== undefined ? input.photo_url : existing.photo_url,
      price: input.price !== undefined ? input.price : existing.price,
      category: input.category !== undefined ? input.category : (existing.category || 'Curries'),
      tags: input.tags !== undefined ? input.tags : existing.tags,
      daily_special: input.daily_special !== undefined ? input.daily_special : existing.daily_special,
      is_available: input.is_available !== undefined ? input.is_available : existing.is_available,
      is_coming_soon: input.is_coming_soon !== undefined ? input.is_coming_soon : (existing.is_coming_soon || false),
      created_at: existing.created_at,
      updated_at: new Date().toISOString(),
    };

    await this.client.execute({
      sql: `
        UPDATE dishes SET
          name = ?,
          name_nl = ?,
          description = ?,
          description_nl = ?,
          photo_url = ?,
          price = ?,
          category = ?,
          tags = ?,
          daily_special = ?,
          is_available = ?,
          is_coming_soon = ?,
          updated_at = ?
        WHERE dish_id = ?
      `,
      args: [
        updatedDish.name,
        updatedDish.name_nl ?? null,
        updatedDish.description,
        updatedDish.description_nl ?? null,
        updatedDish.photo_url,
        updatedDish.price,
        updatedDish.category || 'Curries',
        JSON.stringify(updatedDish.tags),
        updatedDish.daily_special ? 1 : 0,
        updatedDish.is_available ? 1 : 0,
        updatedDish.is_coming_soon ? 1 : 0,
        updatedDish.updated_at,
        dishId,
      ],
    });

    return updatedDish;
  }

  async delete(dishId: string): Promise<boolean> {
    await this.ensureInitialized();
    const res = await this.client.execute({
      sql: 'DELETE FROM dishes WHERE dish_id = ?',
      args: [dishId],
    });
    return res.rowsAffected > 0;
  }

  async count(): Promise<number> {
    await this.ensureInitialized();
    const res = await this.client.execute('SELECT COUNT(*) as count FROM dishes');
    return Number(res.rows[0]?.count ?? 0);
  }
}

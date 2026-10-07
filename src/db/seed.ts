import { DatabaseSync } from 'node:sqlite';
import { getDatabase, initSchema, seedIfEmpty } from './sqlite';
import { SEED_DISHES } from './seed-data';
import { getTursoClient, initTursoSchema, seedTursoIfEmpty } from './turso';

export function seedDatabase(db?: DatabaseSync, force = false): { count: number; seeded: boolean } {
  const database = db || getDatabase();
  initSchema(database);

  if (force) {
    database.exec('DELETE FROM dishes;');
    const insertStmt = database.prepare(`
      INSERT INTO dishes (
        dish_id, name, name_nl, description, description_nl, photo_url, price, category, tags, daily_special, is_available, is_coming_soon, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const dish of SEED_DISHES) {
      insertStmt.run(
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
        dish.updated_at
      );
    }
    return { count: SEED_DISHES.length, seeded: true };
  }

  const seededCount = seedIfEmpty(database);
  const totalRow = database.prepare('SELECT COUNT(*) as count FROM dishes').get() as { count: number };
  return { count: totalRow.count, seeded: seededCount > 0 };
}

export async function seedTurso(force = false): Promise<{ count: number; seeded: boolean }> {
  const client = getTursoClient();
  await initTursoSchema(client);

  if (force) {
    await client.execute('DELETE FROM dishes;');
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
    return { count: SEED_DISHES.length, seeded: true };
  }

  const seededCount = await seedTursoIfEmpty(client);
  const totalRes = await client.execute('SELECT COUNT(*) as count FROM dishes');
  const count = Number(totalRes.rows[0]?.count ?? 0);
  return { count, seeded: seededCount > 0 };
}

// If executed directly from command line
if (typeof process !== 'undefined' && process.argv[1]?.replace(/\\/g, '/').endsWith('src/db/seed.ts')) {
  if (process.env.TURSO_DATABASE_URL) {
    console.log('Seeding Turso cloud database...');
    seedTurso(true)
      .then((result) => {
        console.log(`Successfully seeded ${result.count} dishes to Turso!`);
      })
      .catch((err) => {
        console.error('Error seeding Turso:', err);
        process.exit(1);
      });
  } else {
    console.log('Seeding Desi Dutch SQLite database...');
    const result = seedDatabase(undefined, true);
    console.log(`Successfully seeded ${result.count} dishes!`);
  }
}

import { getDb } from './server/db.ts';
import { products } from './drizzle/schema.ts';
import { like } from 'drizzle-orm';

const db = await getDb();
if (!db) {
  console.log('No DB');
  process.exit(1);
}

const result = await db.select().from(products).where(like(products.category, '%1000%'));
console.log('1000 Series products:', result.length);
result.forEach(p => console.log(`  - ${p.code}: ${p.nameEn}`));

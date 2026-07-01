import { getDb } from './server/db.ts';
import { products } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';

const db = await getDb();
const result = await db.select().from(products).where(eq(products.category, 'Other'));
result.forEach(p => {
  console.log(`${p.id}: ${p.name} - ${p.descriptionEn ? '✓' : '✗'}`);
});

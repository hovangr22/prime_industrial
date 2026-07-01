import { getDb } from './server/db.ts';
import { products } from './drizzle/schema.ts';
import { like } from 'drizzle-orm';

const db = await getDb();
if (!db) process.exit(1);

const result = await db.select().from(products).where(like(products.category, '%2000%'));
result.sort((a, b) => {
  const aNum = parseInt(a.code.match(/\d+/)?.[0] || "0");
  const bNum = parseInt(b.code.match(/\d+/)?.[0] || "0");
  return aNum - bNum;
});

console.log('2000 Series products:');
result.forEach(p => console.log(`${p.code}: ${p.nameEn}`));

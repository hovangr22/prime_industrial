import { getDb } from './server/db.ts';
import { products } from './drizzle/schema.ts';

const db = await getDb();
if (!db) {
  console.log('No DB');
  process.exit(1);
}

const allProducts = await db.select().from(products);
const byCategory = {};
allProducts.forEach(p => {
  if (!byCategory[p.category]) byCategory[p.category] = [];
  byCategory[p.category].push(p);
});

Object.keys(byCategory).sort((a, b) => {
  const aNum = parseInt(a.match(/\d+/)?.[0] || "999999");
  const bNum = parseInt(b.match(/\d+/)?.[0] || "999999");
  return aNum - bNum;
}).forEach(cat => {
  const count = byCategory[cat].length;
  console.log(`${cat}: ${count} products`);
});

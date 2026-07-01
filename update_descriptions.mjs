import { getDb } from './server/db.ts';
import { products } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';
import fs from 'fs';

const db = await getDb();

// Load all description files
const descriptions2000 = JSON.parse(fs.readFileSync('./2000_series_descriptions.json', 'utf-8'));
const descriptions3000 = JSON.parse(fs.readFileSync('./3000_series_descriptions.json', 'utf-8'));
const descriptions4000 = JSON.parse(fs.readFileSync('./4000_series_descriptions.json', 'utf-8'));
const descriptions5000 = JSON.parse(fs.readFileSync('./5000_series_descriptions.json', 'utf-8'));
const descriptionsOther = JSON.parse(fs.readFileSync('./other_products_descriptions.json', 'utf-8'));

// Combine all descriptions
const allDescriptions = {
  ...descriptions2000,
  ...descriptions3000,
  ...descriptions4000,
  ...descriptions5000,
  ...descriptionsOther
};

console.log(`Updating ${Object.keys(allDescriptions).length} products...`);

let updated = 0;
for (const [productId, desc] of Object.entries(allDescriptions)) {
  try {
    await db
      .update(products)
      .set({
        descriptionEn: desc.descriptionEn,
        descriptionEl: desc.descriptionEl
      })
      .where(eq(products.id, productId));
    updated++;
    console.log(`✓ Updated ${productId}`);
  } catch (error) {
    console.error(`✗ Failed to update ${productId}:`, error.message);
  }
}

console.log(`\nCompleted! Updated ${updated} products.`);
process.exit(0);

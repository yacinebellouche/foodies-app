import sql from "better-sqlite3";
import slugify from "slugify";
import fs from "node:fs";
import xss from "xss";
const db = sql("meals.db");
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //throw Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all(); // all for multiple rows and get() for single row
}
export function getMealById(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug); // all for multiple rows and get() for single row
}

// install slugify and xss ( helps protect against cross-site scripting attacks)
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });
  //no need to include the public folder
  meal.image = `/images/${fileName}`;
  db.prepare(
    `
    INSERT INTO meals (title,summary,instructions,creator,creator_email, image, slug ) VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
    `
  ).run(meal);
}

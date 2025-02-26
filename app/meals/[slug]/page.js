import classes from "./page.module.css";
import Image from "next/image";
import { getMealById } from "@/lib/meals";
import { notFound } from "next/navigation";

//for dynamic metaData
export async function generatedMetadata({}) {
  const meal = getMealById(params.meal.slug);
  if (!meal) {
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetailPage({ params }) {
  const meal = getMealById(params.slug);
  if (!meal) {
    notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}></a>
            {meal.creator}
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
        <h1 style={{ color: "white", textAlign: "center" }}></h1>
      </main>
    </>
  );
}

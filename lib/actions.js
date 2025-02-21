// use a seperated action file so you prevent any errors related to having both use client and use server in the same component
"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
export async function shareMeal(formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    image: formData.get("image"),
  };
  await saveMeal(meal);
  redirect();
}

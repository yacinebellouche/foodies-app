"use client";
import { useFormStatus } from "react-dom";

export default function MealsFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button disable={pending}>
      {" "}
      {pending ? "Submitting..." : "Share Meal"}{" "}
    </button>
  );
}

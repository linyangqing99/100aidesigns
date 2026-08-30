import type { Metadata } from "next";

import { GranolaStudyApp } from "../../../designs/003-granola-study/site/src/GranolaStudyApp";

export const metadata: Metadata = {
  title: "Granola Homepage Study | Afterword",
  description: "An independent homepage reproduction study that transfers Granola's visual rhythm into the original Afterword product concept.",
  alternates: { canonical: "/studies/003-granola-homepage" },
};

export default function GranolaHomepageStudyPage() {
  return <GranolaStudyApp assetBase="/studies/003-granola" />;
}

import type { Metadata } from "next";
import { GuidePage, ImmigrationNote } from "@/components/GuidePage";

export const metadata: Metadata = {
  title: "Study in Canada — guide",
  description:
    "A step-by-step guide for international students: choosing a program, getting a Canadian study permit, and settling in.",
};

export default function StudyInCanadaPage() {
  return (
    <GuidePage
      href="/store/study-in-canada"
      lede="Everything you need to go from “I want to study in Canada” to your first week on campus — picking a program, getting your study permit, budgeting, and settling in — in one practical, step-by-step guide."
      tags={["International students", "Study permit", "Canada"]}
      audience={[
        "Students outside Canada planning a college or university program here.",
        "Parents and sponsors who want to understand the costs and the study permit process.",
        "Anyone weighing Newfoundland and Labrador — Memorial University or College of the North Atlantic — against the bigger cities.",
      ]}
      chapters={[
        {
          title: "Choosing a program and school",
          body: "How to compare programs, confirm a school is a designated learning institution (DLI), pick an intake, and weigh tuition and living costs city by city.",
        },
        {
          title: "Applying for admission",
          body: "Transcripts, language tests, statements of purpose, references and deadlines — what schools look for and how to put a strong application together.",
        },
        {
          title: "Your study permit",
          body: "The provincial attestation letter, proof of funds, biometrics and medical exams, and the most common reasons applications are refused.",
        },
        {
          title: "Money and budgeting",
          body: "Tuition, living costs and proof of funds, opening a Canadian bank account, and building a realistic first-year budget.",
        },
        {
          title: "Arriving and settling in",
          body: "What happens at the border, finding housing, getting your SIN, a phone plan and health coverage — and getting ready for your first winter.",
        },
        {
          title: "Working during and after your studies",
          body: "The rules for working on and off campus, co-op terms, the Post-Graduation Work Permit, and pathways to permanent residence.",
        },
        {
          title: "Studying in Newfoundland",
          body: "Why St. John’s is worth a look: Memorial University, a lower cost of living than Toronto or Vancouver, and what life on the island is really like.",
        },
      ]}
      note={<ImmigrationNote officialUrl="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html" />}
    />
  );
}

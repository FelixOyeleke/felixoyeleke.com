import type { Metadata } from "next";
import { GuidePage, ImmigrationNote } from "@/components/GuidePage";

export const metadata: Metadata = {
  title: "Canada PR — guide",
  description:
    "A step-by-step guide to Canadian permanent residence: finding your pathway, building an Express Entry profile, and applying after your invitation.",
};

export default function CanadaPrPage() {
  return (
    <GuidePage
      href="/store/canada-pr"
      lede="A plain-language walkthrough of applying for Canadian permanent residence — working out which program fits you, building a strong profile, and the documents and steps that follow once you’re invited to apply."
      tags={["Permanent residence", "Express Entry", "Canada"]}
      audience={[
        "International students and graduates planning their next step after a Post-Graduation Work Permit.",
        "Temporary workers already in Canada who want to stay for good.",
        "Skilled workers abroad exploring Express Entry or a provincial program.",
      ]}
      chapters={[
        {
          title: "Finding your pathway",
          body: "Express Entry’s three programs — Canadian Experience Class, Federal Skilled Worker and Federal Skilled Trades — compared with provincial nominee programs and the Atlantic Immigration Program.",
        },
        {
          title: "Your Express Entry profile",
          body: "How the Comprehensive Ranking System works, what earns points, and practical ways to raise your score.",
        },
        {
          title: "Language tests and credentials",
          body: "Choosing an approved English or French test, preparing for it, and getting an educational credential assessment (ECA).",
        },
        {
          title: "Provincial nomination",
          body: "How provincial nominee programs work, including Newfoundland and Labrador’s, and how a nomination changes your chances.",
        },
        {
          title: "After your invitation",
          body: "Putting the application together — work reference letters, police certificates, medical exams and proof of funds — and avoiding the mistakes that lead to refusals.",
        },
        {
          title: "From student to permanent resident",
          body: "Planning the route from study permit to Post-Graduation Work Permit to PR, so your Canadian work experience counts.",
        },
        {
          title: "Landing and your first steps",
          body: "Confirming your permanent residence, getting your PR card, and what changes for work, study and healthcare.",
        },
      ]}
      note={<ImmigrationNote officialUrl="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html" />}
    />
  );
}

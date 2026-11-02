import type { Metadata } from "next";
import { GuidePage } from "@/components/GuidePage";

export const metadata: Metadata = {
  title: "First-Time Home Buyer — guide",
  description:
    "A step-by-step guide to buying your first home in Newfoundland and Labrador: pre-approval, down payment, making an offer and closing.",
};

export default function FirstTimeHomeBuyerPage() {
  return (
    <GuidePage
      href="/store/first-time-home-buyer"
      lede="Buying your first home in Newfoundland and Labrador, start to finish — knowing when you’re ready, getting pre-approved, finding the right place, making a strong offer, and what happens between an accepted offer and getting your keys."
      tags={["First-time buyers", "Mortgages", "Newfoundland and Labrador"]}
      audience={[
        "First-time buyers in St. John’s and across Newfoundland and Labrador.",
        "Newcomers and new permanent residents buying their first Canadian home.",
        "Renters trying to work out whether they’re ready to buy.",
      ]}
      chapters={[
        {
          title: "Are you ready to buy?",
          body: "Renting versus buying, checking your credit, building savings, and working out what you can comfortably afford — not just what a lender will approve.",
        },
        {
          title: "Getting pre-approved",
          body: "How mortgage pre-approval works, the mortgage stress test, fixed versus variable rates, and choosing between a bank and a mortgage broker.",
        },
        {
          title: "Down payment and first-time buyer programs",
          body: "Minimum down payment rules, mortgage default insurance, the First Home Savings Account, the RRSP Home Buyers’ Plan and the first-time home buyers’ tax credit.",
        },
        {
          title: "Closing costs",
          body: "The costs on top of the price — legal fees, registration, property tax adjustments, inspection and home insurance — so closing day holds no surprises.",
        },
        {
          title: "Finding the right home",
          body: "Neighbourhoods in St. John’s, Mount Pearl, Paradise and Conception Bay South, searching listings, and what to look for in older homes and Newfoundland winters.",
        },
        {
          title: "Making an offer",
          body: "How offers and conditions work, financing and inspection conditions, deposits, and negotiating in a competitive market.",
        },
        {
          title: "From accepted offer to keys",
          body: "Home inspection, appraisal, working with your lawyer, final walk-through and what happens on closing day.",
        },
        {
          title: "Buying as a newcomer",
          body: "Building Canadian credit, mortgage options for newcomers, and what the federal rules on non-Canadian buyers mean for you.",
        },
      ]}
      note={
        <>
          This guide is general information, not financial, legal or mortgage advice, and programs and rules change.
          Check current details with{" "}
          <a href="https://www.cmhc-schl.gc.ca/consumers/home-buying" rel="noreferrer">
            CMHC
          </a>{" "}
          and talk to a mortgage professional and a real estate lawyer about your own situation. Felix Oyeleke is a
          REALTOR® with eXp Realty.
        </>
      }
    />
  );
}

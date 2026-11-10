import type { Metadata } from "next";
import { BlogPostPage } from "@/components/BlogPostPage";
import { DetailCards, StatusList } from "@/components/Article";
import { brandLogos, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Difference Between a Demo and a Production Tool",
  description:
    "The practical gap between software that works once and software people can rely on every day: failure states, observability, documentation and ownership.",
  openGraph: { type: "article", title: "The Difference Between a Demo and a Production Tool" },
};

export default function DemoToProductionPost() {
  return (
    <BlogPostPage
      slug="demo-to-production-tool"
      logo={brandLogos.dolphinExplorer}
      eyebrow="Software delivery · Systems notes"
      date="2026-07"
      title="The difference between a demo and a production tool"
      lede="A demo proves that something is possible. A production tool proves that people can depend on it when the input is messy, the network is slow and the original builder is not in the room."
      tags={["Software", "Delivery", "Systems"]}
      stats={[
        { label: "Demo question", value: "Can it work?", note: "one successful path" },
        { label: "Production question", value: "Can it fail well?", note: "under real constraints" },
        { label: "Often missed", value: "Ownership", note: "who maintains the result" },
      ]}
      tldr="The gap is not polish. It is the set of decisions that make a tool predictable: clear inputs, useful errors, visible state, repeatable deployment and a person who owns the next change."
      cta={{
        title: "Have a useful tool stuck in demo mode?",
        body: "I help turn repeated technical work into small, dependable systems.",
        href: `mailto:${site.email}?subject=Production%20tool`,
        action: "Talk through the next step",
      }}
    >
      <h2>A happy path is only the beginning</h2>
      <p>
        A demo usually starts with a clean input and ends with an impressive output. That is exactly what it should do.
        The next step is asking what happens when the file is incomplete, the API times out, a user repeats the action or
        the result needs to be explained six months later.
      </p>
      <DetailCards
        cards={[
          { title: "Inputs", body: "Define what the tool accepts, reject what it cannot handle and show the user how to recover." },
          { title: "State", body: "Make progress, waiting, partial success and failure visible instead of leaving users guessing." },
          { title: "Evidence", body: "Keep logs, source references and output metadata so results can be checked later." },
          { title: "Ownership", body: "Name who deploys it, supports it and decides when a change is safe to release." },
        ]}
      />

      <h2>Make failure a designed state</h2>
      <p>
        Users can work with a tool that fails occasionally if it tells them what happened and what to do next. They lose
        trust when a spinner runs forever, an error says “something went wrong” or a partial result looks complete.
      </p>
      <ul>
        <li><strong>Validate early:</strong> catch missing fields and unsupported files before expensive work begins.</li>
        <li><strong>Preserve partial progress:</strong> let a long job resume or show which inputs completed.</li>
        <li><strong>Use plain errors:</strong> explain the cause, impact and next action in the same place.</li>
      </ul>

      <h2>Production is an evidence problem</h2>
      <p>
        When a tool produces a number, map or classification, the user needs enough evidence to decide whether to act on
        it. That can be a source file, timestamp, processing version, quality flag or a short audit trail. The right
        amount depends on the job, but “trust me” is never an interface.
      </p>

      <h2>A small release checklist</h2>
      <StatusList
        items={[
          { done: true, text: "The main task works from a fresh install with representative input." },
          { done: true, text: "Users can tell whether the tool is running, finished, partially complete or failed." },
          { done: false, text: "Logs and output metadata make a result diagnosable without the original developer." },
          { done: false, text: "A named owner can update dependencies, respond to failures and review future changes." },
        ]}
      />
      <p>
        The difference between a demo and a production tool is a collection of small acts of care. Add enough of them and
        the software stops being a performance and starts becoming part of how the work gets done.
      </p>
    </BlogPostPage>
  );
}

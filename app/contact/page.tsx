import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro, PageSection } from "@/components/Section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Felix Oyeleke.",
};

export default function ContactPage() {
  return (
    <main className="inner-page">
      <PageIntro
        eyebrow="Contact"
        title={
          <>
            Have a system
            <br />
            worth improving?
          </>
        }
      >
        <p>
          Tell me what you’re working on. I’m always interested in thoughtful technical problems, useful
          collaborations and better ways to move from data to action.
        </p>
      </PageIntro>
      <PageSection>
        <div className="contact-grid">
          <ContactForm />
          <aside className="contact-aside">
            <h2>Elsewhere</h2>
            <p>
              The fastest way to reach me is email. You can also find my professional updates and open-source work
              online.
            </p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </aside>
        </div>
      </PageSection>
    </main>
  );
}

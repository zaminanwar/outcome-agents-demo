import { ContactForm } from "@/components/outcome/contact-form";
import { Flag } from "@/components/outcome/review";
import { Section } from "@/components/section";

export function Contact() {
  return (
    <Section
      id="contact"
      title="Tell us about the process."
      lede={
        <span data-flag="contact">
          Which process, roughly how many a month, and who owns the number
          today. This form sends nothing: it composes a draft you copy or open
          in your mail app.
          <Flag id="contact" />
        </span>
      }
    >
      <ContactForm />
    </Section>
  );
}

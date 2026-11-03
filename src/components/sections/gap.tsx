import { GapTable } from "@/components/outcome/gap-table";
import { Section } from "@/components/section";

export function Gap() {
  return (
    <Section
      id="gap"
      title="The gap between a licence and a process."
      lede="Individual Copilot use helps individuals. It does not change how the process behaves, who owns its output, or what you can measure. Side by side:"
      flag="gap"
    >
      <GapTable />
    </Section>
  );
}

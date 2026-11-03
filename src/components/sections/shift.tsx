import { ShiftDiagram } from "@/components/outcome/shift-diagram";
import { Section } from "@/components/section";

export function Shift() {
  return (
    <Section
      id="shift"
      title="The same process, before and after."
      flag="diagram"
      muted
    >
      <ShiftDiagram />
      <p className="mt-6 max-w-2xl text-pretty text-muted-foreground">
        Nothing is removed. The person moves from the middle of the lane to the
        approval seat. Copilot moves from a window they visit to a step inside
        the process. Every arrow that used to point into the person now points
        from the process to them.
      </p>
    </Section>
  );
}

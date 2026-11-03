import {
  GaugeIcon,
  PackageCheckIcon,
  UserCheckIcon,
  WorkflowIcon,
} from "lucide-react";

import { Section } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GET } from "@/lib/content";

const ICONS = {
  workflow: WorkflowIcon,
  "user-check": UserCheckIcon,
  gauge: GaugeIcon,
  "package-check": PackageCheckIcon,
} as const;

export function Get() {
  return (
    <Section id="get" title="What you get." muted>
      <ul className="grid gap-4 sm:grid-cols-2">
        {GET.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li key={item.title}>
              <Card className="h-full">
                <CardHeader>
                  <span className="mb-2 flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
                    <Icon className="size-4" />
                  </span>
                  <CardTitle className="text-lg leading-snug text-balance">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{item.body}</CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

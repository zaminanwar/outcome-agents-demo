import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GAP } from "@/lib/content";

/** Side by side on wide screens; one card per row on phones. */
export function GapTable() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 sm:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-44 pl-4">
                <span className="sr-only">Aspect</span>
              </TableHead>
              <TableHead className="text-muted-foreground">Copilot, one person at a time</TableHead>
              <TableHead className="pr-4">A process agent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {GAP.map(([k, a, b]) => (
              <TableRow key={k}>
                <TableCell className="pl-4 font-medium whitespace-nowrap">{k}</TableCell>
                <TableCell className="text-muted-foreground">{a}</TableCell>
                <TableCell className="pr-4">{b}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ul className="grid gap-3 sm:hidden">
        {GAP.map(([k, a, b]) => (
          <li key={k}>
            <Card size="sm">
              <CardHeader>
                <CardTitle>{k}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm">
                <div className="grid grid-cols-[4.5rem_1fr] gap-2">
                  <span className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                    Copilot
                  </span>
                  <span className="text-muted-foreground">{a}</span>
                </div>
                <div className="grid grid-cols-[4.5rem_1fr] gap-2">
                  <span className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                    Agent
                  </span>
                  <span>{b}</span>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}

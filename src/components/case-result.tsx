import type { CaseDetails } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Users, Scale, Calendar, ChevronsRight, FileText } from 'lucide-react';
import { Badge } from './ui/badge';

function InfoField({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | React.ReactNode }) {
    return (
        <div className="flex flex-col space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
                <Icon className="mr-2 h-4 w-4" />
                {label}
            </div>
            <div className="text-lg font-semibold">{value}</div>
        </div>
    );
}

export function CaseResult({ details }: { details: CaseDetails }) {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Scale className="h-6 w-6" /> Case Status: {details.caseType} No. {details.caseNumber}/{details.year}
          </CardTitle>
          <CardDescription>
            Latest information for the selected case.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
            <InfoField 
                icon={Users} 
                label="Parties"
                value={`${details.petitioner} vs. ${details.respondent}`}
            />
            <InfoField 
                icon={Badge} 
                label="Current Status"
                value={<Badge variant="secondary" className="text-base">{details.status}</Badge>}
            />
            <InfoField 
                icon={Calendar} 
                label="Filing Date"
                value={details.filingDate}
            />
            <InfoField 
                icon={ChevronsRight} 
                label="Next Hearing"
                value={details.nextHearingDate}
            />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FileText className="h-6 w-6" /> Orders & Judgments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {details.orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{order.date}</TableCell>
                  <TableCell>{order.description}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} >
                      <a href={order.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

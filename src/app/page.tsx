
"use client";

import { useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Gavel } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { fetchCaseDetailsAction } from "@/app/actions";
import type { CaseFetchResult } from "@/lib/types";
import { CaseResult } from "@/components/case-result";
import { Skeleton } from "@/components/ui/skeleton";

const initialState: CaseFetchResult = { success: false, error: null };

const caseTypes = ["W.P.(C)", "CS(OS)", "FAO", "RFA", "CRL.M.C.", "CONT.CAS(C)"];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1989 }, (_, i) => (currentYear - i).toString());

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Searching..." : "Search Case"}
    </Button>
  );
}

function ResultSkeleton() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-6 w-3/4" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-6 w-3/4" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/3" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                        <div className="flex justify-between items-center">
                             <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-5 w-2/3" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function Home() {
  const [state, formAction] = useActionState(fetchCaseDetailsAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.success === false && state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <div className="min-h-full bg-background font-sans text-foreground">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                Court Case Tracker
              </h1>
            </div>
            <p className="mt-2 text-lg text-muted-foreground">
              Enter the details below to fetch the latest case information and orders from the Delhi High Court.
            </p>
          </div>

          <Card className="mt-10">
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
              <CardDescription>Select case type, number, and year to begin.</CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} action={formAction} className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="caseType">Case Type</Label>
                  <Select name="caseType" required>
                    <SelectTrigger id="caseType">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      {caseTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caseNumber">Case Number</Label>
                  <Input id="caseNumber" name="caseNumber" type="number" placeholder="e.g., 12345" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Filing Year</Label>
                  <Select name="year" required>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select a year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-3">
                  <SubmitButton />
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-12">
            {pending && <ResultSkeleton />}
            {!pending && state.success && <CaseResult details={state.data} />}
          </div>
        </div>
      </main>
    </div>
  );
}

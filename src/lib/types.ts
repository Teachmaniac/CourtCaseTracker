import { z } from "zod";

export const GenerateCaseDetailsInputSchema = z.object({
  caseType: z.string().min(1, 'Case type is required.'),
  caseNumber: z.string().min(1, 'Case number is required.').regex(/^\d+$/, "Case number must be a number."),
  year: z.string().min(4, 'Year is required.'),
});
export type GenerateCaseDetailsInput = z.infer<typeof GenerateCaseDetailsInputSchema>;

export const GenerateCaseDetailsOutputSchema = z.object({
  petitioner: z.string().describe('The name of the petitioner. Should be a creative, fictional name.'),
  respondent: z.string().describe('The name of the respondent. Should be a creative, fictional name.'),
  filingDate: z.string().describe("The filing date of the case in DD-MM-YYYY format. Should be a plausible date within the given year."),
  nextHearingDate: z.string().describe("The next hearing date in DD-MM-YYYY format. Should be a plausible date after the filing date."),
  status: z.enum(['Pending', 'Admitted', 'Disposed', 'Rejected']).describe('The current status of the case.'),
  orders: z.array(z.object({
    date: z.string().describe('The date of the order in DD-MM-YYYY format.'),
    description: z.string().describe('A brief, realistic description of the court order.'),
    pdfUrl: z.string().describe("A placeholder URL for the PDF. Should be '#'.")
  })).describe('A list of 2 to 4 court orders for the case, with the most recent first.'),
});
export type GenerateCaseDetailsOutput = z.infer<typeof GenerateCaseDetailsOutputSchema>;

export interface Order {
  date: string;
  description: string;
  pdfUrl: string;
}

export interface CaseDetails extends GenerateCaseDetailsOutput {
  caseType: string;
  caseNumber: string;
  year: string;
}

export type CaseFetchResult = {
  success: true;
  data: CaseDetails;
} | {
  success: false;
  error: string | null;
};

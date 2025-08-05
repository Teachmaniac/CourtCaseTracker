export interface Order {
  date: string;
  description: string;
  pdfUrl: string;
}

export interface CaseDetails {
  caseType: string;
  caseNumber: string;
  year: string;
  petitioner: string;
  respondent: string;
  filingDate: string;
  nextHearingDate: string;
  status: string;
  orders: Order[];
}

export type CaseFetchResult = {
  success: true;
  data: CaseDetails;
} | {
  success: false;
  error: string | null;
};

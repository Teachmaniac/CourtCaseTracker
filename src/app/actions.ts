'use server';

import { z } from 'zod';
import type { CaseFetchResult } from '@/lib/types';

const formSchema = z.object({
  caseType: z.string().min(1, 'Case type is required.'),
  caseNumber: z.string().min(1, 'Case number is required.').regex(/^\d+$/, "Case number must be a number."),
  year: z.string().min(4, 'Year is required.'),
});

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchCaseDetailsAction(
  prevState: any,
  formData: FormData
): Promise<CaseFetchResult> {
  try {
    const validatedFields = formSchema.safeParse({
      caseType: formData.get('caseType'),
      caseNumber: formData.get('caseNumber'),
      year: formData.get('year'),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.errors.map((e) => e.message).join(', '),
      };
    }

    const { caseNumber, caseType, year } = validatedFields.data;

    await delay(1500);

    if (caseNumber === '9999') {
      return {
        success: false,
        error: 'Case not found. Please check the details and try again.',
      };
    }
    
    if (caseNumber === '500') {
      return {
          success: false,
          error: 'The court website appears to be down. Please try again later.'
      }
    }

    return {
      success: true,
      data: {
        caseType,
        caseNumber,
        year,
        petitioner: 'John Doe & Associates',
        respondent: 'Jane Smith Corp.',
        filingDate: '15-03-2023',
        nextHearingDate: '28-08-2024',
        status: 'Pending',
        orders: [
          {
            date: '10-07-2024',
            description: 'Order on application for interim relief.',
            pdfUrl: '#',
          },
          {
            date: '25-05-2024',
            description: 'Scheduling order for next hearing.',
            pdfUrl: '#',
          },
          {
            date: '02-04-2024',
            description: 'Notice of appearance filed by respondent.',
            pdfUrl: '#',
          },
          {
            date: '15-03-2023',
            description: 'Initial case filing document.',
            pdfUrl: '#',
          },
        ],
      },
    };
  } catch (e) {
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}

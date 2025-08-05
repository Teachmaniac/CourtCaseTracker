'use server';

import { z } from 'zod';
import type { CaseFetchResult } from '@/lib/types';
import { generateCaseDetails } from '@/ai/flows/generate-case-details';
import { GenerateCaseDetailsInputSchema } from '@/lib/types';

const formSchema = GenerateCaseDetailsInputSchema;

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
        error: validatedFields.error.flatten().fieldErrors.caseType?.[0] || validatedFields.error.flatten().fieldErrors.caseNumber?.[0] || validatedFields.error.flatten().fieldErrors.year?.[0] || 'Invalid input.',
      };
    }

    const { caseNumber, caseType, year } = validatedFields.data;
    
    // For demonstration, we still keep some specific mock error cases
    if (caseNumber === '9999') {
      await delay(1000);
      return {
        success: false,
        error: 'Case not found. Please check the details and try again.',
      };
    }
    
    if (caseNumber === '500') {
      await delay(1000);
      return {
          success: false,
          error: 'The court website appears to be down. Please try again later.'
      }
    }

    // Call the AI flow to generate dynamic case details
    const aiGeneratedDetails = await generateCaseDetails({ caseNumber, caseType, year });

    return {
      success: true,
      data: {
        caseType,
        caseNumber,
        year,
        ...aiGeneratedDetails
      },
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: 'An AI error occurred. Please try again.'
    }
  }
}

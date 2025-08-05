'use server';
/**
 * @fileOverview A flow for generating mock court case details.
 *
 * - generateCaseDetails - A function that handles the case detail generation process.
 */

import {ai} from '@/ai/genkit';
import { GenerateCaseDetailsInput, GenerateCaseDetailsInputSchema, GenerateCaseDetailsOutput, GenerateCaseDetailsOutputSchema } from '@/lib/types';


export async function generateCaseDetails(input: GenerateCaseDetailsInput): Promise<GenerateCaseDetailsOutput> {
  return generateCaseDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCaseDetailsPrompt',
  input: {schema: GenerateCaseDetailsInputSchema},
  output: {schema: GenerateCaseDetailsOutputSchema},
  prompt: `You are a helpful assistant that creates mock data for a court case tracking application. 
  
  Generate realistic details for the following case:
  Case Type: {{{caseType}}}
  Case Number: {{{caseNumber}}}
  Year: {{{year}}}
  
  Please generate the following fields with plausible, fictional data. The petitioner and respondent should be creative names of individuals or companies. The orders should be sorted with the most recent date first.
  `,
  config: {
    temperature: 1.0,
  }
});

const generateCaseDetailsFlow = ai.defineFlow(
  {
    name: 'generateCaseDetailsFlow',
    inputSchema: GenerateCaseDetailsInputSchema,
    outputSchema: GenerateCaseDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

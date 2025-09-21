'use server';

/**
 * @fileOverview An AI Art Style Guide agent.
 *
 * - getArtStyleGuide - A function that retrieves art style guidance based on a query.
 * - ArtStyleGuideInput - The input type for the getArtStyleGuide function.
 * - ArtStyleGuideOutput - The return type for the getArtStyleGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ArtStyleGuideInputSchema = z.object({
  query: z.string().describe('The query for art style guidance.'),
});
export type ArtStyleGuideInput = z.infer<typeof ArtStyleGuideInputSchema>;

const ArtStyleGuideOutputSchema = z.object({
  guidance: z.string().describe('The art style guidance based on the query.'),
});
export type ArtStyleGuideOutput = z.infer<typeof ArtStyleGuideOutputSchema>;

export async function getArtStyleGuide(input: ArtStyleGuideInput): Promise<ArtStyleGuideOutput> {
  return artStyleGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'artStyleGuidePrompt',
  input: {schema: ArtStyleGuideInputSchema},
  output: {schema: ArtStyleGuideOutputSchema},
  prompt: `You are an AI Art Style Guide, providing contextual advice and information to artists in the Cantiere Culturale.
  You draw upon an internal knowledge base of creative guidance to help artists enhance their artistic skills and create innovative art pieces.
  Respond to the following query with relevant art style guidance:

  Query: {{{query}}}`,
});

const artStyleGuideFlow = ai.defineFlow(
  {
    name: 'artStyleGuideFlow',
    inputSchema: ArtStyleGuideInputSchema,
    outputSchema: ArtStyleGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview An AI art style guide assistant.
 *
 * - getArtStyleGuide - A function that provides creative style guidance.
 * - ArtStyleGuideInput - The input type for the getArtStyleGuide function.
 * - ArtStyleGuideOutput - The return type for the getArtStyleGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ArtStyleGuideInputSchema = z.object({
  query: z.string().describe("The user's query for art style guidance."),
});
export type ArtStyleGuideInput = z.infer<typeof ArtStyleGuideInputSchema>;

const ArtStyleGuideOutputSchema = z.object({
  guidance: z.string().describe("The AI's creative and stylistic guidance in response to the user query."),
});
export type ArtStyleGuideOutput = z.infer<typeof ArtStyleGuideOutputSchema>;

export async function getArtStyleGuide(input: ArtStyleGuideInput): Promise<ArtStyleGuideOutput> {
  return artStyleGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'artStyleGuidePrompt',
  input: {schema: ArtStyleGuideInputSchema},
  output: {schema: ArtStyleGuideOutputSchema},
  prompt: `You are Sentry AI, a highly advanced creative assistant specializing in visual arts, design theory, and aesthetic styles. Your purpose is to provide artists, designers, and creators with deep, actionable insights and stylistic guidance.

You are not a generic chatbot. You provide expert-level analysis based on art history, design principles, and emerging trends. When a user asks for guidance, you should break down the core components of the requested style, suggesting color palettes, key motifs, emotional tones, and practical techniques.

Based on this persona, provide a comprehensive and inspiring style guide for the following user query.

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

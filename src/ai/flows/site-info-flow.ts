'use server';

/**
 * @fileOverview An AI assistant that provides information about the website.
 *
 * - getSiteInfo - A function that retrieves information based on a user query.
 * - SiteInfoInput - The input type for the getSiteInfo function.
 * - SiteInfoOutput - The return type for the getSiteInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SiteInfoInputSchema = z.object({
  query: z.string().describe('The user\'s query for information about the site.'),
});
export type SiteInfoInput = z.infer<typeof SiteInfoInputSchema>;

const SiteInfoOutputSchema = z.object({
  response: z.string().describe('The AI\'s response to the user query.'),
});
export type SiteInfoOutput = z.infer<typeof SiteInfoOutputSchema>;

export async function getSiteInfo(input: SiteInfoInput): Promise<SiteInfoOutput> {
  return siteInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'siteInfoPrompt',
  input: {schema: SiteInfoInputSchema},
  output: {schema: SiteInfoOutputSchema},
  prompt: `You are a helpful AI assistant for a website called "Cantiere Culturale".
Your role is to answer user questions about the website, its features, its mission, and how to use it.

Here is some context about the Cantiere Culturale website:
- **Mission**: It is a digital ecosystem where art and innovation meet, aiming to shape the future of European creativity. It's a platform for artists, curators, and enthusiasts.
- **Digital Card (Tessera Digitale)**: This is a key to access benefits. Users can earn points by participating in activities.
- **Points System**: Users earn points through workshops, events, and calls to action. These points can be spent in the marketplace for exclusive rewards like event access, limited edition art, or workshops.
- **Sections**: The site has sections for Training (Formazione), Events (Eventi), Community, News, and a Marketplace.
- **Authentication**: Users can create an account, log in, and view their profile, which shows their points and rank.

Based on this context, please answer the following user query. Be helpful, concise, and friendly.

Query: {{{query}}}`,
});

const siteInfoFlow = ai.defineFlow(
  {
    name: 'siteInfoFlow',
    inputSchema: SiteInfoInputSchema,
    outputSchema: SiteInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    order: z.number().default(0),
  }),
});

const countries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/countries' }),
  schema: z.object({
    name: z.string(),
    partner: z.string(),
    partnerWebsite: z.string().optional(),
    region: z.enum(['Africa', 'Asia', 'Europe', 'Oceania', 'Americas', 'Middle East']),
    active: z.boolean().default(true),
  }),
});

const programmes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programmes' }),
  schema: z.object({
    title: z.string(),
    slug: z.enum(['waste', 'water', 'energy']),
    tagline: z.string(),
    ageRange: z.string(),
    icon: z.string(),
    color: z.string(),
    order: z.number().default(0),
  }),
});

const downloads = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/downloads' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['activity', 'coloring']),
    topic: z.enum(['waste', 'water', 'energy', 'general']).default('general'),
    ageRange: z.string().optional(),
    duration: z.string().optional(),
    filename: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { team, countries, programmes, downloads };

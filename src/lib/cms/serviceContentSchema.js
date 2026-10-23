/**
 * The frontend mirror of the canonical CMS content contract.
 *
 * The source of truth is `syict-backend/src/schemas/serviceContent.schema.js`;
 * both sides carry the same `SERVICE_CONTENT_SCHEMA_VERSION`, so a document
 * written by the CMS editors is read back in one shape.
 */
import { z } from 'zod';

/** Bump this whenever the canonical shape changes. */
export const SERVICE_CONTENT_SCHEMA_VERSION = 1;

const HeroSchema = z.object({}).loose();

const SectionItemSchema = z.object({}).loose();

const SectionsSchema = z
    .object({
        pillars: z.array(SectionItemSchema).optional(),
        philosophies: z.array(SectionItemSchema).optional(),
        verticals: z.array(SectionItemSchema).optional(),
        phases: z.array(SectionItemSchema).optional(),
        integrations: z.array(SectionItemSchema).optional(),
        pricing: z.array(SectionItemSchema).optional(),
        metrics: z.array(SectionItemSchema).optional(),
        techStack: z.array(SectionItemSchema).optional(),
        checklist: z.array(SectionItemSchema).optional(),
        manifest: z.array(SectionItemSchema).optional(),
        roi: z.array(SectionItemSchema).optional(),
        codeSnippet: z.object({}).loose().optional(),
    })
    .loose();

const CtaSchema = z.object({}).loose();

export const PageBodySchema = z
    .object({
        hero: HeroSchema.optional(),
        sections: SectionsSchema.optional(),
        cta: CtaSchema.optional(),
    })
    .loose();

export const ServiceContentSchema = z
    .object({
        version: z.number().int().positive().default(SERVICE_CONTENT_SCHEMA_VERSION),
        pageType: z.string().min(1),
        landing: PageBodySchema.optional(),
        details: PageBodySchema.optional(),
        // Legacy flat body.
        hero: HeroSchema.optional(),
        sections: SectionsSchema.optional(),
        cta: CtaSchema.optional(),
        // Legacy career service body.
        methodology: z.array(SectionItemSchema).optional(),
    })
    .loose();

export const CareerServiceContentSchema = z
    .object({
        version: z.number().int().positive().default(SERVICE_CONTENT_SCHEMA_VERSION),
        pageType: z.string().min(1),
        landing: PageBodySchema.optional(),
        details: PageBodySchema.optional(),
        // Legacy career service body.
        hero: HeroSchema.optional(),
        methodology: z.array(SectionItemSchema).optional(),
        cta: CtaSchema.optional(),
    })
    .loose();

export default ServiceContentSchema;

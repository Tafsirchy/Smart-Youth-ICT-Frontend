/**
 * The read adapter for the CMS service pages.
 *
 * The pages used to pick the shape they needed by hand — `content.landing`,
 * `content.details`, `data.hero`, `data` — and each of the five shapes was
 * read a little differently. This adapter answers the two questions a page
 * actually has: "what is the landing content?" and "what is the details
 * content?", whatever shape the document was stored in.
 */

const isPlainObject = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

/**
 * Whether a page body carries any content.
 *
 * The API fills the nested objects of a document with empty arrays, so a
 * `landing` without a hero and without a single section is only a
 * placeholder — the real content may still sit in the flat body.
 */
const hasContent = (body) => {
    if (!isPlainObject(body)) return false;

    if (isPlainObject(body.hero) && Object.keys(body.hero).length > 0) return true;
    if (isPlainObject(body.cta) && Object.keys(body.cta).length > 0) return true;

    if (isPlainObject(body.sections)) {
        return Object.values(body.sections).some((entry) => {
            if (Array.isArray(entry)) return entry.length > 0;
            return isPlainObject(entry) && Object.keys(entry).length > 0;
        });
    }

    return false;
};

/** The flat body of a document, whether it carries content or not. */
const flatBody = (raw) => {
    if (!isPlainObject(raw)) return {};

    return { hero: raw.hero, sections: raw.sections, cta: raw.cta };
};

/** The landing body of a document, no matter which legacy shape it uses. */
export const resolveLanding = (raw) => {
    if (!isPlainObject(raw)) return null;

    // The canonical landing wins as soon as it holds content — a document
    // that was migrated keeps its old flat fields next to it.
    if (isPlainObject(raw.landing) && hasContent(raw.landing)) return raw.landing;

    // `{ hero, methodology, details, cta }` — the career service shape.
    if (Array.isArray(raw.methodology) && raw.methodology.length > 0) {
        return { hero: raw.hero, sections: { pillars: raw.methodology }, cta: raw.cta };
    }

    // `{ hero, sections, cta }` — the flat shape.
    const flat = flatBody(raw);
    if (hasContent(flat)) return flat;

    // Only the placeholder the API filled in.
    if (isPlainObject(raw.landing)) return raw.landing;

    return null;
};

/** The details body of a document, no matter which legacy shape it uses. */
export const resolveDetails = (raw) => {
    if (!isPlainObject(raw)) return null;

    if (isPlainObject(raw.details)) {
        const { hero, sections, cta } = raw.details;
        return { hero, sections, cta };
    }

    return null;
};

/**
 * Normalizes an API response into the canonical shape.
 *
 * @param {Object} content - the document as the API returned it
 * @returns {{ landing: Object|null, details: Object|null, hero: Object|null, sections: Object|null, cta: Object|null }}
 */
export const toServiceContent = (content) => {
    const raw = isPlainObject(content) ? content : null;
    const landing = resolveLanding(raw);
    const details = resolveDetails(raw);

    return {
        landing,
        details,
        hero: landing?.hero || null,
        sections: landing?.sections || details?.sections || null,
        cta: landing?.cta || details?.cta || null,
    };
};

export default toServiceContent;

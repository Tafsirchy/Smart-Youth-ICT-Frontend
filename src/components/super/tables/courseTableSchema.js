/**
 * Column and filter schema of the super admin master curriculum table.
 */

export const COURSE_PAGE_SIZE = 12;

/** Text a course row can be found by. */
export const courseSearchFields = [
    (course) => course?.title?.en,
    (course) => course?.category,
];

/**
 * Builds the filter predicate for the given sidebar state.
 *
 * @param {string[]} selectedCategories - the categories the user ticked
 * @param {{min: number, max: number}} priceRange - the selected price band
 */
export const courseFilter = (selectedCategories = [], priceRange = { min: 0, max: 50000 }) => {
    const categories = Array.isArray(selectedCategories) ? selectedCategories : [];
    const { min = 0, max = Number.MAX_SAFE_INTEGER } = priceRange || {};

    return (course) => {
        const matchesCategory = categories.length === 0 || categories.includes(course?.category);
        const price = Number(course?.price || 0);
        const matchesPrice = price >= min && price <= max;

        return matchesCategory && matchesPrice;
    };
};

export const courseColumns = [
    { key: 'title', label: 'Course', accessor: (course) => course?.title?.en },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price', accessor: (course) => course?.price || 0 },
    { key: 'level', label: 'Level' },
    { key: 'duration', label: 'Duration', accessor: (course) => course?.duration },
    { key: 'branches', label: 'Branches', accessor: (course) => course?.branchIds?.length || 0 },
    { key: 'status', label: 'Status', accessor: (course) => (course?.isPublished ? 'Published' : 'Draft') },
];

/**
 * Column and filter schema of the super admin branch table.
 *
 * The table definition lives here instead of inside the page so the page
 * only renders and the shared `useSuperTable` hook only reads.
 */

export const BRANCH_TYPE_FILTERS = {
    all: () => true,
    active: (branch) => Boolean(branch.isActive),
    inactive: (branch) => !branch.isActive,
    head_office: (branch) => branch.type === 'head_office',
    regional: (branch) => branch.type === 'regional',
    local: (branch) => branch.type === 'local',
};

/** Text a branch row can be found by. */
export const branchSearchFields = [
    (branch) => branch?.name,
    (branch) => branch?.code,
    (branch) => branch?.sponsorId,
    (branch) => branch?.address?.district,
    (branch) => branch?.address?.thana,
    (branch) => branch?.address?.city,
    (branch) => branch?.division,
];

export const branchColumns = [
    { key: 'name', label: 'Name', csv: 'text' },
    { key: 'code', label: 'Code', csv: 'text' },
    { key: 'sponsorId', label: 'Sponsor ID', csv: 'text' },
    { key: 'type', label: 'Type', csv: 'text' },
    { key: 'division', label: 'Division', csv: 'text' },
    { key: 'district', label: 'District', accessor: (branch) => branch?.address?.district || branch?.address?.city, csv: 'text' },
    { key: 'thana', label: 'Thana/Upazila', accessor: (branch) => branch?.address?.thana, csv: 'text' },
    { key: 'postalCode', label: 'Postal Code', accessor: (branch) => branch?.address?.postalCode, csv: 'text' },
    { key: 'seatCapacity', label: 'Seat Capacity', accessor: (branch) => branch?.seatCapacity || 0, csv: 'raw' },
    { key: 'areaSqFt', label: 'Area (Sq Ft)', accessor: (branch) => branch?.areaSqFt || 0, csv: 'raw' },
    { key: 'totalEmployees', label: 'Total Employees', accessor: (branch) => branch?.totalEmployees || 0, csv: 'raw' },
    { key: 'email', label: 'Email', accessor: (branch) => branch?.contact?.email, csv: 'text' },
    { key: 'phone', label: 'Phone', accessor: (branch) => branch?.contact?.phones?.[0], csv: 'text' },
    {
        key: 'status',
        label: 'Status',
        accessor: (branch) => (branch?.isActive ? 'Active' : 'Inactive'),
        csv: 'raw',
    },
    { key: 'students', label: 'Students', accessor: (branch) => branch?.stats?.students || 0, csv: 'raw' },
    { key: 'courses', label: 'Courses', accessor: (branch) => branch?.stats?.courses || 0, csv: 'raw' },
];

const csvValue = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

/** CSV header row, matching `branchColumns`. */
export const branchCsvHeaders = branchColumns.map((column) => column.label);

/** CSV body row for a branch, matching `branchCsvHeaders`. */
export const branchCsvRow = (branch) =>
    branchColumns.map((column) => {
        const value = column.accessor ? column.accessor(branch) : branch?.[column.key];

        return column.csv === 'raw' ? String(value ?? '') : csvValue(value);
    });

/** Builds the CSV file content for the given branches. */
export const branchCsvContent = (branches) =>
    [
        branchCsvHeaders.join(','),
        ...branches.map((branch) => branchCsvRow(branch).join(',')),
    ].join('\n');

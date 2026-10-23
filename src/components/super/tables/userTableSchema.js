/**
 * Column schema of the super admin user table.
 *
 * The user list is paginated on the server, so the page keeps its own
 * pagination state; the column definition still lives here so the table and
 * any export use the same source.
 */

export const userSearchFields = [
    (user) => user?.name,
    (user) => user?.email,
    (user) => user?.role,
];

export const userColumns = [
    { key: 'name', label: 'Identity Node' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Access Layer', accessor: (user) => user?.role?.replace('_', ' ') },
    {
        key: 'branch',
        label: 'Branch Assignment',
        accessor: (user, { branches = [] } = {}) => {
            if (!user?.branchId) return 'Global HQ';

            return branches.find((branch) => branch._id === user.branchId)?.name || 'Unknown Node';
        },
    },
    { key: 'state', label: 'State', accessor: (user) => (user?.isActive ? 'Active Node' : 'Suspended') },
];

export const ROLE_FILTERS = [
    { value: '', label: 'All Roles' },
    { value: 'student', label: 'Students' },
    { value: 'instructor', label: 'Instructors' },
    { value: 'branch_admin', label: 'Branch Admins' },
    { value: 'branch_management', label: 'Branch Management' },
    { value: 'super_admin', label: 'Super Admins' },
    { value: 'super_management', label: 'Super Management' },
];

/**
 * Shared React Query key factory.
 *
 * Every screen used to spell its query key inline, so the same data was
 * cached under slightly different keys and the invalidation of one screen
 * missed the other. The factory keeps the key shapes that are already in
 * use — changing them would throw away the warm cache — but gives every
 * screen one place to look the key up.
 */

export const queryKeys = {
    // Marketing / public
    courses: () => ['courses'],
    coursesWithParams: (params) => ['courses', params],
    course: (slug) => ['course', slug],
    coursesHeroConfig: () => ['courses_hero_config'],
    popularCourses: (page, category, branch, debouncedSearch) => [
        'popular-courses',
        page,
        category,
        branch,
        debouncedSearch,
    ],
    freelancingProjects: () => ['freelancing-projects'],
    globalMessage: () => ['globalMessage'],

    // Student
    enrolledCourses: () => ['enrolled-courses'],
    enrolledCoursesApi: () => ['enrolledCourses'],
    studentStats: () => ['student-stats'],
    dashboardStats: () => ['dashboardStats'],
    progress: (courseId) => ['progress', courseId],
    lessons: (courseId) => ['lessons', courseId],

    // Super admin
    superCourses: () => ['super-courses'],
    superBranches: () => ['super-branches'],
    superStats: () => ['super-stats'],
    branches: () => ['branches'],
    permissionsCatalog: () => ['permissions-catalog'],
    users: (params) => ['users', params],
    payments: (params) => ['payments', params],
};

/** The same factory, named for the super admin screens. */
export const superQueryKeys = queryKeys;

export default queryKeys;

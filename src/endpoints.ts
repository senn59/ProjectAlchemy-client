export const ENDPOINTS = {
    ISSUES: "/issues",
    ISSUES_WITH_ID: (id: number) => `${ENDPOINTS.ISSUES}/${id}`,
    PROJECTS: "/projects",
    PROJECTS_WITH_ID: (id: number) => `${ENDPOINTS.PROJECTS}/${id}`,
};

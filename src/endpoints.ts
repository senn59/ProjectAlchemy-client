export const ENDPOINTS = {
    ISSUES: "/issues",
    ISSUES_WITH_ID: (id: number) => `${ENDPOINTS.ISSUES}/${id}`,
};

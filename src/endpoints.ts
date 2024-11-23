export const ENDPOINTS = {
    ISSUE: "/issue",
    ISSUE_WITH_ID: (id: number) => `${ENDPOINTS.ISSUE}/${id}`,
};

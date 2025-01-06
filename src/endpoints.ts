export const ENDPOINTS = {
    ISSUES: (projectId: string) =>
        `${ENDPOINTS.PROJECT_WITH_ID(projectId)}/issues`,
    ISSUE_WITH_ID: (issueId: number, projectId: string) =>
        `${ENDPOINTS.ISSUES(projectId)}/${issueId}`,
    PROJECTS: "/projects",
    PROJECT_WITH_ID: (id: string) => `${ENDPOINTS.PROJECTS}/${id}`,
    PROJECT_INVITATIONS: (id: string) =>
        `${ENDPOINTS.PROJECT_WITH_ID(id)}/invitations`,
    INVITATIONS: "/invitations",
    INVITATIONS_WITH_ID: (id: string) => ENDPOINTS.INVITATIONS + "/" + id,
};

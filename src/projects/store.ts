import { ProjectResponse } from "@/projects/types.ts";
import { PartialIssue } from "@/issues/types.ts";
import { create } from "zustand";

interface ProjectState {
    project: ProjectResponse;
    setProject: (project: ProjectResponse) => void;
    updateIssueField: <K extends keyof PartialIssue>(
        id: number,
        field: K,
        value: PartialIssue[K],
    ) => void;
    addIssue: (issue: PartialIssue) => void;
}

export const useProjectStore = create<ProjectState>()((set) => ({
    project: { id: "", issues: [], lanes: [], name: "" },
    setProject: (project: ProjectResponse) => set({ project }),
    updateIssueField: <K extends keyof PartialIssue>(
        id: number,
        field: K,
        value: PartialIssue[K],
    ) =>
        set((state) => {
            const issues = state.project.issues.map((issue) => {
                if (issue.id === id) {
                    return { ...issue, [field]: value };
                }
                return issue;
            });
            return {
                project: {
                    ...state.project,
                    issues: issues,
                },
            };
        }),
    addIssue: (issue: PartialIssue) =>
        set((state) => ({
            project: {
                ...state.project,
                issues: [...state.project.issues, issue],
            },
        })),
}));

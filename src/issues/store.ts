import { create } from "zustand";
import { PartialIssue } from "@/issues/types.ts";

interface IssueTableState {
    issues: PartialIssue[];
    setIssues: (issues: PartialIssue[]) => void;
    updateRowField: <K extends keyof PartialIssue>(
        id: number,
        field: K,
        value: PartialIssue[K],
    ) => void;
    addIssue: (issue: PartialIssue) => void;
}

export const useIssueListStore = create<IssueTableState>()((set) => ({
    issues: [],
    setIssues: (issues: PartialIssue[]) => set({ issues: issues }),
    updateRowField: <K extends keyof PartialIssue>(
        id: number,
        field: K,
        value: PartialIssue[K],
    ) =>
        set((state) => ({
            issues: state.issues.map((issue) => {
                if (issue.id === id) {
                    issue[field] = value;
                }
                return issue;
            }),
        })),
    addIssue: (issue: PartialIssue) =>
        set((state) => ({ issues: [...state.issues, issue] })),
}));

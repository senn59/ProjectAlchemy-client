import { create } from "zustand";
import { PartialIssue } from "@/issues/types.ts";
import axios from "axios";
import { ENDPOINTS } from "@/endpoints.ts";

interface IssueTableState {
    issues: PartialIssue[];
    fetchData: () => Promise<void>;
    updateRowField: <K extends keyof PartialIssue>(
        id: number,
        field: K,
        value: PartialIssue[K],
    ) => void;
    addIssue: (issue: PartialIssue) => void;
}

export const useIssueListStore = create<IssueTableState>()((set) => ({
    issues: [],
    fetchData: async () => {
        const res = await axios.get<PartialIssue[]>(ENDPOINTS.ISSUES);
        set({ issues: res.data });
    },
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

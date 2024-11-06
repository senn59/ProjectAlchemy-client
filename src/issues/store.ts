import { create } from "zustand";
import { IssuePreview } from "@/issues/types.ts";
import axios from "axios";
import { ENDPOINTS } from "@/endpoints.ts";

interface IssueTableState {
    issues: IssuePreview[];
    fetchData: () => Promise<void>;
    updateRowField: <K extends keyof IssuePreview>(
        id: number,
        field: K,
        value: IssuePreview[K],
    ) => void;
    addIssue: (issue: IssuePreview) => void;
}

export const useIssueListStore = create<IssueTableState>()((set) => ({
    issues: [],
    fetchData: async () => {
        const res = await axios.get<IssuePreview[]>(ENDPOINTS.ISSUES);
        set({ issues: res.data });
    },
    updateRowField: <K extends keyof IssuePreview>(
        id: number,
        field: K,
        value: IssuePreview[K],
    ) =>
        set((state) => ({
            issues: state.issues.map((issue) => {
                if (issue.id === id) {
                    issue[field] = value;
                }
                return issue;
            }),
        })),
    addIssue: (issue: IssuePreview) =>
        set((state) => ({ issues: [...state.issues, issue] })),
}));

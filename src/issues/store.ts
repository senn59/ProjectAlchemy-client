import { create } from "zustand";
import { PartialIssue } from "@/issues/types.ts";
import { toast } from "@/hooks/use-toast.ts";
import api from "@/api";
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
        try {
            const res = await api.get<PartialIssue[]>(ENDPOINTS.ISSUE);
            set({ issues: res.data });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error retrieving issues!",
                description: (error as Error).message,
            });
        }
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

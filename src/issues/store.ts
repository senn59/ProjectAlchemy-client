import {create} from "zustand";
import {IssuePreview} from "@/issues/types.ts";
import axios from "axios";
import {ENDPOINTS} from "@/endpoints.ts";

interface IssueTableState {
    data: IssuePreview[]
}

const issueTableStore = create<IssueTableState>()((set) => ({
    data: [],
    fetchData: async () => {
        const res = await axios.get<IssuePreview[]>(ENDPOINTS.ISSUES);
        set({data: res.data})
    }

}))

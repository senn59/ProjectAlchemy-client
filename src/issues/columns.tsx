import {ColumnDef} from "@tanstack/react-table";
import {IIssuePreview} from "@/App.tsx";
import IssueTypeSelect from "@/issues/issue-type-select.tsx";

export const columns: ColumnDef<IIssuePreview>[] = [
    {
        accessorKey: "id",
        header: "Id",
        size: 0
    },
    {
        accessorKey: "type",
        header: "Type",
        size: 0,
        cell:({ row }) => (
            <IssueTypeSelect issuePreview={row.original} />
        )
    },
    {
        accessorKey: "name",
        header: "Name",
        size: 200
    },
]
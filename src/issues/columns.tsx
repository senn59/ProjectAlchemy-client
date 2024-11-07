import { ColumnDef } from "@tanstack/react-table";
import { PartialIssue } from "@/issues/types.ts";
import IssueTypeSelect from "@/issues/issue-type-select.tsx";

export const columns: ColumnDef<PartialIssue>[] = [
    {
        accessorKey: "id",
        header: "Id",
        size: 0,
    },
    {
        accessorKey: "type",
        header: "Type",
        size: 0,
        cell: ({ row }) => (
            <IssueTypeSelect issueId={row.original.id} silent={false} />
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        size: 200,
    },
];

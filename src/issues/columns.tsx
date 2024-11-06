import { ColumnDef } from "@tanstack/react-table";
import { IssuePreview } from "@/issues/types.ts";
import IssueTypeSelect from "@/issues/issue-type-select.tsx";

export const columns: ColumnDef<IssuePreview>[] = [
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

import { ColumnDef } from "@tanstack/react-table";
import { PartialIssue } from "@/issues/types.ts";
import IssueTypeSelect from "@/issues/issue-type-select.tsx";
import { Lane } from "@/projects/types.ts";

export const columns: ColumnDef<PartialIssue>[] = [
    {
        accessorKey: "id",
        header: "Id",
        size: 5,
    },
    {
        accessorKey: "type",
        header: "Type",
        size: 5,
        cell: ({ row }) => (
            <IssueTypeSelect issueId={row.getValue("id")} silent={false} />
        ),
    },
    {
        accessorKey: "name",
        header: () => <div className="pl-8">Name</div>,
        size: 0,
        cell: ({ row }) => <div className="pl-8">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "lane",
        header: "Status",
        size: 100,
        cell: ({ row }) => <div>{row.getValue<Lane>("lane").name}</div>,
    },
];

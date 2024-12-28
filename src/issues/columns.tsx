import { ColumnDef } from "@tanstack/react-table";
import { PartialIssue } from "@/issues/types.ts";
import IssueTypeSelect from "@/issues/issue-type-select.tsx";
import { IssueLaneSelect } from "@/issues/issue-lane-select.tsx";
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
            <IssueTypeSelect
                issueId={row.getValue("id")}
                currentType={row.getValue("type")}
                compact={true}
                key={row.getValue("type")}
            />
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
        size: 150,
        cell: ({ row }) => (
            <IssueLaneSelect
                issueId={row.getValue("id")}
                currentLane={row.getValue("lane")}
                key={row.getValue<Lane>("lane").id}
            />
        ),
    },
];

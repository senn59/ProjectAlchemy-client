import { ColumnDef } from "@tanstack/react-table";
import { PartialIssue } from "@/issues/types.ts";
import IssueTypeSelect from "@/issues/issue-type-select.tsx";
import { IssueLaneSelect } from "@/issues/issue-lane-select.tsx";
import { Lane } from "@/projects/types.ts";

export const columns: ColumnDef<PartialIssue>[] = [
    {
        accessorKey: "key",
        header: "Key",
        size: 5,
    },
    {
        accessorKey: "type",
        header: "Type",
        size: 5,
        cell: ({ row }) => (
            <IssueTypeSelect
                issueKey={row.getValue("key")}
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
                issueKey={row.getValue("key")}
                currentLane={row.getValue("lane")}
                key={row.getValue<Lane>("lane").id}
            />
        ),
    },
];

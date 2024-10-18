import {ColumnDef} from "@tanstack/react-table";
import {IssuePreview} from "@/App.tsx";
import IssueTypeSelect from "@/issues/issue-type-select.tsx";

export const columns: ColumnDef<IssuePreview>[] = [
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
            <IssueTypeSelect currentType={row.original.type} issueId={row.original.id} silent={false} />
        )
    },
    {
        accessorKey: "name",
        header: "Name",
        size: 200
    },
]
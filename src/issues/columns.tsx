import {ColumnDef} from "@tanstack/react-table";
import {IIssuePreview} from "@/App.tsx";

export const columns: ColumnDef<IIssuePreview>[] = [
    {
        accessorKey: "id",
        header: "Id",
        size: 0
    },
    {
        accessorKey: "type",
        header: "Type",
        size: 0
    },
    {
        accessorKey: "name",
        header: "Name",
        size: 200
    },
]
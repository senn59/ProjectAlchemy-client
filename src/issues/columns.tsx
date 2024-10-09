import {ColumnDef} from "@tanstack/react-table";
import {IIssue} from "@/App.tsx";

export const columns: ColumnDef<IIssue>[] = [
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "type",
        header: "Type"
    },
    {
        accessorKey: "name",
        header: "Name"
    },
]
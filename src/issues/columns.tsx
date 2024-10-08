import {ColumnDef} from "@tanstack/react-table";
import {IIssue} from "@/App.tsx";

export const columns: ColumnDef<IIssue>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "description",
        header: "Description"
    },
]
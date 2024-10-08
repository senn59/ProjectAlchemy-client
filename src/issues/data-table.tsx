import {
    ColumnDef,
    flexRender,
    getCoreRowModel, Row,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Sheet,
    SheetContent,
    SheetHeader,
} from "@/components/ui/sheet"

import {useState} from "react";
import {IIssue} from "@/App.tsx";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({columns, data,}: DataTableProps<TData, TValue>) {
    const [selectedRow, setIsSelectedRow] = useState<IIssue | null>(null);
    const [isOpenSheet, setIsOpenSheet] = useState(false);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const openRow = (row: Row<TData>) => {
        console.log("Open row")
        table.toggleAllPageRowsSelected(false)
        row.toggleSelected()
        if (!row.getIsSelected()) {
            setIsOpenSheet(true)
            setIsSelectedRow(row.original as IIssue)
        }
    }

    const handleSheetChange = () => {
        table.toggleAllPageRowsSelected(false)
        setIsOpenSheet(false)
        setIsSelectedRow(null)
    }

    return (
        <div className="rounded-md border">
            <Sheet open={isOpenSheet} onOpenChange={handleSheetChange}>
                <SheetContent>
                    {selectedRow == null ? <p>Loading</p> :
                        <SheetHeader>{selectedRow.name}</SheetHeader>
                    }
                </SheetContent>
            </Sheet>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                onClick={() => openRow(row)}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

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
    SheetContent, SheetDescription,
    SheetHeader, SheetTitle,
} from "@/components/ui/sheet"

import {useState} from "react";
import {IIssue, IIssuePreview} from "@/App.tsx";
import axios from "axios";
import {ENDPOINTS} from "@/endpoints.ts";

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

    const openRow = async (row: Row<TData>) => {
        table.toggleAllPageRowsSelected(false)
        row.toggleSelected()
        if (!row.getIsSelected()) {
            setIsOpenSheet(true)
            const rowData = row.original as IIssuePreview;
            setIsSelectedRow(await getIssueData(rowData.id))
        }
    }

    const handleSheetChange = () => {
        table.toggleAllPageRowsSelected(false)
        setIsOpenSheet(false)
        setIsSelectedRow(null)
    }

    const getIssueData = async (id: number): Promise<IIssue> => {
       return axios.get<IIssue>(`${ENDPOINTS.ISSUES}/${id}`).then(res => res.data)
    }

    return (
        <div className="rounded-md border">
            <Sheet open={isOpenSheet} onOpenChange={handleSheetChange}>
                {selectedRow !== null && (
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>{selectedRow.name}</SheetTitle>
                            <SheetDescription>{selectedRow.description}</SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                )}
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
                                    <TableCell key={cell.id} width={cell.column.columnDef.size}>
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

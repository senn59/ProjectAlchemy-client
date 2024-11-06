import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    Row,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { FormEvent, KeyboardEvent, useState } from "react";
import { Issue, IssuePreview, IssueType } from "@/issues/types.ts";
import axios from "axios";
import { ENDPOINTS } from "@/endpoints.ts";
import IssueDetails from "@/issues/issue-details.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIssueListStore } from "./store";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const addIssueToTable = useIssueListStore((s) => s.addIssue);
    const updateName = useIssueListStore((s) => s.updateRowField);
    const [selectedRow, setIsSelectedRow] = useState<Issue | null>(null);
    const [isOpenSheet, setIsOpenSheet] = useState(false);

    const [newItemName, setNewItemName] = useState("");
    const [isAddingNew, setIsAddingNew] = useState(false);

    const handleAddNew = () => {
        setIsAddingNew(true);
        setNewItemName("");
    };

    const handleSaveNew = (e: FormEvent) => {
        e.preventDefault();
        if (newItemName.trim()) {
            setIsAddingNew(false);
        }

        axios
            .post<IssuePreview>(ENDPOINTS.ISSUES, {
                name: newItemName,
                type: IssueType.Task,
            })
            .then((res) => addIssueToTable(res.data));
    };

    const handleKeyPressNew = (event: KeyboardEvent) => {
        if (event.key === "Escape" && !event.shiftKey) {
            setIsAddingNew(false);
        }
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const openRow = async (row: Row<TData>) => {
        table.toggleAllPageRowsSelected(false);
        row.toggleSelected();
        if (!row.getIsSelected()) {
            setIsOpenSheet(true);
            const rowData = row.original as IssuePreview;
            setIsSelectedRow(await getIssueData(rowData.id));
        }
    };

    const handleSheetChange = () => {
        table.toggleAllPageRowsSelected(false);
        setIsOpenSheet(false);
        setIsSelectedRow(null);
    };

    const getIssueData = async (id: number): Promise<Issue> => {
        return axios
            .get<Issue>(`${ENDPOINTS.ISSUES}/${id}`)
            .then((res) => res.data);
    };

    return (
        <div className="rounded-md border">
            {selectedRow != null && (
                <IssueDetails
                    issue={selectedRow}
                    isOpen={isOpenSheet}
                    onOpenChange={handleSheetChange}
                />
            )}
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
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
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
                                    <TableCell
                                        key={cell.id}
                                        width={cell.column.columnDef.size}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                    {isAddingNew && (
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                <form
                                    onSubmit={handleSaveNew}
                                    className="flex w-full"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Enter new item name"
                                        value={newItemName}
                                        onChange={(e) =>
                                            setNewItemName(e.target.value)
                                        }
                                        onBlur={() => setIsAddingNew(false)}
                                        onKeyDown={handleKeyPressNew}
                                        className="flex-grow"
                                        autoFocus
                                    />
                                </form>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="w-full">
                <Button
                    variant={"ghost"}
                    onClick={handleAddNew}
                    disabled={isAddingNew}
                    className="w-full rounded-none"
                >
                    + Add issue
                </Button>
            </div>
        </div>
    );
}

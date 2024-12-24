import {
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
import { Issue, PartialIssue, IssueType } from "@/issues/types.ts";
import { ENDPOINTS } from "@/endpoints.ts";
import IssueDetails from "@/issues/issue-details.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/api.ts";
import { toast } from "@/hooks/use-toast.ts";
import { columns } from "@/issues/columns.tsx";
import { useProjectStore } from "@/projects/store.ts";

export function IssuesTable() {
    const [selectedRow, setSelectedRow] = useState<Issue | null>(null);
    const [isOpenSheet, setIsOpenSheet] = useState(false);

    const [newItemName, setNewItemName] = useState("");
    const [isAddingNew, setIsAddingNew] = useState(false);
    const { project, addIssue } = useProjectStore();

    const handleAddNew = () => {
        setIsAddingNew(true);
        setNewItemName("");
    };

    const handleSaveNew = (e: FormEvent) => {
        e.preventDefault();
        if (newItemName.trim()) {
            setIsAddingNew(false);
        }

        api.post<PartialIssue>(ENDPOINTS.ISSUES(project.id), {
            name: newItemName,
            type: IssueType.Task,
            laneId: project.lanes[0].id,
        })
            .then((res) => {
                const newIssue = res.data as PartialIssue;
                addIssue(newIssue);
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Error creating issue!",
                    description: error.message,
                });
            });
    };

    const handleKeyPressNew = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setIsAddingNew(false);
        }
    };

    const table = useReactTable({
        data: project.issues,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const openRow = async (row: Row<PartialIssue>) => {
        table.toggleAllPageRowsSelected(false);
        row.toggleSelected();
        if (!row.getIsSelected()) {
            setIsOpenSheet(true);
            const rowData = row.original as PartialIssue;
            setSelectedRow((await getIssueData(rowData.id)) ?? null);
        }
    };

    const handleSheetChange = () => {
        table.toggleAllPageRowsSelected(false);
        setIsOpenSheet(false);
        setSelectedRow(null);
    };

    const getIssueData = async (id: number): Promise<Issue | void> => {
        return api
            .get<Issue>(ENDPOINTS.ISSUE_WITH_ID(id, project.id))
            .then((res) => res.data)
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Error retrieving issue!",
                    description: error.message,
                });
            });
    };

    return (
        <div className="rounded-md border">
            {" "}
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
                                className="cursor-pointer"
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

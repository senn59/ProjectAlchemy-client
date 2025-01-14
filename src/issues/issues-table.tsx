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

import { FormEvent, useContext, useEffect, useState } from "react";
import { PartialIssue, IssueType } from "@/issues/types.ts";
import { ENDPOINTS } from "@/endpoints.ts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/api.ts";
import { toast } from "@/hooks/use-toast.ts";
import { ProjectContext } from "@/projects/project-provider.tsx";
import { columns } from "@/issues/columns.tsx";

export function IssuesTable() {
    const [newItemName, setNewItemName] = useState("");
    const [isAddingNew, setIsAddingNew] = useState(false);
    const { project, setActiveIssue, activeIssue } = useContext(ProjectContext);

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
        }).catch((error) => {
            toast({
                variant: "destructive",
                title: "Error creating issue!",
                description: error.message,
            });
        });
    };
    const table = useReactTable({
        data: project.issues,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const openRow = (row: Row<PartialIssue>) => {
        table.toggleAllPageRowsSelected(false);
        row.toggleSelected();
        if (!row.getIsSelected()) {
            setActiveIssue(row.original.key);
        }
    };

    useEffect(() => {
        if (!activeIssue) {
            table.toggleAllPageRowsSelected(false);
        }
    }, [activeIssue]);

    return (
        <div className="rounded-md border">
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
                                        onKeyDown={(event) => {
                                            if (event.key === "Escape") {
                                                setIsAddingNew(false);
                                            }
                                        }}
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

import { useState } from "react";
import { IssueLink, IssueType } from "../types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function LinkedIssues() {
    const [linkedIssues, setLinkedIssues] = useState<IssueLink[]>([
        { name: "test", key: 7, type: IssueType.Bug } as IssueLink,
    ]);
    return (
        <>
            <ScrollArea className="h-[250px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Key</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {linkedIssues.length < 1 ? (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <div className="flex justify-center">
                                        <div>No issued linked</div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            linkedIssues.map((i) => (
                                <TableRow
                                    key={i.key}
                                    onClick={() => console.log("test")}
                                    className="hover:cursor-pointer"
                                >
                                    <TableCell>{i.key}</TableCell>
                                    <TableCell>{i.name}</TableCell>
                                    <TableCell>{i.type}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                console.log("unlink");
                                            }}
                                        >
                                            unlink
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </ScrollArea>
        </>
    );
}

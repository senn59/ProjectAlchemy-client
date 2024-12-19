import { useEffect, useState } from "react";
import { ProjectOverview } from "@/projects/types.ts";
import api from "@/api.ts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button.tsx";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Projects() {
    const [projects, setProjects] = useState<ProjectOverview[]>([]);

    useEffect(() => {
        api.get("/projects").then((r) => setProjects(r.data));
    }, []);

    return (
        <div className="flex-grow flex justify-center">
            <div className="w-1/2 mt-24">
                <div className="flex items-center justify-between">
                    <div className={"text-2xl font-extrabold"}>Projects</div>
                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Create a new project</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        Create a new project
                                    </DialogTitle>
                                    <DialogDescription>
                                        Creat a new project here. Fill in a name
                                        and click create to create your new
                                        project.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="">
                                        <Label
                                            htmlFor="name"
                                            className="text-right"
                                        >
                                            Project Name
                                        </Label>
                                        <Input id="name" className="mt-2" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">
                                        Create project
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead className="text-right">Member</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((p) => (
                            <TableRow>
                                <TableCell className="font-medium">
                                    {p.projectName}
                                </TableCell>
                                <TableCell className="font-medium text-right">
                                    {p.memberType}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default Projects;

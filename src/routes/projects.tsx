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
import NewProject from "@/projects/new-project.tsx";

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
                        <NewProject />
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

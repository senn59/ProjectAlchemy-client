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
import { toast } from "@/hooks/use-toast.ts";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { ENDPOINTS } from "@/endpoints.ts";
import { Loader } from "@/components/Loader.tsx";

function Projects() {
    const [projects, setProjects] = useState<ProjectOverview[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        api.get(ENDPOINTS.PROJECTS)
            .then((res) => {
                setProjects(res.data);
                setLoading(false);
            })
            .catch((res) => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: res.message,
                });
            });
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
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">Member</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading || projects.length < 1 ? (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <div className="flex justify-center mt-24">
                                        {loading ? (
                                            <Loader />
                                        ) : (
                                            <div>No projects found</div>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            projects.map((p) => (
                                <TableRow key={p.projectId}>
                                    <TableCell className="font-medium">
                                        {p.projectName}
                                    </TableCell>
                                    <TableCell className="font-medium text-right">
                                        {p.memberType}
                                    </TableCell>
                                    <TableCell className="font-medium text-right">
                                        <Link to={`../projects/${p.projectId}`}>
                                            <Button variant="outline">
                                                Open
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default Projects;

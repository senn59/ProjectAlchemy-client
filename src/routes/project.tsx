import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api.ts";
import { ProjectResponse } from "@/projects/types.ts";
import { useIssueListStore } from "@/issues/store.ts";
import { columns } from "@/issues/columns.tsx";
import { DataTable } from "@/issues/data-table.tsx";

export default function Project() {
    const setIssues = useIssueListStore((s) => s.setIssues);
    const issues = useIssueListStore((s) => s.issues);
    const { id } = useParams();
    const [project, setProject] = useState<ProjectResponse>();

    useEffect(() => {
        api.get(`/projects/${id}`)
            .then((r) => {
                setProject(r.data);
                setIssues(r.data.issues);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id]);
    return (
        <>
            {project && (
                <>
                    <div className="flex-grow flex items-center justify-center flex-col">
                        <h1>{project.name}</h1>
                        <DataTable columns={columns} data={issues} />
                    </div>
                </>
            )}
        </>
    );
}

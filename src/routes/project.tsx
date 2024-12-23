import { useParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import api from "@/api.ts";
import { ProjectResponse } from "@/projects/types.ts";
import { useIssueListStore } from "@/issues/store.ts";
import { columns } from "@/issues/columns.tsx";
import { IssuesTable } from "@/issues/issues-table.tsx";
import { ENDPOINTS } from "@/endpoints.ts";

export const ProjectContext = createContext<ProjectResponse | undefined>(
    undefined,
);

export default function Project() {
    const setIssues = useIssueListStore((s) => s.setIssues);
    const issues = useIssueListStore((s) => s.issues);
    const { id } = useParams();
    const [project, setProject] = useState<ProjectResponse>();

    useEffect(() => {
        if (id) {
            api.get(ENDPOINTS.PROJECT_WITH_ID(id))
                .then((r) => {
                    setProject(r.data);
                    setIssues(r.data.issues);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [id]);

    return (
        <ProjectContext.Provider value={project}>
            <div className="flex grow justify-center">
                <div className="w-2/3 mt-12">
                    {project && id && (
                        <>
                            <h1 className="text-3xl font-extrabold">
                                {project.name}
                            </h1>
                            <div className=" mt-12">
                                <IssuesTable columns={columns} data={issues} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </ProjectContext.Provider>
    );
}

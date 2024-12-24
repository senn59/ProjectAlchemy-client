import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api.ts";
import { ProjectResponse } from "@/projects/types.ts";
import { IssuesTable } from "@/issues/issues-table.tsx";
import { ENDPOINTS } from "@/endpoints.ts";
import { ProjectContext } from "@/projects/context.ts";

export default function Project() {
    const { id } = useParams();
    const [project, setProject] = useState<ProjectResponse>(
        {} as ProjectResponse,
    );

    useEffect(() => {
        if (id) {
            api.get(ENDPOINTS.PROJECT_WITH_ID(id))
                .then((r) => {
                    setProject(r.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [id]);

    return project ? (
        <ProjectContext.Provider value={{ project, setProject }}>
            <div className="flex grow justify-center">
                <div className="w-2/3 mt-12">
                    {Object.keys(project).length > 0 && (
                        <>
                            <h1 className="text-3xl font-extrabold">
                                {project.name}
                            </h1>
                            <div className=" mt-12">
                                <IssuesTable />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </ProjectContext.Provider>
    ) : (
        <div>loading</div>
    );
}

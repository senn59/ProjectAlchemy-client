import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api.ts";
import { ProjectResponse } from "@/projects/types.ts";
import { IssuesTable } from "@/issues/issues-table.tsx";
import { ENDPOINTS } from "@/endpoints.ts";
import { ProjectContext } from "@/projects/context.ts";
import { toast } from "@/hooks/use-toast.ts";
import { Loader } from "@/components/Loader.tsx";
import { ProjectSettings } from "@/projects/project-settings.tsx";

export default function Project() {
    const { id } = useParams();
    const [project, setProject] = useState<ProjectResponse>(
        {} as ProjectResponse,
    );

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            api.get(ENDPOINTS.PROJECT_WITH_ID(id))
                .then((r) => {
                    setProject(r.data);
                    setLoading(false);
                })
                .catch((err) => {
                    toast({
                        variant: "destructive",
                        title: "Error while creating project",
                        description: err?.message,
                    });
                });
        }
    }, [id]);

    return !loading ? (
        <ProjectContext.Provider value={{ project, setProject }}>
            <div className="flex grow justify-center relative">
                <div className="w-2/3 mt-28">
                    {Object.keys(project).length > 0 && (
                        <>
                            <div className="flex justify-between items-end">
                                <h1 className="text-3xl font-extrabold">
                                    {project.name}
                                </h1>
                                <ProjectSettings />
                            </div>
                            <div className="my-12">
                                <IssuesTable />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </ProjectContext.Provider>
    ) : (
        <div className="flex grow justify-center items-center">
            <Loader />
        </div>
    );
}

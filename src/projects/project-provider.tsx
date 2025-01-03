import { ProjectResponse } from "@/projects/types.ts";
import { createContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import api from "@/api.ts";
import { ENDPOINTS } from "@/endpoints.ts";
import { toast } from "@/hooks/use-toast.ts";
import { Loader } from "@/components/Loader.tsx";

interface ProjectContextType {
    project: ProjectResponse;
    setProject: React.Dispatch<React.SetStateAction<ProjectResponse>>;
}
export const ProjectContext = createContext<ProjectContextType>({
    project: {} as ProjectResponse,
    setProject: () => {},
});
export function ProjectProvider() {
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
            <Outlet />
        </ProjectContext.Provider>
    ) : (
        <div className="flex flex-grow justify-center items-center">
            <Loader />
        </div>
    );
}

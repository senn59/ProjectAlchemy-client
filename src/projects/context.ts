import { ProjectResponse } from "@/projects/types.ts";
import { createContext } from "react";

interface ProjectContextType {
    project: ProjectResponse;
    setProject: React.Dispatch<React.SetStateAction<ProjectResponse>>;
}
export const ProjectContext = createContext<ProjectContextType>({
    project: {} as ProjectResponse,
    setProject: () => {},
});

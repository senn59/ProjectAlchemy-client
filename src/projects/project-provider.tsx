import { ProjectResponse } from "@/projects/types.ts";
import { createContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import api from "@/api.ts";
import { ENDPOINTS } from "@/endpoints.ts";
import { toast } from "@/hooks/use-toast.ts";
import { Loader } from "@/components/Loader.tsx";
import * as signalR from "@microsoft/signalr";
import { useAuth } from "@/auth/authprovider.tsx";
import { Issue, IssueToLink, PartialIssue } from "@/issues/types.ts";

interface ProjectContextType {
    project: ProjectResponse;
    setProject: React.Dispatch<React.SetStateAction<ProjectResponse>>;
    activeIssue: number | null;
    setActiveIssue: React.Dispatch<React.SetStateAction<number | null>>;
    issueToLink: IssueToLink | null;
    setIssueToLink: React.Dispatch<React.SetStateAction<IssueToLink | null>>;
    websocket: signalR.HubConnection | null;
}
export const ProjectContext = createContext<ProjectContextType>({
    project: {} as ProjectResponse,
    setProject: () => {},
    websocket: null,
    issueToLink: null,
    setIssueToLink: () => {},
    activeIssue: null,
    setActiveIssue: () => {},
});

export function ProjectProvider() {
    const { id } = useParams();
    const { jwt } = useAuth();
    const [project, setProject] = useState<ProjectResponse>(
        {} as ProjectResponse,
    );
    const [issueToLink, setIssueToLink] = useState<IssueToLink | null>(null);
    const [activeIssue, setActiveIssue] = useState<number | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [websocket, setWebsocket] = useState<signalR.HubConnection | null>(
        null,
    );

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

    useEffect(() => {
        if (project.id) {
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl(ENDPOINTS.PROJECT_WEBSOCKET(project.id), {
                    accessTokenFactory: () => jwt ?? "",
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets,
                })
                .withAutomaticReconnect()
                .configureLogging(signalR.LogLevel.Error)
                .build();
            newConnection.start().then(() => {
                setWebsocket(newConnection);
            });
        }
    }, [jwt, project.id]);

    useEffect(() => {
        if (websocket) {
            websocket.on("IssueNew", (issue: PartialIssue) => {
                if (!project.issues.find((i) => i.key == issue.key)) {
                    setProject((prev) => ({
                        ...prev,
                        issues: [...(prev.issues || []), issue],
                    }));
                }
            });
            websocket.on("IssueUpdate", (issue: Issue) => {
                setProject((prev) => ({
                    ...prev,
                    issues: prev.issues.map((i) => {
                        if (i.key == issue.key) {
                            return {
                                ...i,
                                ...issue,
                            };
                        }
                        return i;
                    }),
                }));
            });
            websocket.on("IssueDelete", (key: number) => {
                setProject((prev) => ({
                    ...prev,
                    issues: prev.issues.filter((i) => {
                        if (i.key != key) {
                            return i;
                        }
                    }),
                }));
            });
        }
    }, [websocket]);

    return !loading ? (
        <ProjectContext.Provider
            value={{
                project,
                setProject,
                websocket,
                issueToLink,
                setIssueToLink,
                activeIssue,
                setActiveIssue,
            }}
        >
            <Outlet />
        </ProjectContext.Provider>
    ) : (
        <div className="flex flex-grow justify-center items-center">
            <Loader />
        </div>
    );
}

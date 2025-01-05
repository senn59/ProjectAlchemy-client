import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IssuesTable } from "@/issues/issues-table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { LucideSettings } from "lucide-react";
import { ProjectContext } from "@/projects/project-provider.tsx";
import { useAuth } from "@/auth/authprovider.tsx";
import { memberType } from "@/projects/types.ts";
import * as signalR from "@microsoft/signalr";
import { Issue, PartialIssue } from "@/issues/types.ts";

export default function Project() {
    const { project, setProject } = useContext(ProjectContext);
    const { user, jwt } = useAuth();
    const { id } = useParams();
    const [connection, setConnection] = useState<signalR.HubConnection>();

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(
                `http://localhost:5297/projectHub?projectId=${project.id}`,
                {
                    accessTokenFactory: () => jwt ?? "",
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets,
                },
            )
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, [jwt]);

    useEffect(() => {
        if (connection) {
            connection.start().then(() => {
                connection.on("IssueNew", (issue: PartialIssue) => {
                    if (!project.issues.find((i) => i.key == issue.key)) {
                        setProject((prev) => ({
                            ...prev,
                            issues: [...(prev.issues || []), issue],
                        }));
                    }
                });
                connection.on("IssueUpdate", (issue: Issue) => {
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
            });
        }
    }, [connection]);

    return (
        <div className="flex grow justify-center relative">
            <div className="w-2/3 mt-28">
                {Object.keys(project).length > 0 && (
                    <>
                        <div className="flex justify-between items-end">
                            <h1 className="text-3xl font-extrabold">
                                {project.name}
                            </h1>
                            {project.members.find((m) => m.userId === user?.id)
                                ?.type === memberType.Owner && (
                                <Link to={`/projects/${id}/settings`}>
                                    <Button size="icon" variant="ghost">
                                        <LucideSettings size={20} />
                                    </Button>
                                </Link>
                            )}
                        </div>
                        <div className="my-12">
                            <IssuesTable />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

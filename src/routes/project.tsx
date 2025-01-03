import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { IssuesTable } from "@/issues/issues-table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { LucideSettings } from "lucide-react";
import { ProjectContext } from "@/projects/project-provider.tsx";
import { useAuth } from "@/auth/authprovider.tsx";
import { memberType } from "@/projects/types.ts";

export default function Project() {
    const { project } = useContext(ProjectContext);
    const { user } = useAuth();
    const { id } = useParams();
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

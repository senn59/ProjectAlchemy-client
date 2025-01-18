import { useContext } from "react";
import { ProjectContext } from "./project-provider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MembersPopover } from "./members-popover";
import { IssuesTable } from "@/issues/issues-table";
import { memberType } from "./types";
import { useAuth } from "@/auth/authprovider";

export function ProjectOverview({ id }: { id: string }) {
    const { project } = useContext(ProjectContext);
    const { user } = useAuth();

    return (
        <div className="flex grow justify-center relative">
            <div className="w-2/3 mt-28">
                {Object.keys(project).length > 0 && (
                    <>
                        <div className="flex justify-between items-end">
                            <h1
                                className="text-3xl font-extrabold"
                                data-test="project-name"
                            >
                                {project.name}
                            </h1>
                            {project.members.find((m) => m.userId === user?.id)
                                ?.type === memberType.Owner ? (
                                <Link to={`/projects/${id}/settings`}>
                                    <Button>Go to settings</Button>
                                </Link>
                            ) : (
                                <MembersPopover members={project.members} />
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

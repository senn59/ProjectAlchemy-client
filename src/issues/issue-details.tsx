import { Issue } from "@/issues/types.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import IssueTypeSelect from "@/issues/issue-type-select.tsx";
import { useContext, useEffect, useState } from "react";
import { ENDPOINTS } from "@/endpoints";
import api from "@/api.ts";
import { toast } from "@/hooks/use-toast.ts";
import { ProjectContext } from "@/projects/project-provider.tsx";
import { IssueLaneSelect } from "@/issues/issue-lane-select.tsx";
import { NameEdit } from "./name-edit";
import { DescriptionEdit } from "./description-edit";

export default function IssueDetails({ issueKey }: { issueKey: number }) {
    const [issue, setIssue] = useState<Issue>();
    const { project, setProject, websocket, setActiveIssue, setIssueToLink } =
        useContext(ProjectContext);
    const [confirming, setConfirming] = useState<boolean>(false);

    useEffect(() => {
        const fetchIssue = async () => {
            api.get<Issue>(ENDPOINTS.ISSUE_WITH_ID(issueKey, project.id))
                .then((res) => setIssue(res.data))
                .catch((error) => {
                    toast({
                        variant: "destructive",
                        title: "Error retrieving issue!",
                        description: error.message,
                    });
                });
        };
        fetchIssue();
    }, []);

    useEffect(() => {
        if (websocket) {
            websocket.on("IssueUpdate", (updated: Issue) => {
                if (updated.key === issue?.key) {
                    setIssue({
                        ...issue,
                        ...updated,
                    });
                }
            });
            websocket.on("IssueDelete", (key: number) => {
                if (issue?.key === key) setActiveIssue(null);
            });
        }
    }, [websocket]);

    const handleDeleteClick = () => {
        if (confirming && issue) {
            api.delete(ENDPOINTS.ISSUE_WITH_ID(issue.key, project.id))
                .then(() => {
                    setProject((prev) => ({
                        ...prev,
                        issues: prev.issues.filter((i) => {
                            if (i.key != issue?.key) {
                                return i;
                            }
                        }),
                    }));
                    setActiveIssue(null);
                    toast({
                        title: "Success",
                        description: "Successfully deleted issue!",
                    });
                })
                .catch((e) => {
                    toast({
                        title: "Error while deleting issue",
                        description: e.message,
                        variant: "destructive",
                    });
                });
            setConfirming(false);
        } else {
            setConfirming(true);
        }
    };

    return (
        <Sheet open={true} onOpenChange={() => setActiveIssue(null)}>
            <SheetContent>
                {issue ? (
                    <>
                        <SheetHeader>
                            <SheetTitle>Issue {issue.key}</SheetTitle>
                            <SheetDescription>
                                A more detailed view of your issue.
                            </SheetDescription>
                        </SheetHeader>
                        <div className={"mt-10"}>
                            <div className={"sheet-field-cnt"}>
                                <NameEdit
                                    name={issue.name}
                                    issueKey={issue.key}
                                    projectId={project.id}
                                />
                            </div>
                            <div className={"sheet-field-cnt mt-10"}>
                                <DescriptionEdit
                                    description={issue.description}
                                    issueKey={issue.key}
                                    projectId={project.id}
                                />
                            </div>
                            <div className={"sheet-field-cnt mt-10"}>
                                <Label className={"pl-1"}>Type</Label>
                                <IssueTypeSelect
                                    issueKey={issue.key}
                                    currentType={issue.type}
                                    compact={false}
                                    key={issue.type}
                                />
                            </div>
                            <div className="sheet-field-cnt mt-10">
                                <Label>Status</Label>
                                <IssueLaneSelect
                                    issueKey={issue.key}
                                    currentLane={issue.lane}
                                    key={issue.lane.name}
                                />
                            </div>
                            <div>
                                <Button
                                    onClick={() =>
                                        setIssueToLink({
                                            key: issue.key,
                                            name: issue.name,
                                        })
                                    }
                                >
                                    Link issue
                                </Button>
                            </div>
                        </div>
                        <div className="absolute bottom-8 right-8">
                            <Button
                                onClick={handleDeleteClick}
                                onBlur={() => setConfirming(false)}
                                variant="destructive"
                            >
                                {!confirming ? "Delete" : "Are you sure?"}
                            </Button>
                        </div>
                    </>
                ) : (
                    <div>Loading</div>
                )}
            </SheetContent>
        </Sheet>
    );
}

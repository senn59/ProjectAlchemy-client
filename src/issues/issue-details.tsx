import { Issue, PartialIssue } from "@/issues/types.ts";
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
import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { ENDPOINTS } from "@/endpoints";
import api from "@/api.ts";
import { toast } from "@/hooks/use-toast.ts";
import { ProjectContext } from "@/projects/project-provider.tsx";
import { IssueLaneSelect } from "@/issues/issue-lane-select.tsx";
import { z } from "zod";
import { IssueLinking } from "./issue-link-linking";

interface IssueTypeSelectProps {
    issue: Issue;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export default function IssueDetails(props: IssueTypeSelectProps) {
    const [issue, setIssue] = useState<Issue>(props.issue);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // const [editableFields, setEditableFields] = useState<EditableFields>({
    //     name: issue.name,
    //     description: issue.description,
    // });
    const [fieldError, setFieldError] = useState<string>("");
    const [isEditing, setEditing] = useState<Record<string, boolean>>({
        name: false,
        description: false,
    });
    const { project, setProject, websocket } = useContext(ProjectContext);
    const [confirming, setConfirming] = useState<boolean>(false);
    const [isOpenLinkDialog, setOpenLinkDialog] = useState(false);

    const nameFormSchema = z.string().min(1).max(30);
    const descriptionFormSchema = z.string().max(200);

    useEffect(() => {
        if (websocket) {
            websocket.on("IssueUpdate", (updated: Issue) => {
                if (updated.key === issue.key) {
                    setIssue({
                        ...issue,
                        ...updated,
                    });
                }
            });
            websocket.on("IssueDelete", (key: number) => {
                if (issue.key === key) {
                    props.onOpenChange(false);
                }
            });
        }
    }, [websocket]);

    useEffect(() => {
        if (isEditing["description"] && textareaRef.current) {
            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
        }
    }, [isEditing]);

    useEffect(() => {
        try {
            nameFormSchema.parse(issue.name);
            descriptionFormSchema.parse(issue.description);
            setFieldError("");
        } catch (e) {
            if (e instanceof z.ZodError) {
                setFieldError(e.issues[0].message);
            }
        }
    }, [issue.name, issue.description]);

    const handleDeleteClick = () => {
        if (confirming) {
            api.delete(ENDPOINTS.ISSUE_WITH_ID(issue.key, project.id))
                .then(() => {
                    setProject((prev) => ({
                        ...prev,
                        issues: prev.issues.filter((i) => {
                            if (i.key != issue.key) {
                                return i;
                            }
                        }),
                    }));
                    props.onOpenChange(false);
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

    const handleEditing = (field: string) => {
        if (!fieldError) {
            setEditing({ ...isEditing, [field]: true });
        }
    };

    const updateIssue = <K extends keyof PartialIssue>(
        id: number,
        field: K,
        value: PartialIssue[K],
    ) => {
        setProject((prev) => ({
            ...prev,
            issues: prev.issues.map((issue) => {
                if (issue.key === id) {
                    issue[field] = value;
                }
                return issue;
            }),
        }));
    };

    const handleSave = (field: string) => {
        if (fieldError) {
            return;
        }
        setEditing({ ...isEditing, [field]: false });
        const issueField = field as keyof Issue;
        const request = [
            {
                op: "replace",
                path: `/${issueField}`,
                value: issue[issueField],
            },
        ];

        api.patch(ENDPOINTS.ISSUE_WITH_ID(issue.key, project.id), request)
            .then((res) => {
                if (issueField === "relatedIssus") {
                    return;
                }
                const updatedIssue = res.data as Issue;
                updateIssue(
                    issue.key,
                    issueField as keyof PartialIssue,
                    updatedIssue[issueField],
                );
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Error updating issue!",
                    description: error.message,
                });
            });
    };

    const handleKeyPress = (event: KeyboardEvent, field: string) => {
        if (event.key === "Enter" && !event.shiftKey) {
            handleSave(field);
        }
    };

    return (
        <Sheet open={props.isOpen} onOpenChange={props.onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Issue {issue.key}</SheetTitle>
                    <SheetDescription>
                        A more detailed view of your issue.
                    </SheetDescription>
                </SheetHeader>
                <div className={"mt-10"}>
                    <div className={"sheet-field-cnt"}>
                        <Label className={"pl-1"}>Name</Label>
                        {isEditing["name"] ? (
                            <>
                                <Input
                                    value={issue.name}
                                    onBlur={() => handleSave("name")}
                                    onKeyDown={(e) => handleKeyPress(e, "name")}
                                    onChange={(e) =>
                                        setIssue({
                                            ...issue,
                                            name: e.target.value,
                                        })
                                    }
                                    autoFocus
                                />
                                {fieldError && (
                                    <span className="text-sm font-medium text-destructive">
                                        {fieldError}
                                    </span>
                                )}
                            </>
                        ) : (
                            <Button
                                variant={"ghost"}
                                className={"justify-start text-lg p-2"}
                                onClick={() => handleEditing("name")}
                            >
                                {issue.name}
                            </Button>
                        )}
                    </div>
                    <div className={"sheet-field-cnt mt-10"}>
                        <Label className={"pl-1"}>Description</Label>
                        {isEditing["description"] ? (
                            <>
                                <Textarea
                                    ref={textareaRef}
                                    value={issue.description}
                                    onBlur={() => handleSave("description")}
                                    onKeyDown={(e) =>
                                        handleKeyPress(e, "description")
                                    }
                                    onChange={(e) =>
                                        setIssue({
                                            ...issue,
                                            description: e.target.value,
                                        })
                                    }
                                    autoFocus
                                />
                                {fieldError && (
                                    <span className="text-sm font-medium text-destructive">
                                        {fieldError}
                                    </span>
                                )}
                            </>
                        ) : (
                            <Button
                                variant={"ghost"}
                                className={`justify-start p-2`}
                                onClick={() => handleEditing("description")}
                            >
                                <p
                                    className={
                                        issue.description ? "" : "opacity-50"
                                    }
                                >
                                    {issue.description
                                        ? issue.description
                                        : "Add description..."}
                                </p>
                            </Button>
                        )}
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
                        <Button onClick={() => setOpenLinkDialog(true)}>
                            Link issue
                        </Button>
                    </div>
                    <IssueLinking
                        isOpen={isOpenLinkDialog}
                        onOpenChange={setOpenLinkDialog}
                        issueKey={issue.key}
                    />
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
            </SheetContent>
        </Sheet>
    );
}

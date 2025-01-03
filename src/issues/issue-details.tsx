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

interface IssueTypeSelectProps {
    issue: Issue;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

interface EditableFields {
    name: string;
    description: string;
}
export default function IssueDetails(props: IssueTypeSelectProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [editableFields, setEditableFields] = useState<EditableFields>({
        name: props.issue.name,
        description: props.issue.description,
    });
    const [fieldError, setFieldError] = useState<string>("");
    const [isEditing, setEditing] = useState<Record<string, boolean>>({
        name: false,
        description: false,
    });
    const { project, setProject } = useContext(ProjectContext);
    const [confirming, setConfirming] = useState<boolean>(false);

    const nameFormSchema = z.string().min(1).max(30);
    const descriptionFormSchema = z.string().max(200);

    useEffect(() => {
        if (isEditing["description"] && textareaRef.current) {
            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
        }
    }, [isEditing]);

    useEffect(() => {
        try {
            nameFormSchema.parse(editableFields.name);
            descriptionFormSchema.parse(editableFields.description);
            setFieldError("");
        } catch (e) {
            if (e instanceof z.ZodError) {
                setFieldError(e.issues[0].message);
            }
        }
    }, [editableFields.name, editableFields.description]);

    const handleDeleteClick = () => {
        if (confirming) {
            api.delete(ENDPOINTS.ISSUE_WITH_ID(props.issue.key, project.id))
                .then(() => {
                    setProject((prev) => ({
                        ...prev,
                        issues: prev.issues.filter((i) => {
                            if (i.key != props.issue.key) {
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

    const handleSave = (field: string) => {
        if (fieldError) {
            return;
        }
        setEditing({ ...isEditing, [field]: false });
        const issueField = field as keyof EditableFields;
        const request = [
            {
                op: "replace",
                path: `/${issueField}`,
                value: editableFields[issueField],
            },
        ];
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

        api.patch(ENDPOINTS.ISSUE_WITH_ID(props.issue.key, project.id), request)
            .then((res) => {
                const updatedIssue = res.data as Issue;
                updateIssue(
                    props.issue.key,
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
            {props.issue !== null && (
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Issue {props.issue.key}</SheetTitle>
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
                                        value={editableFields.name}
                                        onBlur={() => handleSave("name")}
                                        onKeyDown={(e) =>
                                            handleKeyPress(e, "name")
                                        }
                                        onChange={(e) =>
                                            setEditableFields({
                                                ...editableFields,
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
                                    {editableFields.name}
                                </Button>
                            )}
                        </div>
                        <div className={"sheet-field-cnt mt-10"}>
                            <Label className={"pl-1"}>Description</Label>
                            {isEditing["description"] ? (
                                <>
                                    <Textarea
                                        ref={textareaRef}
                                        value={editableFields.description}
                                        onBlur={() => handleSave("description")}
                                        onKeyDown={(e) =>
                                            handleKeyPress(e, "description")
                                        }
                                        onChange={(e) =>
                                            setEditableFields({
                                                ...editableFields,
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
                                            editableFields.description
                                                ? ""
                                                : "opacity-50"
                                        }
                                    >
                                        {editableFields.description
                                            ? editableFields.description
                                            : "Add description..."}
                                    </p>
                                </Button>
                            )}
                        </div>
                        <div className={"sheet-field-cnt mt-10"}>
                            <Label className={"pl-1"}>Type</Label>
                            <IssueTypeSelect
                                issueKey={props.issue.key}
                                currentType={props.issue.type}
                                compact={false}
                            />
                        </div>
                        <div className="sheet-field-cnt mt-10">
                            <Label>Status</Label>
                            <IssueLaneSelect
                                issueKey={props.issue.key}
                                currentLane={props.issue.lane}
                            />
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
                </SheetContent>
            )}
        </Sheet>
    );
}

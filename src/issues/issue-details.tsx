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
import { ProjectContext } from "@/projects/context.ts";

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

    const [isEditing, setEditing] = useState<Record<string, boolean>>({
        name: false,
        description: false,
    });

    const { project, setProject } = useContext(ProjectContext);

    const [confirming, setConfirming] = useState<boolean>(false);

    const handleDeleteClick = () => {
        if (confirming) {
            api.delete(ENDPOINTS.ISSUE_WITH_ID(props.issue.id, project.id))
                .then(() => {
                    setProject((prev) => ({
                        ...prev,
                        issues: prev.issues.filter((i) => {
                            if (i.id != props.issue.id) {
                                return i;
                            }
                        }),
                    }));
                    props.onOpenChange(false);
                    toast({
                        title: "Success",
                        description: "Succesfully deleted issue!",
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

    useEffect(() => {
        if (isEditing["description"] && textareaRef.current) {
            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
        }
    }, [isEditing]);

    const handleEditing = (field: string) => {
        setEditing({ ...isEditing, [field]: true });
    };

    const handleSave = (field: string) => {
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
                    if (issue.id === id) {
                        issue[field] = value;
                    }
                    return issue;
                }),
            }));
        };

        api.patch(ENDPOINTS.ISSUE_WITH_ID(props.issue.id, project.id), request)
            .then((res) => {
                const updatedIssue = res.data as Issue;
                updateIssue(
                    props.issue.id,
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
                        <SheetTitle>Issue {props.issue.id}</SheetTitle>
                        <SheetDescription>
                            A more detailed view of your issue.
                        </SheetDescription>
                    </SheetHeader>
                    <div className={"mt-10"}>
                        <div className={"sheet-field-cnt"}>
                            <Label className={"pl-1"}>Name</Label>
                            {isEditing["name"] ? (
                                <Input
                                    value={editableFields.name}
                                    onBlur={() => handleSave("name")}
                                    onKeyDown={(e) => handleKeyPress(e, "name")}
                                    onChange={(e) =>
                                        setEditableFields({
                                            ...editableFields,
                                            name: e.target.value,
                                        })
                                    }
                                    autoFocus
                                />
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
                                issueId={props.issue.id}
                                currentType={props.issue.type}
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

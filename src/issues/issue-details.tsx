import {Issue} from "@/issues/types.ts";
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import IssueTypeSelect from "@/issues/issue-type-select.tsx";
import {KeyboardEvent, useEffect, useRef, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";


interface IssueTypeSelectProps {
    issue: Issue | null
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
}

export default function IssueDetails(props: IssueTypeSelectProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isEditing, setEditing] = useState<Record<string, boolean>>({
        name: false,
        description: false,
    });

    useEffect(() => {
        if (isEditing["description"]&& textareaRef.current) {
            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
        }
    }, [isEditing]);

    const handleEditing = (field: string) => {
        setEditing({...isEditing, [field]: true});
    }

    const handleSave = (field: string) => {
        setEditing({...isEditing, [field]: false});
    }

    const handleKeyPress = (event: KeyboardEvent, field: string) => {
        if (event.key === "Enter" && !event.shiftKey) {
            handleSave(field)
        }
    }

    return (
        <Sheet open={props.isOpen} onOpenChange={props.onOpenChange}>
            {props.issue !== null && (
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Issue {props.issue.id}</SheetTitle>
                    </SheetHeader>
                    <div className={"mt-10"}>
                        <div className={"sheet-field-cnt"}>
                            <Label className={"pl-1"}>Name</Label>
                            {isEditing["name"] ?
                                <Input
                                    defaultValue={props.issue.name}
                                    onBlur={() => handleSave("name")}
                                    onKeyDown={(e) => handleKeyPress(e, "name")}
                                    autoFocus/>
                                :
                                <Button variant={"ghost"}
                                        className={"justify-start text-lg p-2"}
                                        onClick={() => handleEditing("name")}>{props.issue.name}</Button>
                            }
                        </div>
                        <div className={"sheet-field-cnt mt-10"}>
                            <Label className={"pl-1"}>Description</Label>
                            {isEditing["description"] ?
                                <Textarea
                                    ref={textareaRef}
                                    defaultValue={props.issue.description}
                                    onBlur={() => handleSave("description")}
                                    onKeyDown={(e) => handleKeyPress(e, "description")}
                                    autoFocus
                                />
                                :
                                <Button variant={"ghost"}
                                        className={`justify-start p-2`}
                                        onClick={() => handleEditing("description")}>
                                    <p className={props.issue.description ? "" : "opacity-50"}>
                                        {props.issue.description ? props.issue.description : "Add description..."}
                                    </p>
                                </Button>
                            }
                        </div>
                        <div className={"sheet-field-cnt mt-10"}>
                            <Label className={"pl-1"}>Type</Label>
                            <IssueTypeSelect currentType={props.issue.type} issueId={props.issue.id} silent={true}/>
                        </div>
                    </div>
                </SheetContent>
            )}
        </Sheet>
    )
}

import {IIssue} from "@/App.tsx";
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import IssueTypeSelect from "@/issues/issue-type-select.tsx";
import {useState} from "react";


interface IssueTypeSelectProps {
    issue: IIssue | null
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
}

export default function IssueDetails(props: IssueTypeSelectProps) {
    const [isEditing, setEditing] = useState<Record<string, boolean>>({
        name: false,
        description: false,
    });

    const handleEditing = (field: string) => {
        setEditing({...isEditing, [field]: true});
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
                                <p>editing</p>
                                :
                                <Button variant={"ghost"}
                                        className={"justify-start text-lg p-2"}
                                        onClick={() => handleEditing("name")}>{props.issue.name}</Button>
                            }
                        </div>
                        <div className={"sheet-field-cnt mt-10"}>
                            <Label className={"pl-1"}>Description</Label>
                            {isEditing["description"] ?
                                <p>editing</p>
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

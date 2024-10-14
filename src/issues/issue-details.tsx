import {IIssue} from "@/App.tsx";
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import IssueTypeSelect from "@/issues/issue-type-select.tsx";


interface IssueTypeSelectProps {
    issue: IIssue | null
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
}

export default function IssueDetails(props: IssueTypeSelectProps) {
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
                            <Button variant={"ghost"}
                                    className={"justify-start text-lg p-2"}>{props.issue.name}</Button>
                        </div>
                        <div className={"sheet-field-cnt mt-10"}>
                            <Label className={"pl-1"}>Description</Label>
                            <Button variant={"ghost"}
                                    className={`justify-start p-2`}>
                                <p className={props.issue.description ? "" : "opacity-50"}>
                                    {props.issue.description ? props.issue.description : "Add description..."}
                                </p>
                            </Button>
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

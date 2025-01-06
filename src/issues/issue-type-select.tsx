import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IssueType } from "@/issues/types.ts";
import { ENDPOINTS } from "@/endpoints.ts";
import { useToast } from "@/hooks/use-toast.ts";
import api from "@/api.ts";
import { ReactNode, useContext, useState } from "react";
import { ProjectContext } from "@/projects/project-provider.tsx";
import {
    LucideBug,
    LucideClipboardCheck,
    LucideScrollText,
} from "lucide-react";

interface IssueTypeSelectProps {
    issueKey: number;
    currentType: IssueType;
    compact: boolean;
}

export default function IssueTypeSelect(props: IssueTypeSelectProps) {
    const { project, setProject } = useContext(ProjectContext);
    const [type, setType] = useState<IssueType>(props.currentType);
    const { toast } = useToast();

    const onChange = (value: string) => {
        const issueTypeKey = value as keyof typeof IssueType;
        const newIssueType = IssueType[issueTypeKey];
        updateIssueType(newIssueType);
        setProject((prev) => ({
            ...prev,
            issues: prev.issues.map((issue) => {
                if (issue.key === props.issueKey) {
                    issue.type = newIssueType;
                }
                return issue;
            }),
        }));
    };

    const updateIssueType = (type: IssueType) => {
        setType(type);
        const request = [
            {
                op: "replace",
                path: "/type",
                value: type,
            },
        ];
        api.patch(ENDPOINTS.ISSUE_WITH_ID(props.issueKey, project!.id), request)
            .then(() => {
                toast({
                    title: "Success",
                    description: `Type of issue ${props.issueKey} has changed.`,
                });
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Error updating issue!",
                    description: error.message,
                });
            });
    };

    const getIcon = (type: IssueType): ReactNode => {
        const size = "20";
        switch (type) {
            case IssueType.Task:
                return <LucideClipboardCheck size={size} />;
            case IssueType.UserStory:
                return <LucideScrollText size={size} />;
            case IssueType.Bug:
                return <LucideBug size={size} />;
        }
    };

    return (
        <Select onValueChange={onChange} value={type.toString()}>
            <SelectTrigger>
                <SelectValue>
                    {props.compact ? (
                        getIcon(type)
                    ) : (
                        <div className="flex">
                            {getIcon(type as IssueType)}
                            <div className="pl-3">{type}</div>
                        </div>
                    )}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Object.keys(IssueType)
                        .filter((key) => isNaN(Number(key)))
                        .map((type, index) => {
                            return (
                                <SelectItem value={type} key={index}>
                                    <div className="flex">
                                        {getIcon(type as IssueType)}
                                        <div className="pl-3">{type}</div>
                                    </div>
                                </SelectItem>
                            );
                        })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

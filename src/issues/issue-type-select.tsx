import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IssueType } from "@/issues/types.ts";
import axios from "axios";
import { ENDPOINTS } from "@/endpoints.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { useIssueListStore } from "./store";

interface IssueTypeSelectProps {
    issueId: number;
    silent: boolean;
}

export default function IssueTypeSelect(props: IssueTypeSelectProps) {
    let issueType: IssueType | undefined = useIssueListStore(
        (s) => s.issues.find((i) => i.id === props.issueId)?.type,
    );
    const updateTableRow = useIssueListStore((s) => s.updateRowField);
    const { toast } = useToast();

    const onIssueTypeChange = (value: string) => {
        const issueTypeKey = value as keyof typeof IssueType;
        const newIssueType = IssueType[issueTypeKey];
        updateIssueType(newIssueType);
        updateTableRow(props.issueId, "type", newIssueType);
    };

    const updateIssueType = (type: IssueType) => {
        issueType = type;
        const request = [
            {
                op: "replace",
                path: "/type",
                value: type,
            },
        ];
        axios
            .patch(`${ENDPOINTS.ISSUES}/${props.issueId}`, request)
            .then((res) => {
                if (res.status === 200 && !props.silent) {
                    toast({
                        title: "Success",
                        description: `Type of issue ${props.issueId} has changed.`,
                    });
                } else if (res.status !== 200) {
                    toast({
                        title: "Fail",
                        description: `Request returned err ${res.status}`,
                    });
                }
            });
    };

    return (
        issueType !== undefined && (
            <Select
                onValueChange={onIssueTypeChange}
                value={issueType.toString()}
            >
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(IssueType)
                        .filter((key) => isNaN(Number(key)))
                        .map((type, index) => (
                            <SelectItem value={type} key={index}>
                                {type}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        )
    );
}

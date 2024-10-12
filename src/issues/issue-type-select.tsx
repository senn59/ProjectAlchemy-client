import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {IIssuePreview, IssueType} from "@/App.tsx";
import {useState} from "react";
import axios from "axios";
import {ENDPOINTS} from "@/endpoints.ts";
import {useToast} from "@/hooks/use-toast.ts";


interface IssueTypeSelectProps {
    issuePreview: IIssuePreview
}

export default function IssueTypeSelect(props: IssueTypeSelectProps) {
    const [issueType, setIssueType] = useState<IssueType>(props.issuePreview.type);
    const { toast } = useToast();

    const onIssueTypeChange = (value: string) => {
        const issueTypeKey = value as keyof typeof IssueType;
        const newIssueType = IssueType[issueTypeKey];
        updateIssueType(newIssueType)
    }

    const updateIssueType = (type: IssueType) => {
        setIssueType(type);
        props.issuePreview.type = type
        axios.put(`${ENDPOINTS.ISSUES}/${props.issuePreview.id}/partial`, props.issuePreview)
            .then(res => {
                if (res.status === 200) {
                    toast({
                        title: "Success",
                        description: `Type of issue ${props.issuePreview.id} has changed.`
                    })
                } else {
                    toast({
                        title: "Fail",
                        description: `Request returned err ${res.status}`
                    })
                }
            })
    }

    return (
        <Select onValueChange={onIssueTypeChange} value={issueType.toString()}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {Object.keys(IssueType)
                    .filter(key => isNaN(Number(key)))
                    .map((type, index) => (
                        <SelectItem value={type} key={index}>{type}</SelectItem>
                    ))}
            </SelectContent>
        </Select>
    )
}
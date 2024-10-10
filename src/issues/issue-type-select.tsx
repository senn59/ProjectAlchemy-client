import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {IIssuePreview, IssueType} from "@/App.tsx";
import {useState, useEffect} from "react";
import axios from "axios";
import {ENDPOINTS} from "@/endpoints.ts";


interface IssueTypeSelectProps {
    issuePreview: IIssuePreview
}

export default function IssueTypeSelect(props: IssueTypeSelectProps) {
    const [issueType, setIssueType] = useState<IssueType>(props.issuePreview.type);

    const onIssueTypeChange = (value: string) => {
        const issueTypeKey = value as keyof typeof IssueType;
        const newIssueType = IssueType[issueTypeKey];
        setIssueType(newIssueType);
    }

    useEffect(() => {
        props.issuePreview.type = issueType
        axios.put(`${ENDPOINTS.ISSUES}/${props.issuePreview.id}/partial`, props.issuePreview)
    }, [issueType, props.issuePreview]);

    return (
        <Select onValueChange={onIssueTypeChange} value={issueType.toString()}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {Object.keys(IssueType)
                    .filter(key => isNaN(Number(key)))
                    .map(t => (
                        <SelectItem value={t}>{t}</SelectItem>
                    ))}
            </SelectContent>
        </Select>
    )
}
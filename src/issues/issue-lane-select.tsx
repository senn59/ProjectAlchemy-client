import { Lane } from "@/projects/types.ts";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup,
} from "@/components/ui/select.tsx";
import { useContext, useState } from "react";
import { ProjectContext } from "@/projects/context.ts";
import api from "@/api.ts";
import { ENDPOINTS } from "@/endpoints.ts";
import { toast } from "@/hooks/use-toast.ts";

interface IssueLaneSelectProps {
    issueId: number;
    currentLane: Lane;
}

export function IssueLaneSelect(props: IssueLaneSelectProps) {
    const { project } = useContext(ProjectContext);
    const [lane, setLane] = useState<Lane>(props.currentLane);

    const onChange = (value: string) => {
        const lane = project.lanes.find((l) => l.id.toString() === value);
        if (!lane) return;
        setLane(lane);
        updateLane(lane);
    };
    const updateLane = (newLane: Lane) => {
        const request = [
            {
                op: "replace",
                path: "/lane",
                value: newLane,
            },
        ];
        api.patch(ENDPOINTS.ISSUE_WITH_ID(props.issueId, project.id), request)
            .then(() => {
                toast({
                    title: "Success",
                    description: `Issue lane is now set to ${lane.name}`,
                });
            })
            .catch((e) => {
                toast({
                    title: "Error updating issue",
                    description: e.message,
                    variant: "destructive",
                });
            });
    };

    return (
        <Select value={lane.id.toString()} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {project.lanes.map((lane) => (
                        <SelectItem value={lane.id.toString()}>
                            {lane.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

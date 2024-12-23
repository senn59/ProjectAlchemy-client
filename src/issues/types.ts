import { Lane } from "@/projects/types.ts";

export interface PartialIssue {
    id: number;
    name: string;
    type: IssueType;
    lane: Lane;
}

export interface Issue extends PartialIssue {
    description: string;
}

export enum IssueType {
    Task = "Task",
    UserStory = "UserStory",
    Bug = "Bug",
}

import { Lane } from "@/projects/types.ts";

export interface IssueLink {
    key: number;
    name: string;
    type: IssueType;
}

export interface PartialIssue extends IssueLink {
    lane: Lane;
}

export interface Issue extends PartialIssue {
    description: string;
    relatedIssus: IssueLink[];
}

export enum IssueType {
    Task = "Task",
    UserStory = "UserStory",
    Bug = "Bug",
}

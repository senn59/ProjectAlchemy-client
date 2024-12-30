import { PartialIssue } from "@/issues/types.ts";

export interface ProjectOverview {
    projectId: string;
    projectName: string;
    memberType: memberType;
}

export enum memberType {
    Owner = "Owner",
    Collaborator = "Collaborator",
}

export interface ProjectResponse {
    id: string;
    name: string;
    lanes: Lane[];
    issues: PartialIssue[];
}

export interface Lane {
    id: string;
    name: string;
}

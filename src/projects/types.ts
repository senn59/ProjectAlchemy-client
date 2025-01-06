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
    members: Member[];
}

export interface Member {
    userId: string;
    userName: string;
    type: memberType;
}

export interface Lane {
    id: string;
    name: string;
}

export interface InvitationSentView {
    invitationId: string;
    email: string;
}
export interface Invitation {
    invitationId: string;
    projectName: string;
}

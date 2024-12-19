export interface ProjectOverview {
    projectId: string;
    projectName: string;
    memberType: memberType;
}

export enum memberType {
    Owner = "Owner",
    Collaborator = "Collaborator",
}

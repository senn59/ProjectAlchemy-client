export interface IssuePreview {
    id: number;
    name: string;
    type: IssueType;
}

export interface Issue extends IssuePreview {
    description: string;
}

export enum IssueType {
    Task = "Task",
    UserStory = "UserStory",
    Bug = "Bug",
}

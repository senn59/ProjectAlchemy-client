import { useParams } from "react-router-dom";
import IssueDetails from "@/issues/details/issue-details";
import { ProjectOverview } from "@/projects/project-overview";
import { useContext } from "react";
import { ProjectContext } from "@/projects/project-provider";
import { IssueLinking } from "@/issues/issue-linking";

export default function Project() {
    const { activeIssue, issueToLink } = useContext(ProjectContext);
    const { id } = useParams();

    return (
        <>
            {activeIssue && <IssueDetails issueKey={activeIssue} />}
            {id && <ProjectOverview id={id} />}
            {issueToLink && <IssueLinking />}
        </>
    );
}

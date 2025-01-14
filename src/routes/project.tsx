import { useParams } from "react-router-dom";
import IssueDetails from "@/issues/issue-details";
import { ProjectOverview } from "@/projects/project-overview";
import { useContext, useEffect } from "react";
import { ProjectContext } from "@/projects/project-provider";
import { IssueLinking } from "@/issues/issue-link-linking";

export default function Project() {
    const { activeIssue, issueToLink } = useContext(ProjectContext);
    const { id } = useParams();
    useEffect(() => {
        console.log(activeIssue);
    }, [activeIssue]);

    return (
        <>
            {activeIssue && <div>Test</div>}
            {activeIssue && <IssueDetails issueKey={activeIssue} />}
            {id && <ProjectOverview id={id} />}
            {issueToLink && <IssueLinking />}
        </>
    );
}

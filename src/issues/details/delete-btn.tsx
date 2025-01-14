import api from "@/api";
import { Button } from "@/components/ui/button";
import { ENDPOINTS } from "@/endpoints";
import { toast } from "@/hooks/use-toast";
import { ProjectContext } from "@/projects/project-provider";
import { useContext, useState } from "react";

interface DeleteBtnProps {
    issueKey: number;
    projectId: string;
}
export function DeleteBtn(props: DeleteBtnProps) {
    const [confirming, setConfirming] = useState(false);
    const { setProject, setActiveIssue } = useContext(ProjectContext);

    const handleClick = () => {
        if (confirming) {
            api.delete(ENDPOINTS.ISSUE_WITH_ID(props.issueKey, props.projectId))
                .then(() => {
                    setProject((prev) => ({
                        ...prev,
                        issues: prev.issues.filter((i) => {
                            if (i.key != props.issueKey) {
                                return i;
                            }
                        }),
                    }));
                    setActiveIssue(null);
                    toast({
                        title: "Success",
                        description: "Successfully deleted issue!",
                    });
                })
                .catch((e) => {
                    toast({
                        title: "Error while deleting issue",
                        description: e.message,
                        variant: "destructive",
                    });
                });
            setConfirming(false);
        } else {
            setConfirming(true);
        }
    };
    return (
        <Button
            onClick={handleClick}
            onBlur={() => setConfirming(false)}
            variant="destructive"
        >
            {!confirming ? "Delete" : "Are you sure?"}
        </Button>
    );
}

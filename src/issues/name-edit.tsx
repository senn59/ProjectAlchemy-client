import api from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ENDPOINTS } from "@/endpoints";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { ProjectContext } from "@/projects/project-provider";

interface NameEditProps {
    name: string;
    issueKey: number;
    projectId: string;
}
export function NameEdit(props: NameEditProps) {
    const [name, setName] = useState(props.name);
    const [isEditing, setEditing] = useState(false);
    const [fieldError, setFieldError] = useState("");
    const nameFormSchema = z.string().min(1).max(30);
    const { setProject } = useContext(ProjectContext);

    useEffect(() => {
        try {
            nameFormSchema.parse(name);
            setFieldError("");
        } catch (e) {
            if (e instanceof z.ZodError) {
                setFieldError(e.issues[0].message);
            }
        }
    }, [name]);

    const handleSave = () => {
        if (fieldError) {
            return;
        }
        setEditing(false);
        const request = [
            {
                op: "replace",
                path: "/name",
                value: name,
            },
        ];

        api.patch(
            ENDPOINTS.ISSUE_WITH_ID(props.issueKey, props.projectId),
            request,
        )
            .then(() => {
                setProject((prev) => ({
                    ...prev,
                    issues: prev.issues.map((issue) => {
                        if (issue.key === props.issueKey) {
                            issue["name"] = name;
                        }
                        return issue;
                    }),
                }));
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Error updating issue!",
                    description: error.message,
                });
            });
    };
    return (
        <>
            <Label className={"pl-1"}>Name</Label>
            {isEditing ? (
                <>
                    <Input
                        value={name}
                        onBlur={() => handleSave()}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                handleSave();
                            }
                        }}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                    {fieldError && (
                        <span className="text-sm font-medium text-destructive">
                            {fieldError}
                        </span>
                    )}
                </>
            ) : (
                <Button
                    variant={"ghost"}
                    className={"justify-start text-lg p-2"}
                    onClick={() => setEditing(true)}
                >
                    {name}
                </Button>
            )}
        </>
    );
}

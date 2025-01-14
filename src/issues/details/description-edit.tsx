import api from "@/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ENDPOINTS } from "@/endpoints";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionEditProps {
    description: string;
    issueKey: number;
    projectId: string;
}
export function DescriptionEdit(props: DescriptionEditProps) {
    const [description, setDescription] = useState(props.description);
    const [isEditing, setEditing] = useState(false);
    const [fieldError, setFieldError] = useState("");
    const descriptionFormSchema = z.string().max(200);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        try {
            descriptionFormSchema.parse(description);
            setFieldError("");
        } catch (e) {
            if (e instanceof z.ZodError) {
                setFieldError(e.issues[0].message);
            }
        }
    }, [description]);

    const handleSave = () => {
        if (fieldError) {
            return;
        }
        setEditing(false);
        const request = [
            {
                op: "replace",
                path: "/description",
                value: description,
            },
        ];

        api.patch(
            ENDPOINTS.ISSUE_WITH_ID(props.issueKey, props.projectId),
            request,
        ).catch((error) => {
            toast({
                variant: "destructive",
                title: "Error updating issue!",
                description: error.message,
            });
        });
    };
    return (
        <>
            <Label className={"pl-1"}>Description</Label>
            {isEditing ? (
                <>
                    <Textarea
                        ref={textareaRef}
                        value={description}
                        onBlur={() => handleSave()}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                handleSave();
                            }
                        }}
                        onChange={(e) => setDescription(e.target.value)}
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
                    className={`justify-start p-2`}
                    onClick={() => setEditing(true)}
                >
                    <p className={description ? "" : "opacity-50"}>
                        {description ? description : "Add description..."}
                    </p>
                </Button>
            )}
        </>
    );
}

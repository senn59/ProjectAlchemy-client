import { Button } from "@/components/ui/button.tsx";
import { LucideBell, LucideBellDot } from "lucide-react";
import { useEffect, useState } from "react";
import { Invitation } from "@/projects/types.ts";
import api from "@/api.ts";
import { toast } from "@/hooks/use-toast.ts";
import { ENDPOINTS } from "@/endpoints.ts";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { useNavigate } from "react-router-dom";

export function Invitations() {
    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const navigator = useNavigate();

    useEffect(() => {
        api.get(ENDPOINTS.INVITATIONS)
            .then((r) => {
                setInvitations(r.data);
            })
            .catch((e) => {
                toast({
                    variant: "destructive",
                    title: "Error fetching invitations",
                    description: e.message,
                });
            });
    }, []);

    const reject = (id: string) => {
        api.post(ENDPOINTS.INVITATIONS_WITH_ID(id) + "/reject")
            .then(() => {
                setInvitations((prevState) =>
                    prevState.filter((i) => i.invitationId !== id),
                );
            })
            .catch((e) => {
                toast({
                    variant: "destructive",
                    title: "Error while trying to reject invitation",
                    description: e.message,
                });
            });
    };

    const accept = (invitation: Invitation) => {
        console.log(invitation.invitationId);
        api.post(
            ENDPOINTS.INVITATIONS_WITH_ID(invitation.invitationId) + "/accept",
        )
            .then((r) => {
                navigator("projects/" + r.data);
                setInvitations((prevState) =>
                    prevState.filter(
                        (i) => i.invitationId !== invitation.invitationId,
                    ),
                );
            })
            .catch((e) => {
                toast({
                    variant: "destructive",
                    title: "Error while trying to join project",
                    description: e.message,
                });
            });
    };

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                        {invitations.length > 0 ? (
                            <LucideBellDot className="h-[1.2rem] w-[1.2rem]" />
                        ) : (
                            <LucideBell className="h-[1.2rem] w-[1.2rem]" />
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="text-sm w-max">
                    {invitations.length < 1 ? (
                        <div>No invitations</div>
                    ) : (
                        invitations.map((i) => (
                            <div
                                className="flex items-center"
                                key={i.invitationId}
                            >
                                <div className="text-muted-foreground">
                                    you have been invited to project{" "}
                                    <span className="font-bold">
                                        {i.projectName}
                                    </span>
                                </div>
                                <Button
                                    size="sm"
                                    className="text-sm"
                                    variant="link"
                                    onClick={() => accept(i)}
                                >
                                    Accept
                                </Button>
                                <Button
                                    size="sm"
                                    variant="link"
                                    className="text-destructive"
                                    onClick={() => reject(i.invitationId)}
                                >
                                    Reject
                                </Button>
                            </div>
                        ))
                    )}
                </PopoverContent>
            </Popover>
        </>
    );
}

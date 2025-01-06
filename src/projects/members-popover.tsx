import { Member } from "@/projects/types.ts";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface MembersPopoverProps {
    members: Member[];
}

export function MembersPopover({ members }: MembersPopoverProps) {
    useEffect(() => {
        console.log(members);
    }, [members]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button>Members ({members.length})</Button>
            </PopoverTrigger>
            <PopoverContent className="w-max text-sm">
                {members.map((member) => (
                    <div className="flex justify-between">
                        <div>{member.userId}</div>
                        <div className="pl-6">{member.type}</div>
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    );
}
